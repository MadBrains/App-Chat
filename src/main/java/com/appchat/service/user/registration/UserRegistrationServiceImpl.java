package com.appchat.service.user.registration;

import com.appchat.dto.user.registration.LoginPasswordRequestDTO;
import com.appchat.entity.user.Invite;
import com.appchat.entity.user.User;
import com.appchat.service.user.UserService;
import com.appchat.service.user.auth.PasswordService;
import com.appchat.service.user.invite.InviteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRegistrationServiceImpl implements UserRegistrationService {

    private final PasswordService passwordService;

    private final UserService userService;

    private final InviteService inviteService;

    @Transactional
    public void userRegister(LoginPasswordRequestDTO loginPasswordRequestDTO) {
        String inviteValue = loginPasswordRequestDTO.getUsername();
        User user = userService.findUserByMethodValue(inviteValue);

        //Save password
        passwordService.createPassword(loginPasswordRequestDTO.getPassword(), user);

        //enable user
        user.setEnabled(true);
        userService.save(user);

        //set link are used
        Invite invite = inviteService.findByInviteValue(inviteValue);
        invite.setUsed(true);
        inviteService.save(invite);
    }

}
