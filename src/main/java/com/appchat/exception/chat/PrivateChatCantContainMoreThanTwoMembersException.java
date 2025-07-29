package com.appchat.exception.chat;

public class PrivateChatCantContainMoreThanTwoMembersException extends RuntimeException {

    public PrivateChatCantContainMoreThanTwoMembersException() {
        super("private chat can't contains more than two members");
    }

}
