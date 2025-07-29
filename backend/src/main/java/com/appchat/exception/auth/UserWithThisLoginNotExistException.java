package com.appchat.exception.auth;

public class UserWithThisLoginNotExistException extends RuntimeException {

    public UserWithThisLoginNotExistException(String username) {
        super("user with this login not exist: " + username);
    }

}
