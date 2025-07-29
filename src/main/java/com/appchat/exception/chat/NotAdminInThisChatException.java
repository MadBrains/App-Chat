package com.appchat.exception.chat;

public class NotAdminInThisChatException extends RuntimeException {

    public NotAdminInThisChatException(long userId, long chatId) {
        super("this user: " + userId + " not admin in this chat " + chatId);
    }

}
