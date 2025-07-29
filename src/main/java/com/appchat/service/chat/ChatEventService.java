package com.appchat.service.chat;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.dto.chat.ChatMemberDTO;
import java.util.Set;

public interface ChatEventService {

    ChatDTO createChatAndSendEvent(ChatDTO chatDTO, int userId);

    ChatDTO editChatAndSendEvent(ChatDTO chatDTO, int userId, long chatId);

    void deleteChatAndSendEvent(int userId, long chatId);

    void memberAddingAndSendEvent(Set<ChatMemberDTO> membersId, long chatId, int adminId);

    void memberJoinAndSendEvent(long chatId, int userId);

    void removeMemberFromChatAndSendEvent(long chatId, int userId, int adminId);

}
