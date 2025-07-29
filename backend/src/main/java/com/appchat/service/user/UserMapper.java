package com.appchat.service.user;

import com.appchat.dto.user.UserDTO;
import com.appchat.dto.user.UserWithEmailDTO;
import com.appchat.dto.user.UserWithRoleNameDTO;
import com.appchat.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userType.id", source = "userType")
    void saveUserFromDTO(UserDTO userDTO, @MappingTarget User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userType", ignore = true)
    @Mapping(target = "extendedPermissionList", ignore = true)
    void updateUserFromDTO(UserDTO userDTO, @MappingTarget User user);

    @Mapping(target = "userType", source = "userType.id")
    UserDTO dtoFromEntity(User user);

    @Mapping(target = "userType", source = "userType.id")
    UserWithEmailDTO dtoWithEmailFromEntity(User user);

    @Mapping(target = "userType", source = "userType.id")
    UserWithRoleNameDTO dtoWithRoleNameFromEntity(User user);

}
