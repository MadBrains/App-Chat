package com.appchat.exception.auth;

public class UserBannedException extends RuntimeException {

    public UserBannedException() {
        super("Access to the system is blocked");
    }

}
