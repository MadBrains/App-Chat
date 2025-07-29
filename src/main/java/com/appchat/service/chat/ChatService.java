package com.appchat.service.chat;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.entity.chat.Chat;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface ChatService {

    List<ChatDTO> findAllChats(int id, Pageable pageable);

    List<Chat> findAllDeletedChats(Pageable pageable);

    Chat createChat(ChatDTO chatDTO, int userId);

    Chat findChatById(long id);

    Chat editChat(long chatId, ChatDTO chatDTO, int userId);

    void deleteChat(long chatId, int userId);

    Long findIdOfPrivateChatIfExist(int creatorId, ChatDTO chatDTO);

    void restoreChats(List<Long> chatIds);

    void unpinMessage(long chatId, long messageId);

    void pinMessage(long chatId, long messageId);

    List<Long> findAllChatIdWhereUserIsLastAdmin(int userId);

}
