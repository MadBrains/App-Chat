package com.appchat.exception.user;

public class UserTypeNotFoundException extends RuntimeException {

    public UserTypeNotFoundException() {
        super("User type with this id not found");
    }

}
