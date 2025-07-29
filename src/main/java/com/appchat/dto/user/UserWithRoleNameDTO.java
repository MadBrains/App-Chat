package com.appchat.dto.user;

import com.appchat.entity.user.enums.permission.PermissionValues;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWithRoleNameDTO extends UserDTO {

    private List<String> roles;

    public UserWithRoleNameDTO(Integer id, String firstName, String lastName, String middleName,
            String avatarUrl,
            LocalDateTime birthDate, Integer userType,
            Set<PermissionValues> extendedPermissionList, List<String> roles) {
        super(id, firstName, lastName, middleName, avatarUrl, birthDate, userType,
                extendedPermissionList);
        this.roles = roles;
    }

}
