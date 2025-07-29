package com.appchat.service.message;

import com.appchat.dto.message.MessageDTO;
import com.appchat.entity.message.Message;
import java.util.List;

public interface MessageService {

    Message createMessage(MessageDTO messageDTO);

    void sendMessage(MessageDTO messageDTO, int userId, long chatId);

    List<Message> findMessages(long limit, long cursor, long chatId);

}
