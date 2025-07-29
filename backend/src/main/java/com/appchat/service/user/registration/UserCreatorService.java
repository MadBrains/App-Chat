package com.appchat.service.user.registration;

import com.appchat.dto.user.UserCreateDTO;

public interface UserCreatorService {

    void createUserByEmail(UserCreateDTO userDTO);

}
