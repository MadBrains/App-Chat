package com.appchat.exception.message;

public class SocketConnectException extends RuntimeException {

    public SocketConnectException() {
        super("something went wrong with connection to socket");
    }

}
