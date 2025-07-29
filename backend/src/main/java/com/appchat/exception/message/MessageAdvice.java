package com.appchat.exception.message;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class MessageAdvice {

    @ResponseBody
    @ExceptionHandler(SocketConnectException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String socketConnection(SocketConnectException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(SocketSubscribeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String socketSubscribe(SocketSubscribeException ex) {
        return ex.getMessage();
    }

}
