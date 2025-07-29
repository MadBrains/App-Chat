package com.appchat.exception.invite;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class InviteAdvice {

    @ResponseBody
    @ExceptionHandler(InviteWithThisCodeNotExistException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String inviteWithThisInviteCodeNotExist(InviteWithThisCodeNotExistException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(InviteHasExpiredException.class)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    String inviteHasExpiredException(InviteHasExpiredException ex) {
        return ex.getMessage();
    }

}
