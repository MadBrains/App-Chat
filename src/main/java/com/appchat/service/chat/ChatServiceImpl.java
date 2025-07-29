package com.appchat.service.chat;

import static com.appchat.entity.chat.enums.permission.ChatPermissionValues.DESCRIPTION_EDIT;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.dto.chat.ChatMemberDTO;
import com.appchat.dto.message.LastMessageDTO;
import com.appchat.entity.chat.Chat;
import com.appchat.entity.chat.ChatMember;
import com.appchat.entity.chat.ChatType;
import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.appchat.entity.user.User;
import com.appchat.exception.chat.ChatNotExistException;
import com.appchat.exception.chat.NotAdminInThisChatException;
import com.appchat.exception.chat.NotAvailablePermissionsException;
import com.appchat.exception.chat.PrivateChatCantContainMoreThanTwoMembersException;
import com.appchat.repository.chat.ChatRepository;
import com.appchat.service.chat.mapper.ChatMapper;
import com.appchat.service.chat.mapper.ChatMemberMapper;
import com.appchat.service.user.UserService;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;

    private final ChatMemberService chatMemberService;

    private final ChatTypeService chatTypeService;

    private final UserService userService;

    private final ChatMapper chatMapper;

    private final ChatMemberMapper chatMemberMapper;

    @Override
    public List<ChatDTO> findAllChats(int id, Pageable pageable) {
        List<Tuple> chatDTOs = chatRepository.findAllChatsWithMemberInfo(id, pageable);

        return chatDTOs.stream().map(it -> {
            ChatDTO chatDTO =
                    chatMapper.dtoFromEntity(it.get(0, Chat.class));
            chatDTO.setSelfMember(
                    chatMemberMapper.extendedDTOFromEntity(it.get(1, ChatMember.class)));
            LastMessageDTO lastMessageDTO = new LastMessageDTO();
            lastMessageDTO.setFirstName(it.get(2, String.class));
            lastMessageDTO.setLastName(it.get(3, String.class));
            lastMessageDTO.setMessageBody(it.get(4, String.class));
            chatDTO.setLastMessageDTO(lastMessageDTO);
            return chatDTO;
        }).toList();
    }

    public List<Chat> findAllDeletedChats(Pageable pageable) {
        return chatRepository.findAllDeletedChats(pageable);
    }

    @Transactional
    public Chat createChat(ChatDTO chatDTO, int userId) {
        Chat chat = new Chat();
        chat.setChatName(chatDTO.getChatName());
        chat.setDescription(chatDTO.getDescription());
        chat.setAvatarImage(chatDTO.getAvatarImage());
        ChatType chatType = chatTypeService.findByChatTypeByName(chatDTO.getChatTypeName());

        checkIfPermissionAvailable(chatDTO.getChatPermissionsList(), chatType);

        chat.setChatPermissionsList(chatDTO.getChatPermissionsList());
        chat.setChatTypeId(chatType);
        User owner = userService.findUserById(userId);
        chat.setChatOwner(owner);
        chatRepository.save(chat);

        //save owner in db
        ChatMember ownerMember = new ChatMember();
        ownerMember.setUserId(owner);
        ownerMember.setChatId(chat);
        ownerMember.setAdmin(true);
        chatMemberService.save(ownerMember);

        Set<ChatMemberDTO> members = new HashSet<>(
                chatDTO.getMembers() != null ? chatDTO.getMembers() : Set.of());

        //add chat members
        chatMemberService.addChatMembers(members, chat.getId(), owner.getId());

        return chat;
    }

    public Chat findChatById(long id) {
        return chatRepository.findById(id).orElseThrow(() -> new ChatNotExistException(id));
    }

    @Transactional
    public Chat editChat(long chatId, ChatDTO chatDTO, int userId) {
        Chat currentChat = findChatById(chatId);

        ChatType chatType = currentChat.getChatTypeId();
        checkIfPermissionAvailable(chatDTO.getChatPermissionsList(), chatType);

        //find member in this chat
        User editor = userService.findUserById(userId);
        ChatMember currentMember = chatMemberService.findChatMemberByChatIdAndUserId(chatId,
                editor.getId());

        //if user is admin, overwrite all fields
        if (currentMember.isAdmin()) {
            chatMapper.updateChatFromDTO(chatDTO, currentChat);
        } else {
            if (currentChat.getChatPermissionsList().contains(DESCRIPTION_EDIT)) {
                currentChat.setChatName(chatDTO.getChatName());
                currentChat.setDescription(chatDTO.getDescription());
                currentChat.setAvatarImage(chatDTO.getAvatarImage());
            }
        }
        chatRepository.save(currentChat);
        return currentChat;
    }

    @Override
    public void deleteChat(long chatId, int userId) {
        ChatMember currentMember = chatMemberService.findChatMemberByChatIdAndUserId(chatId,
                userId);
        if (currentMember.isAdmin()) {
            Chat chat = chatRepository.findById(chatId).orElseThrow();
            chat.setDeleted(true);
            chatRepository.save(chat);
        } else {
            throw new NotAdminInThisChatException(chatId, userId);
        }
    }

    @Override
    public Long findIdOfPrivateChatIfExist(int firstUserId, ChatDTO chatDTO) {
        //If user create chat with himself
        if (chatDTO.getMembers() == null || chatDTO.getMembers().isEmpty()) {
            return chatRepository.findPrivateChatWithYourself(firstUserId).orElse(new Chat())
                           .getId();
        }//FirstUser who create and member from the list оf members. So the list of members cannot be longer than 1
        else if (chatDTO.getMembers().size() > 1) {
            throw new PrivateChatCantContainMoreThanTwoMembersException();
        }
        int secondUserId = chatDTO.getMembers().stream().findFirst()
                                   .orElse(new ChatMemberDTO()).getUserId();
        //If client send himself member in members
        if (secondUserId == firstUserId) {
            return chatRepository.findPrivateChatWithYourself(firstUserId).orElse(new Chat())
                           .getId();
        } else {
            return chatRepository.findPrivateChatIfExist(firstUserId, secondUserId)
                           .orElse(new Chat()).getId();
        }
    }

    @Override
    @Transactional
    public void restoreChats(List<Long> chatIds) {
        chatRepository.restoreDeletedChatsById(chatIds);
    }

    public void pinMessage(long chatId, long messageId) {
        Chat chat = findChatById(chatId);
        Set<Long> pinnedMessages = new HashSet<>(chat.getPinnedMessageList());
        pinnedMessages.add(messageId);
        chat.setPinnedMessageList(pinnedMessages);
        chatRepository.save(chat);
    }

    public void unpinMessage(long chatId, long messageId) {
        Chat chat = findChatById(chatId);
        Set<Long> pinnedMessages = new HashSet<>(chat.getPinnedMessageList());
        pinnedMessages.remove(messageId);
        chat.setPinnedMessageList(pinnedMessages);
        chatRepository.save(chat);
    }

    public void checkIfPermissionAvailable(Set<ChatPermissionValues> chatPermissionList,
            ChatType chatType) {
        if (chatPermissionList == null
                    || !chatType.getAvailablePermissions().containsAll(chatPermissionList)) {
            throw new NotAvailablePermissionsException();
        }
    }

    public List<Long> findAllChatIdWhereUserIsLastAdmin(int userId) {
        return chatRepository.findAllChatIdWhereUserIsLastAdmin(userId);
    }

}
