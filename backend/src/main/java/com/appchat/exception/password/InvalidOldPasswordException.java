package com.appchat.exception.password;

public class InvalidOldPasswordException extends RuntimeException {

    public InvalidOldPasswordException() {
        super("invalid old password, please try again");
    }

}
