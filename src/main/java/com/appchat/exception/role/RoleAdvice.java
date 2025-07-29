package com.appchat.exception.role;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RoleAdvice {

    @ResponseBody
    @ExceptionHandler(RoleNotExistException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String roleNotExistException(RoleNotExistException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(RoleWithThisNameAlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String roleWithThisNameAlreadyExistException(RoleWithThisNameAlreadyExistException ex) {
        return ex.getMessage();
    }

}
