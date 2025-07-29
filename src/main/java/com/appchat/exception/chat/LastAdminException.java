package com.appchat.exception.chat;

public class LastAdminException extends RuntimeException {

    public LastAdminException() {
        super("You are the last admin please add new admin before leave chat");
    }

}
