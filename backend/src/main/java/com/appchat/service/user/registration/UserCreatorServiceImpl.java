package com.appchat.service.user.registration;

import com.appchat.dto.user.UserCreateDTO;
import com.appchat.dto.user.email.EmailDTO;
import com.appchat.entity.user.User;
import com.appchat.entity.user.enums.ActionValues;
import com.appchat.service.user.UserRoleService;
import com.appchat.service.user.UserService;
import com.appchat.service.user.auth.LoginService;
import com.appchat.service.user.invite.InviteService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserCreatorServiceImpl implements UserCreatorService {

    private final UserService userService;

    private final LoginService loginService;

    private final InviteService inviteService;

    private final UserRoleService userRoleService;

    private static final String EMAIL_TEXT = "Перейдите по ссылке приглашения: ";

    private static final String EMAIL_SUBJECT = "Подтверждение регистрации";

    @Override
    @Transactional
    public void createUserByEmail(UserCreateDTO userDTO) {
        User user = userService.createUser(userDTO);

        userRoleService.createUserRoles(userDTO.getRoleIds(), user);

        //Save login
        loginService.createLogin(userDTO.getEmail(), user);

        inviteService.createInviteByEmail(user,
                EmailDTO.builder()
                        .subject(EMAIL_SUBJECT)
                        .email(userDTO.getEmail())
                        .text(EMAIL_TEXT)
                        .build(),
                ActionValues.REGISTRATION);
    }

}
