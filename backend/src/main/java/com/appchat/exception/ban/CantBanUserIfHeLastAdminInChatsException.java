package com.appchat.exception.ban;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CantBanUserIfHeLastAdminInChatsException extends RuntimeException {

    private final List<Long> chatIds;

    public CantBanUserIfHeLastAdminInChatsException(List<Long> chatIds) {
        super("You can't ban this user right now, because he is admin of one or more group chats.");
        this.chatIds = chatIds;
    }

}
