package com.appchat.dto.user;

import com.appchat.entity.user.enums.permission.PermissionValues;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class RoleDTO {

    private Integer id;

    @JsonProperty("role_name")
    private String roleName;

    private String description;

    @JsonProperty("permission_list")
    @NotNull
    private Set<@NotNull PermissionValues> permissionList;

    private boolean deleted;

}
