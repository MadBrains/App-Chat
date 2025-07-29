package com.appchat.dto.user;

import com.appchat.entity.user.enums.permission.PermissionValues;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateDTO extends UserDTO {

    @Email
    @NotBlank
    private String email;

    @NotEmpty
    @JsonProperty("role_ids")
    private List<Integer> roleIds;

    @JsonProperty("user_type")
    private int userType;

    public UserCreateDTO(Integer id, String firstName, String lastName, String middleName,
            String avatarUrl, LocalDateTime birthDate, Set<PermissionValues> extendedPermissionList,
            String email, List<Integer> roleIds, int userType) {
        super(id, firstName, lastName, middleName,
                avatarUrl, birthDate, userType, extendedPermissionList);
        this.email = email;
        this.userType = userType;
        this.roleIds = roleIds;
    }

}
