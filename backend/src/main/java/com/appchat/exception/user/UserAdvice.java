package com.appchat.exception.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserAdvice {

    @ResponseBody
    @ExceptionHandler(UserWithThisEmailAlreadyExist.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String userWithThisEmailAlreadyExist(UserWithThisEmailAlreadyExist ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserNotfoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotfoundException(UserNotfoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserTypeNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String userTypeNotFound(UserTypeNotFoundException ex) {
        return ex.getMessage();
    }

}
