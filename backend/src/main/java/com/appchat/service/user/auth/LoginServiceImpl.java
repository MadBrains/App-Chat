package com.appchat.service.user.auth;

import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Login;
import com.appchat.entity.user.enums.InviteAttributeValues;
import com.appchat.exception.auth.LoginAlreadyUsedException;
import com.appchat.exception.auth.UserWithThisLoginNotExistException;
import com.appchat.repository.user.auth.LoginRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final LoginRepository loginRepository;

    public Login findByMethodValue(String username) {
        return loginRepository.findByMethodValue(username).orElseThrow(() ->
                                                                               new UserWithThisLoginNotExistException(
                                                                                       username));
    }

    public Login findByUserIdAndMethodType(int userId, InviteAttributeValues method) {
        return loginRepository.findByUserAndMethod(userId, method).orElseThrow(() ->
                                                                                       new UserWithThisLoginNotExistException(
                                                                                               method.name()));
    }

    public boolean checkIfUserWithThisMethodValueAlreadyExist(String methodValue) {
        return loginRepository.findByMethodValue(methodValue).isPresent();
    }

    public void createLogin(String username, User user) {
        if (loginRepository.findByMethodValue(username).isPresent()) {
            throw new LoginAlreadyUsedException(username);
        } else {
            Login login = new Login();
            login.setUser(user);
            login.setPasswordRequired(true);
            login.setMethod(InviteAttributeValues.EMAIL);
            login.setMethodValue(username);
            loginRepository.save(login);
        }
    }

    public void saveLogin(Login login) {
        loginRepository.save(login);
    }

}
