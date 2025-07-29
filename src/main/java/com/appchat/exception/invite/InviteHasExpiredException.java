package com.appchat.exception.invite;

public class InviteHasExpiredException extends RuntimeException {

    public InviteHasExpiredException(String uuid) {
        super("this invite has expired: " + uuid);
    }

}
