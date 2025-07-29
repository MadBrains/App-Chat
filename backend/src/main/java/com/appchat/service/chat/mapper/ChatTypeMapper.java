package com.appchat.service.chat.mapper;

import com.appchat.dto.chat.ChatTypeDTO;
import com.appchat.entity.chat.ChatType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatTypeMapper {

    ChatTypeDTO dtoFromEntity(ChatType chatType);

}
