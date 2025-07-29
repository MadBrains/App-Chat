package com.appchat.service.chat;

import com.appchat.dto.chat.ChatMemberDTO;
import com.appchat.dto.chat.ExtendedChatMemberDTO;
import com.appchat.entity.chat.Chat;
import com.appchat.entity.chat.ChatMember;
import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.appchat.entity.user.User;
import com.appchat.exception.chat.ChatIsEmptyException;
import com.appchat.exception.chat.LastAdminException;
import com.appchat.exception.chat.NotAdminInThisChatException;
import com.appchat.exception.chat.NotAvailablePermissionsException;
import com.appchat.exception.chat.UserNotFromThisChatException;
import com.appchat.repository.chat.ChatMemberRepository;
import com.appchat.service.chat.mapper.ChatMemberMapper;
import com.appchat.service.user.UserService;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
@RequiredArgsConstructor
public class ChatMemberServiceImpl implements ChatMemberService {

    private final ChatMemberRepository chatMemberRepository;

    private final UserService userService;

    private final ChatMemberMapper chatMemberMapper;

    @Transactional
    public Set<ChatMember> addChatMembers(Set<ChatMemberDTO> members, long chatId, int creatorId) {
        ChatMember creator = findChatMemberByChatIdAndUserId(chatId, creatorId);
        Chat currentChat = creator.getChatId();
        Set<ChatMember> addedMembers = new HashSet<>();
        if ((creator.isAdmin() || (currentChat.getChatPermissionsList() != null
                                           && currentChat.getChatPermissionsList().contains(
                ChatPermissionValues.MEMBER_INVITE)))
                    && members != null) {
            //Find all unique user id in this chat
            HashSet<Integer> uniqueUser = (HashSet<Integer>) chatMemberRepository.findAllMemberIdInChat(
                    chatId);
            members.forEach(member -> {
                //check if user already been in chat
                if (!uniqueUser.contains(member.getUserId())) {
                    ChatMember chatMember = new ChatMember();
                    chatMember.setChatId(currentChat);
                    chatMember.setUserId(userService.findUserById(member.getUserId()));
                    chatMember.setAdmin(member.isAdmin());
                    chatMemberRepository.save(chatMember);
                    uniqueUser.add(member.getUserId());
                    addedMembers.add(chatMember);
                }
            });
        }
        return addedMembers;
    }

    @Override
    public ChatMember joinChat(Chat chat, int userId) {
        if (chat.getChatPermissionsList() != null
                    && !chat.getChatPermissionsList()
                                .contains(ChatPermissionValues.MEMBER_PUBLIC)) {
            throw new NotAvailablePermissionsException();
        }
        if (CollectionUtils.isEmpty(chat.getMembers())) {
            throw new ChatIsEmptyException();
        }
        ChatMember chatMember = chatMemberMapper.fromChatByUserid(chat, userId, false);

        return chatMemberRepository.save(chatMember);
    }

    public ChatMember findChatMemberByChatIdAndUserId(long chatId, int userId) {
        return chatMemberRepository.findChatMemberByChatIdAndUserId(chatId, userId)
                       .orElseThrow(UserNotFromThisChatException::new);
    }

    public void muteChat(int userId, long chatId, String mutedTo) {
        User user = userService.findUserById(userId);
        ChatMember currentChatMember = findChatMemberByChatIdAndUserId(chatId, user.getId());
        currentChatMember.setMutedTo(LocalDateTime.parse(mutedTo));
        chatMemberRepository.save(currentChatMember);
    }

    public void archiveChat(int userId, long chatId, boolean archived) {
        User user = userService.findUserById(userId);
        ChatMember currentChatMember = findChatMemberByChatIdAndUserId(chatId, user.getId());
        currentChatMember.setArchived(archived);
        chatMemberRepository.save(currentChatMember);
    }

    public void ignoreChatInvocation(int userId, long chatId, boolean ignoreInvocation) {
        User user = userService.findUserById(userId);
        ChatMember currentChatMember = findChatMemberByChatIdAndUserId(chatId, user.getId());
        currentChatMember.setIgnoreInvocation(ignoreInvocation);
        chatMemberRepository.save(currentChatMember);
    }

    public void setAdmin(int adminId, long chatId, int userId, boolean isAdmin) {
        User user = userService.findUserById(adminId);
        ChatMember admin = findChatMemberByChatIdAndUserId(chatId, user.getId());
        if (admin.isAdmin()) {
            ChatMember member = findChatMemberByChatIdAndUserId(chatId, userId);
            member.setAdmin(isAdmin);
            chatMemberRepository.save(member);
        } else {
            throw new NotAdminInThisChatException(chatId, admin.getUserId().getId());
        }
    }

    public ChatMember save(ChatMember chatMember) {
        return chatMemberRepository.save(chatMember);
    }

    public List<ExtendedChatMemberDTO> findExtendedMembersInChat(long chatId, Pageable pageable) {
        List<Tuple> postDTOs = chatMemberRepository.findChatMemberByChatId(chatId, pageable);

        return postDTOs.stream().map(it -> {
            ExtendedChatMemberDTO extendedChatMemberDTO = chatMemberMapper.extendedDTOFromEntity(
                    (ChatMember) it.get(0));
            extendedChatMemberDTO.setFirstName((String) it.get(1));
            extendedChatMemberDTO.setLastName((String) it.get(2));
            extendedChatMemberDTO.setAvatarUrl((String) it.get(3));
            return extendedChatMemberDTO;
        }).toList();
    }

    @Override
    public void leaveChat(long chatId, int userId) {
        ChatMember chatMember = findChatMemberByChatIdAndUserId(chatId, userId);
        if (chatMember.isAdmin()) {
            List<ChatMember> admins = chatMemberRepository.findAllAdminsInChat(chatId);
            if (admins.size() > 1) {
                chatMemberRepository.delete(chatMember);
            } else {
                throw new LastAdminException();
            }
        } else {
            chatMemberRepository.delete(chatMember);
        }
    }

    public Set<Integer> findAllMemberIdInChat(long chatId) {
        return chatMemberRepository.findAllMemberIdInChat(chatId);
    }

    public ChatMember removeMember(long chatId, int userId, int adminId) {
        ChatMember adminMember = findChatMemberByChatIdAndUserId(chatId, adminId);
        if (adminMember.isAdmin()) {
            ChatMember chatMember = findChatMemberByChatIdAndUserId(chatId, userId);
            chatMemberRepository.delete(chatMember);
            return chatMember;
        } else {
            throw new NotAdminInThisChatException(adminId, chatId);
        }
    }

}
