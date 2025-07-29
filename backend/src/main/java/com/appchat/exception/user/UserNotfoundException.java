package com.appchat.exception.user;

public class UserNotfoundException extends RuntimeException implements UserException {

    public UserNotfoundException(Integer id) {
        super("User with this id does not exist: " + id);
    }

}
