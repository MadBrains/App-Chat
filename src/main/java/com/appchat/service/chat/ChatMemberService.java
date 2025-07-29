package com.appchat.service.chat;

import com.appchat.dto.chat.ChatMemberDTO;
import com.appchat.dto.chat.ExtendedChatMemberDTO;
import com.appchat.entity.chat.Chat;
import com.appchat.entity.chat.ChatMember;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Pageable;

public interface ChatMemberService {

    Set<ChatMember> addChatMembers(Set<ChatMemberDTO> members, long chatId, int userId);

    ChatMember joinChat(Chat chat, int userId);

    ChatMember findChatMemberByChatIdAndUserId(long chatId, int userId);

    void muteChat(int userId, long chatId, String mutedTo);

    void archiveChat(int userId, long chatId, boolean archived);

    void ignoreChatInvocation(int userId, long chatId, boolean ignoreInvocation);

    void setAdmin(int adminId, long chatId, int userId, boolean isAdmin);

    ChatMember save(ChatMember chatMember);

    List<ExtendedChatMemberDTO> findExtendedMembersInChat(long chatId, Pageable pageable);

    void leaveChat(long chatId, int userId);

    Set<Integer> findAllMemberIdInChat(long chatId);

    ChatMember removeMember(long chatId, int userId, int adminId);

}
