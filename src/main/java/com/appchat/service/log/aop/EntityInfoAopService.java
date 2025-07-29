package com.appchat.service.log.aop;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.dto.log.ChatCreatorDTO;
import com.appchat.dto.log.EntityChangerDTO;
import com.appchat.dto.log.EntityInfoDTO;
import com.appchat.dto.log.UserCreatorDTO;
import com.appchat.dto.user.UserDTO;
import com.appchat.entity.chat.Chat;
import com.appchat.entity.log.enums.OperationType;
import com.appchat.entity.user.User;
import com.appchat.service.log.EntityInfoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
@AllArgsConstructor
public class EntityInfoAopService {

    private final EntityInfoService entityInfoService;

    @AfterReturning(value = "args(userDTO,email) && @annotation(com.appchat.service.log.annotation.EntityInfo)",
            argNames = "userDTO,email,entityChangerDTO", returning = "entityChangerDTO")
    public void afterUpdateUser(UserDTO userDTO, String email, EntityChangerDTO entityChangerDTO) {
        EntityInfoDTO entityInfoDTO = new EntityInfoDTO();
        entityInfoDTO.setType(OperationType.EDITED);
        entityInfoDTO.setCreatedBySystem(false);
        entityInfoDTO.setEntity(User.class.getSimpleName());
        entityInfoDTO.setByUser(entityChangerDTO.getByUser());
        entityInfoDTO.setEntitySampleId((long) entityChangerDTO.getEntitySampleId());
        entityInfoService.createEntityInfo(entityInfoDTO);
    }

    @AfterReturning(value = "args(userDTO,creator) && @annotation(com.appchat.service.log.annotation.EntityInfo)",
            argNames = "userDTO,creator,userCreatorDTO", returning = "userCreatorDTO")
    public void afterCreateUser(UserDTO userDTO, User creator, UserCreatorDTO userCreatorDTO) {
        EntityInfoDTO entityInfoDTO = new EntityInfoDTO();
        entityInfoDTO.setType(OperationType.CREATED);
        entityInfoDTO.setCreatedBySystem(false);
        entityInfoDTO.setEntity(User.class.getSimpleName());
        entityInfoDTO.setByUser(userCreatorDTO.getByUser());
        entityInfoDTO.setEntitySampleId((long) userCreatorDTO.getEntitySampleId().getId());
        entityInfoService.createEntityInfo(entityInfoDTO);
    }

    @AfterReturning(value = "args(chatDTO,email) && @annotation(com.appchat.service.log.annotation.EntityInfo)",
            argNames = "chatDTO,email,chatCreatorDTO", returning = "chatCreatorDTO")
    public void afterCreateChat(ChatDTO chatDTO, String email, ChatCreatorDTO chatCreatorDTO) {
        EntityInfoDTO entityInfoDTO = new EntityInfoDTO();
        entityInfoDTO.setType(OperationType.CREATED);
        entityInfoDTO.setCreatedBySystem(false);
        entityInfoDTO.setEntity(Chat.class.getSimpleName());
        entityInfoDTO.setByUser(chatCreatorDTO.getByUser());
        entityInfoDTO.setEntitySampleId(chatCreatorDTO.getEntitySampleId());
        entityInfoService.createEntityInfo(entityInfoDTO);
    }

}
