package com.appchat.service.user.auth;

import com.appchat.dto.user.email.EmailDTO;
import com.appchat.dto.user.password.PasswordChangesDTO;
import com.appchat.dto.user.password.PasswordNewDTO;
import com.appchat.entity.user.Invite;
import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Password;
import com.appchat.entity.user.enums.ActionValues;
import com.appchat.exception.password.CantChangeOldPasswordException;
import com.appchat.exception.password.InvalidOldPasswordException;
import com.appchat.exception.user.UserNotfoundException;
import com.appchat.service.user.UserService;
import com.appchat.service.user.invite.InviteService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ChangePasswordServiceImpl implements ChangePasswordService {

    private final UserService userService;

    private final InviteService inviteService;

    private final PasswordService passwordService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final String EMAIL_TEXT = "Перейдите по ссылке для восстановления пароля: ";

    private static final String EMAIL_SUBJECT = "Восстановление пароля";

    @Override
    @Transactional
    public void changePassword(PasswordChangesDTO passwordChangesDTO, int userId) {
        User user = userService.findUserById(userId);
        Password oldPass = userService.findActualPasswordForUser(user.getId());
        if (bCryptPasswordEncoder.matches(passwordChangesDTO.getOldPass(), oldPass.getPass())) {
            //disable old password
            oldPass.setActual(false);
            passwordService.savePassword(oldPass);

            //create new password
            passwordService.createPassword(passwordChangesDTO.getNewPass(), user);
        } else {
            throw new InvalidOldPasswordException();
        }
    }

    public void sendRecoveryLink(String email) {
        try {
            User user = userService.findUserByMethodValue(email);
            inviteService.createInviteByEmail(user,
                    EmailDTO.builder()
                            .subject(EMAIL_SUBJECT)
                            .email(email)
                            .text(EMAIL_TEXT)
                            .build(),
                    ActionValues.PASSWORD_CHANGE);
        } catch (UserNotfoundException e) {
            log.info(String.format("someone try to send recovery link to %s", email));
        }
    }

    @Override
    @Transactional
    public void setNewPassword(int userId, PasswordNewDTO password) {
        Invite invite = inviteService.findByCodeValue(password.getInviteCode());
        if (invite.isUsed() || invite.getExpiredAt().isBefore(LocalDateTime.now())
                    || !ActionValues.PASSWORD_CHANGE.equals(invite.getAction())) {
            throw new CantChangeOldPasswordException();
        }
        User user = userService.findUserById(userId);
        Password oldPass = userService.findActualPasswordForUser(userId);
        oldPass.setActual(false);
        passwordService.savePassword(oldPass);
        passwordService.createPassword(password.getPassword(), user);
        invite.setUsed(true);
        inviteService.save(invite);
    }

}
