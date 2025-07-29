package com.appchat.exception.password;

public class CantChangeOldPasswordException extends RuntimeException {

    public CantChangeOldPasswordException() {
        super("you can't change password for this user");
    }

}
