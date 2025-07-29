package com.appchat.service.chat;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.dto.chat.ChatEventDTO;
import com.appchat.dto.chat.ChatMemberDTO;
import com.appchat.entity.chat.Chat;
import com.appchat.entity.chat.ChatMember;
import com.appchat.entity.chat.enums.ChatEvent;
import com.appchat.service.chat.mapper.ChatMapper;
import com.appchat.service.chat.mapper.ChatMemberMapper;
import com.appchat.service.message.ChatMessageService;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatEventServiceImpl implements ChatEventService {

    private final ChatMemberService chatMemberService;

    private final ChatService chatService;

    private final ChatMapper chatMapper;

    private final ChatMemberMapper chatMemberMapper;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final TaskExecutor taskExecutor;

    private final ChatMessageService chatMessageService;

    public ChatDTO createChatAndSendEvent(ChatDTO chatDTO, int userId) {
        ChatDTO responseChatDTO = chatMapper.dtoFromEntity(chatService.createChat(chatDTO, userId));
        Set<Integer> members = chatMemberService.findAllMemberIdInChat(responseChatDTO.getId());
        taskExecutor.execute(
                () -> sendChatUpdate(responseChatDTO, ChatEvent.CREATE, userId, members));
        responseChatDTO.setSelfMember(
                new ChatMemberDTO.Builder().userId(userId).isAdmin(true).build());
        return responseChatDTO;
    }

    public ChatDTO editChatAndSendEvent(ChatDTO chatDTO, int userId, long chatId) {
        ChatDTO responseChatDTO = chatMapper.dtoFromEntity(
                chatService.editChat(chatId, chatDTO, userId));
        Set<Integer> members = chatMemberService.findAllMemberIdInChat(chatId);
        taskExecutor.execute(()
                                     -> sendChatUpdate(responseChatDTO, ChatEvent.EDIT, userId,
                members));
        responseChatDTO.setSelfMember(
                new ChatMemberDTO.Builder().userId(userId).isAdmin(true).build());
        return responseChatDTO;
    }

    public void deleteChatAndSendEvent(int userId, long chatId) {
        chatService.deleteChat(chatId, userId);
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setId(chatId);
        chatDTO.setDeleted(true);
        Set<Integer> members = chatMemberService.findAllMemberIdInChat(chatId);
        taskExecutor.execute(() -> sendChatUpdate(chatDTO, ChatEvent.DELETE, userId, members));
    }

    public void memberAddingAndSendEvent(Set<ChatMemberDTO> membersId, long chatId, int adminId) {
        //Find old members
        Set<Integer> oldMembers = chatMemberService.findAllMemberIdInChat(chatId);

        Set<ChatMember> addedMembers = chatMemberService.addChatMembers(membersId, chatId, adminId);
        Chat chat = chatService.findChatById(chatId);
        //DTO sending to added members
        ChatDTO chatDTOToNewMembers = chatMapper.dtoFromEntity(chat);

        //DTO sending to all existing members in chat
        ChatDTO chatDTOToOldMembers = new ChatDTO();
        chatDTOToOldMembers.setId(chatId);
        Set<ChatMemberDTO> extendedAddedMembers = chatMemberService
                                                          .findExtendedMembersInChat(chatId,
                                                                  Pageable.unpaged())
                                                          .stream()
                                                          .filter(it -> !oldMembers.contains(
                                                                  it.getUserId()))
                                                          .collect(Collectors.toSet());
        chatDTOToOldMembers.setMembers(extendedAddedMembers);

        //Send update to new members
        taskExecutor.execute(() -> sendChatUpdate(chatDTOToNewMembers, ChatEvent.MEMBERS_ADD, 0,
                addedMembers.stream()
                        .map(it -> it.getUserId().getId())
                        .collect(Collectors.toSet())));

        //Send update to old members
        taskExecutor.execute(() -> sendChatUpdate(chatDTOToOldMembers, ChatEvent.MEMBERS_ADD, 0,
                oldMembers));
        chatMessageService.addMembersToChat(addedMembers, chatId, adminId);
    }

    @Override
    public void memberJoinAndSendEvent(long chatId, int userId) {
        Set<Integer> allMembers = chatMemberService.findAllMemberIdInChat(chatId);

        Chat chat = chatService.findChatById(chatId);

        ChatMember chatMember = chatMemberService.joinChat(chat, userId);
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setId(chatId);
        chatDTO.setMembers(Set.of(chatMemberMapper.extendedDTOFromEntity(chatMember)));

        taskExecutor.execute(() -> sendChatUpdate(chatDTO, ChatEvent.MEMBERS_ADD, 0, allMembers));
        chatMessageService.memberJoinToChat(chatId, userId);
    }

    public void removeMemberFromChatAndSendEvent(long chatId, int userId, int adminId) {
        //find all members before removing
        Set<Integer> allMembers = chatMemberService.findAllMemberIdInChat(chatId);

        ChatMember chatMember = chatMemberService.removeMember(chatId, userId, adminId);
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setId(chatId);
        chatDTO.setMembers(Set.of(chatMemberMapper.extendedDTOFromEntity(chatMember)));

        taskExecutor.execute(() -> sendChatUpdate(chatDTO, ChatEvent.MEMBER_REMOVE, 0, allMembers));
        chatMessageService.removeMemberFromChat(chatId, userId, adminId);
    }

    private void sendChatUpdate(ChatDTO chatDTO, ChatEvent chatEvent, int userId,
            Set<Integer> members) {
        ChatEventDTO chatEventDTO = new ChatEventDTO();
        chatEventDTO.setEvent(chatEvent);
        chatEventDTO.setChat(chatDTO);
        //filtering to avoid duplicates from the creator with rest and socket
        members.stream().filter(it -> it != userId)
                .forEach(it -> simpMessagingTemplate
                                       .convertAndSendToUser(String.valueOf(it), "/queue",
                                               chatEventDTO));
    }

}
