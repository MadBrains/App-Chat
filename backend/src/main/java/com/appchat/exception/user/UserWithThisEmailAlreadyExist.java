package com.appchat.exception.user;

public class UserWithThisEmailAlreadyExist extends RuntimeException implements UserException {

    public UserWithThisEmailAlreadyExist(String email) {
        super("User with this email already exist: " + email);
    }

}
