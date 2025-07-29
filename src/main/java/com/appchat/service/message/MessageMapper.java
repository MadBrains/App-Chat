package com.appchat.service.message;

import com.appchat.dto.message.MessageDTO;
import com.appchat.entity.message.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId.id", source = "userId")
    @Mapping(target = "chatId.id", source = "chatId")
    @Mapping(target = "sentAt", source = "sentAt",
            defaultExpression = "java(LocalDateTime.parse(dto.getSentAt()))")
    void messageFromDTO(MessageDTO dto, @MappingTarget Message message);

    @Mapping(source = "userId.id", target = "userId")
    @Mapping(source = "chatId.id", target = "chatId")
    MessageDTO dtoFromEntity(Message message);

}
