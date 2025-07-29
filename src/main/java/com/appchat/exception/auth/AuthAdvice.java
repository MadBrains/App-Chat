package com.appchat.exception.auth;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AuthAdvice {

    @ResponseBody
    @ExceptionHandler(LoginAlreadyUsedException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String loginAlreadyUsedException(LoginAlreadyUsedException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserWithThisLoginNotExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String userWithThisLoginNotExistException(UserWithThisLoginNotExistException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(JWTVerificationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String jwtValidationException(JWTVerificationException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(NoActualPasswordException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String noActualPassword(NoActualPasswordException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(NotExistActualPasswordException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String notExistActualPass(NotExistActualPasswordException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserBannedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String userBanned(UserBannedException ex) {
        return ex.getMessage();
    }

}
