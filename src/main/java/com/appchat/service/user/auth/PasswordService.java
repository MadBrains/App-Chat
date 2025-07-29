package com.appchat.service.user.auth;

import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Password;

public interface PasswordService {

    void createPassword(String pass, User user);

    void savePassword(Password password);

}
