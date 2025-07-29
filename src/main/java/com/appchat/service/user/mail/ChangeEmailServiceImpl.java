package com.appchat.service.user.mail;

import com.appchat.dto.user.email.EmailDTO;
import com.appchat.entity.user.User;
import com.appchat.entity.user.enums.ActionValues;
import com.appchat.exception.email.NewEmailEqualToOldException;
import com.appchat.exception.user.UserWithThisEmailAlreadyExist;
import com.appchat.service.user.UserService;
import com.appchat.service.user.invite.InviteService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChangeEmailServiceImpl implements ChangeEmailService {

    private final UserService userService;

    private final InviteService inviteService;

    private static final String EMAIL_TEXT = "Перейдите по ссылке для изменения почты: ";

    private static final String EMAIL_SUBJECT = "Изменение почты";

    @Override
    @Transactional
    public void changeUserEmail(String oldEmail, String newEmail) {
        if (userService.checkIfUserWhitThisMethodValueAlreadyExist(newEmail)) {
            throw new UserWithThisEmailAlreadyExist(newEmail);
        }
        if (ObjectUtils.notEqual(newEmail, oldEmail)) {
            User user = userService.findUserByMethodValue(oldEmail);
            inviteService.createInviteByEmail(user,
                    EmailDTO.builder()
                            .subject(EMAIL_SUBJECT)
                            .email(newEmail)
                            .text(EMAIL_TEXT)
                            .build(),
                    ActionValues.ATTRIBUTE_VERIFICATION);
        } else {
            throw new NewEmailEqualToOldException(newEmail);
        }
    }

}
