package com.appchat.service.log.aop;

import com.appchat.dto.log.EntityChangerDTO;
import com.appchat.dto.user.UserDTO;
import com.appchat.entity.user.User;
import com.appchat.exception.user.UserNotfoundException;
import com.appchat.service.log.ChangeLogService;
import com.appchat.service.user.UserMapper;
import com.appchat.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Slf4j
@Component
@AllArgsConstructor
public class ChangeLogAopService {

    private final ChangeLogService changeLogService;

    private final UserService userService;

    private final UserMapper userMapper;

    @Around(value = "args(userDTO,email) && @annotation(com.appchat.service.log.annotation.ChangeLog)",
            argNames = "pjp,userDTO,email")
    public Object afterUpdateUser(ProceedingJoinPoint pjp, UserDTO userDTO, String email) {
        EntityChangerDTO entityChangerDTO = null;
        User before = userService.findUserByMethodValue(email);
        UserDTO userDTOBefore = userMapper.dtoFromEntity(before);
        try {
            entityChangerDTO = (EntityChangerDTO) pjp.proceed();
        } catch (Throwable throwable) {
            log.error(throwable.getMessage());
        }
        if (entityChangerDTO == null) {
            throw new UserNotfoundException(userDTO.getId());
        }
        UserDTO userDTOAfter = userMapper.dtoFromEntity(before);
        changeLogService.findChanges(userDTOBefore, userDTOAfter, User.class.getSimpleName(),
                entityChangerDTO);
        return entityChangerDTO;
    }

}
