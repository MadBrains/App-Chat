package com.appchat.exception.chat;

public class ChatIsEmptyException extends RuntimeException {

    public ChatIsEmptyException() {
        super("There is no users in the chat");
    }

}
