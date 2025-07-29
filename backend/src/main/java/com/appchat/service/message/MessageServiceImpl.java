package com.appchat.service.message;

import com.appchat.dto.message.MessageDTO;
import com.appchat.entity.message.Message;
import com.appchat.repository.MessageRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    private final MessageMapper messageMapper;

    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public void sendMessage(MessageDTO messageDTO, int userId, long chatId) {
        messageDTO.setUserId(userId);
        messageDTO.setChatId(chatId);
        messageDTO.setSentAt(LocalDateTime.now()
                                     .truncatedTo(ChronoUnit.SECONDS)
                                     .format(DateTimeFormatter.ISO_DATE_TIME));
        Message message = createMessage(messageDTO);
        messageDTO.setId(message.getId());
        messagingTemplate.convertAndSend("/api/v1.0/socket/topic/chat/" + chatId, messageDTO);
    }

    public Message createMessage(MessageDTO messageDTO) {
        Message message = new Message();
        messageMapper.messageFromDTO(messageDTO, message);
        messageRepository.save(message);
        return message;
    }

    public List<Message> findMessages(long limit, long cursor, long chatId) {
        return messageRepository.cursorFindMessages(chatId, limit, cursor);
    }

}
