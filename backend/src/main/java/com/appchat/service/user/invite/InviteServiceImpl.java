package com.appchat.service.user.invite;

import com.appchat.dto.user.email.EmailDTO;
import com.appchat.dto.user.invite.InviteValueDTO;
import com.appchat.entity.user.Invite;
import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Login;
import com.appchat.entity.user.enums.ActionValues;
import com.appchat.entity.user.enums.InviteAttributeValues;
import com.appchat.exception.invite.InviteHasExpiredException;
import com.appchat.exception.invite.InviteWithThisCodeNotExistException;
import com.appchat.repository.user.InviteRepository;
import com.appchat.service.user.auth.LoginService;
import com.appchat.service.user.mail.MailService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InviteServiceImpl implements InviteService {

    private final InviteRepository inviteRepository;

    private final MailService mailService;

    private final LoginService loginService;

    @Value("${app.invite-link}")
    private StringBuilder link;

    @Value("${app.invite-expiration-days}")
    private Integer inviteDays;

    @Transactional
    public void createInviteByEmail(User user, EmailDTO emailDTO, ActionValues actionValues) {
        Invite invite = new Invite();
        invite.setUser(user);
        invite.setCreatedAt(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        invite.setAction(actionValues);
        invite.setInviteAttribute(InviteAttributeValues.EMAIL);
        invite.setInviteValue(emailDTO.getEmail());
        String uuid = UUID.randomUUID().toString();
        invite.setInviteCode(uuid);
        String resultLink = link.toString().concat("?uuid=").concat(uuid);
        invite.setInviteLink(resultLink);
        mailService.generateMailMessage(emailDTO, resultLink);
        invite.setExpiredAt(LocalDateTime.now(ZoneOffset.UTC).plusDays(inviteDays));
        inviteRepository.save(invite);
    }

    @Transactional
    public InviteValueDTO checkInvite(String uuid) {
        Invite invite = inviteRepository.findByInviteCode(uuid).orElseThrow(
                () -> new InviteWithThisCodeNotExistException(uuid));

        if (invite.getExpiredAt().isBefore(LocalDateTime.now(ZoneOffset.UTC)) || invite.isUsed()) {
            throw new InviteHasExpiredException(uuid);
        }
        InviteValueDTO inviteValueDTO = new InviteValueDTO();
        inviteValueDTO.setUserId(invite.getUser().getId());
        inviteValueDTO.setInviteValue(invite.getInviteValue());
        inviteValueDTO.setAction(invite.getAction());
        if (ActionValues.ATTRIBUTE_VERIFICATION.equals(invite.getAction())) {
            Login login = loginService.findByUserIdAndMethodType(invite.getUser().getId(),
                    InviteAttributeValues.EMAIL);
            login.setMethodValue(invite.getInviteValue());
            loginService.saveLogin(login);
            invite.setUsed(true);
            inviteRepository.save(invite);
        }
        inviteValueDTO.setAction(invite.getAction());
        return inviteValueDTO;
    }

    public Invite findByInviteValue(String inviteValue) {
        return inviteRepository.findByInviteValue(inviteValue).orElseThrow(
                () -> new InviteHasExpiredException(inviteValue));
    }

    public Invite findByCodeValue(String codeValue) {
        return inviteRepository.findByInviteCode(codeValue).orElseThrow(
                () -> new InviteHasExpiredException(codeValue));
    }

    public void save(Invite invite) {
        inviteRepository.save(invite);
    }

}
