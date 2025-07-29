package com.appchat.exception.ban;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class BanAdvice {

    @ResponseBody
    @ExceptionHandler(BanNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String banNotFound(BanNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(CantBanUserIfHeLastAdminInChatsException.class)
    @ResponseStatus(HttpStatus.SEE_OTHER)
    ChatsWithLastAdminDTO banUserAfterAddNewAdmin(CantBanUserIfHeLastAdminInChatsException ex) {
        return new ChatsWithLastAdminDTO(ex.getMessage(), ex.getChatIds());
    }

}
