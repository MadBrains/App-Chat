package com.appchat.exception.auth;

public class LoginAlreadyUsedException extends RuntimeException {

    public LoginAlreadyUsedException(String username) {
        super("user with this login already exist: " + username);
    }

}
