package com.appchat.exception.email;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class EmailAdvice {

    @ResponseBody
    @ExceptionHandler(NewEmailEqualToOldException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String loginAlreadyUsedException(NewEmailEqualToOldException ex) {
        return ex.getMessage();
    }

}
