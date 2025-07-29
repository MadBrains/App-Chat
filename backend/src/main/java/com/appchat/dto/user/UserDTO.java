package com.appchat.dto.user;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.appchat.entity.user.enums.permission.PermissionValues;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class UserDTO {

    private Integer id;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("middle_name")
    private String middleName;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    @JsonProperty("birth_date")
    private LocalDateTime birthDate;

    @JsonProperty("user_type")
    private int userType;

    @JsonProperty("permission_list")
    private Set<PermissionValues> extendedPermissionList;

}
