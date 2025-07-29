package com.appchat.exception.chat;

public class UserNotFromThisChatException extends RuntimeException {

    public UserNotFromThisChatException() {
        super("user not from this chat");
    }

}
