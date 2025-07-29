package com.appchat.service.user.role;

import com.appchat.dto.user.RoleDTO;
import com.appchat.entity.user.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleDTO roleToRoleDTO(Role role);

    @Mapping(target = "id", ignore = true)
    void updateRoleFromDTO(RoleDTO dto, @MappingTarget Role role);

}
