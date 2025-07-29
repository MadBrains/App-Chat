package com.appchat.service.chat.mapper;

import com.appchat.dto.chat.ChatMemberDTO;
import com.appchat.dto.chat.ExtendedChatMemberDTO;
import com.appchat.entity.chat.Chat;
import com.appchat.entity.chat.ChatMember;
import com.appchat.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public abstract class ChatMemberMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId.id", source = "userId")
    @Mapping(target = "chatId.id", source = "chatId")
    public abstract void chatMemberFromDTO(ChatMemberDTO dto, @MappingTarget ChatMember chatMember);

    @Mapping(target = "userId", source = "userId.id")
    @Mapping(target = "chatId", source = "chatId.id")
    public abstract ExtendedChatMemberDTO extendedDTOFromEntity(ChatMember chatMember);

    public ChatMember fromChatByUserid(Chat chat, int userId, boolean isAdmin) {
        User user = new User();
        user.setId(userId);

        ChatMember chatMember = new ChatMember();
        chatMember.setChatId(chat);
        chatMember.setUserId(user);
        chatMember.setAdmin(isAdmin);

        return chatMember;
    }

}
