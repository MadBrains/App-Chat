package com.appchat.exception.auth;

public class NoActualPasswordException extends RuntimeException {

    NoActualPasswordException() {
        super("no actual password for this user");
    }

}
