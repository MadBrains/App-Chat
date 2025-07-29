package com.appchat.service.message;

import com.appchat.entity.chat.ChatMember;
import java.util.Set;

public interface ChatMessageService {

    void memberLeaveChat(long chatId, int userId);

    void removeMemberFromChat(long chatId, int userId, int adminId);

    void addMembersToChat(Set<ChatMember> members, long chatId, int adminId);

    void memberJoinToChat(long chatId, int userId);

}
