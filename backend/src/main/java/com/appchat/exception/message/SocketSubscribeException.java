package com.appchat.exception.message;

public class SocketSubscribeException extends RuntimeException {

    public SocketSubscribeException() {
        super("something went wrong with subscribing to socket");
    }

}
