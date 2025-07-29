package com.appchat.exception.auth;

public class NotExistActualPasswordException extends RuntimeException {

    public NotExistActualPasswordException() {
        super("not exist actual password");
    }

}
