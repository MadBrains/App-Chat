package com.appchat.dto.user;

import com.appchat.entity.user.enums.permission.PermissionValues;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWithEmailDTO extends UserDTO {

    private String email;

    public UserWithEmailDTO(Integer id, String firstName, String lastName, String middleName,
            String avatarUrl,
            LocalDateTime birthDate, Integer userType, Set<PermissionValues> extendedPermissionList,
            String email) {
        super(id, firstName, lastName, middleName, avatarUrl, birthDate, userType,
                extendedPermissionList);
        this.email = email;
    }

}
