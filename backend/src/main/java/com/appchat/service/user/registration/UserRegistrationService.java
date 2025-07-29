package com.appchat.service.user.registration;

import com.appchat.dto.user.registration.LoginPasswordRequestDTO;

public interface UserRegistrationService {

    void userRegister(LoginPasswordRequestDTO loginPasswordRequestDTO);

}
