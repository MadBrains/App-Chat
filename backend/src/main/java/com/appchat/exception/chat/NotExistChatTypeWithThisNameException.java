package com.appchat.exception.chat;

public class NotExistChatTypeWithThisNameException extends RuntimeException {

    public NotExistChatTypeWithThisNameException(String chatTypeName) {
        super("not exist chat type with this name: " + chatTypeName);
    }

}
