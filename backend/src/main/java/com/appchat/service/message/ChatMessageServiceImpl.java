package com.appchat.service.message;

import com.appchat.dto.message.MessageDTO;
import com.appchat.entity.chat.ChatMember;
import com.appchat.entity.user.User;
import com.appchat.service.chat.ChatMemberService;
import com.appchat.service.user.UserService;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMemberService chatMemberService;

    private final MessageService messageService;

    private final UserService userService;

    private final TaskExecutor taskExecutor;

    private static final String LEAVE_CHAT_MESSAGE = "Пользователь %s %s покинула(а) чат";

    private static final String REMOVE_FROM_CHAT_MESSAGE = "Пользователь %s %s исключен(а) из чата";

    private static final String ADD_MEMBER_TO_CHAT_MESSAGE = "Пользователь %s %s добавлен(а) в чат";

    private static final String MEMBER_JOIN_TO_CHAT_MESSAGE = "Пользователь %s %s присоединился к чату";


    public void memberLeaveChat(long chatId, int userId) {
        chatMemberService.leaveChat(chatId, userId);
        completeMessage(LEAVE_CHAT_MESSAGE, chatId, userId, userId);
    }

    public void removeMemberFromChat(long chatId, int userId, int adminId) {
        completeMessage(REMOVE_FROM_CHAT_MESSAGE, chatId, userId, adminId);
    }

    public void addMembersToChat(Set<ChatMember> members, long chatId, int adminId) {
        taskExecutor.execute(() -> members.forEach(it
                                                           -> completeMessage(
                ADD_MEMBER_TO_CHAT_MESSAGE, chatId, it.getUserId().getId(), adminId)));
    }

    @Override
    public void memberJoinToChat(long chatId, int userId) {
        completeMessage(MEMBER_JOIN_TO_CHAT_MESSAGE, chatId, userId, userId);
    }

    private void completeMessage(String text, long chatId, int userId, int adminId) {
        MessageDTO systemMessage = new MessageDTO();
        systemMessage.setSystem(true);
        User user = userService.findUserById(userId);
        systemMessage.setBody(String.format(text, user.getFirstName(), user.getLastName()));
        messageService.sendMessage(systemMessage, adminId, chatId);
    }

}
