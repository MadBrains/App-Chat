package com.appchat.exception.chat;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ChatAdvice {

    @ResponseBody
    @ExceptionHandler(NotExistChatTypeWithThisNameException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String notExistChatTypeName(NotExistChatTypeWithThisNameException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(NotAvailablePermissionsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String notAvailablePermissions(NotAvailablePermissionsException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(ChatNotExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String chatNotExist(ChatNotExistException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(UserNotFromThisChatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String userNotFromThisChat(UserNotFromThisChatException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(NotAdminInThisChatException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    String notAdminInThisChat(NotAdminInThisChatException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(PrivateChatCantContainMoreThanTwoMembersException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String privateChatMembers(PrivateChatCantContainMoreThanTwoMembersException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(LastAdminException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    String lastAdminInChat(LastAdminException ex) {
        return ex.getMessage();
    }

}
