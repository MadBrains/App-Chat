package com.appchat.service.user.auth;

import com.appchat.dto.user.password.PasswordChangesDTO;
import com.appchat.dto.user.password.PasswordNewDTO;

public interface ChangePasswordService {

    void changePassword(PasswordChangesDTO passwordChangesDTO, int userId);

    void sendRecoveryLink(String email);

    void setNewPassword(int userId, PasswordNewDTO password);

}
