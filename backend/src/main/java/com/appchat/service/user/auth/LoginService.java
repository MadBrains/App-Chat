package com.appchat.service.user.auth;

import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Login;
import com.appchat.entity.user.enums.InviteAttributeValues;

public interface LoginService {

    void createLogin(String username, User user);

    Login findByMethodValue(String username);

    boolean checkIfUserWithThisMethodValueAlreadyExist(String methodValue);

    void saveLogin(Login login);

    Login findByUserIdAndMethodType(int userId, InviteAttributeValues method);

}
