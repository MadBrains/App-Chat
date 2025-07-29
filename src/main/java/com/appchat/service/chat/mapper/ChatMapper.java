package com.appchat.service.chat.mapper;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.entity.chat.Chat;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ChatMapper {

    @Mapping(target = "chatTypeName", source = "chatTypeId.chatTypeName")
    @Mapping(target = "members", ignore = true)
    ChatDTO dtoFromEntity(Chat chat);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "chatOwner", ignore = true)
    @Mapping(target = "chatTypeId", ignore = true)
    @Mapping(target = "members", ignore = true)
    void updateChatFromDTO(ChatDTO dto, @MappingTarget Chat chat);

}
