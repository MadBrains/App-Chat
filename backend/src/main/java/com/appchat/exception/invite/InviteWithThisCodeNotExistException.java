package com.appchat.exception.invite;

public class InviteWithThisCodeNotExistException extends RuntimeException {

    public InviteWithThisCodeNotExistException(String code) {
        super("invite with this code not exist: " + code);
    }

}
