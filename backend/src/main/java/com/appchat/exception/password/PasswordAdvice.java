package com.appchat.exception.password;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PasswordAdvice {

    @ResponseBody
    @ExceptionHandler(InvalidOldPasswordException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String invalidPassword(InvalidOldPasswordException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(CantChangeOldPasswordException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String changePassword(CantChangeOldPasswordException ex) {
        return ex.getMessage();
    }

}
