package com.appchat.exception.chat;

public class ChatNotExistException extends RuntimeException {

    public ChatNotExistException(Long id) {
        super("chat with id: " + id + " do not exist");
    }

}
