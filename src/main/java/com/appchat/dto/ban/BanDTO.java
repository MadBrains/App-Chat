package com.appchat.dto.ban;

import com.appchat.entity.user.enums.permission.PermissionValues;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class BanDTO {

    private long id;

    @JsonProperty("ban_name")
    private String banName;

    private String description;

    @JsonProperty("for_client")
    private boolean forClient;

    @JsonProperty("for_user")
    private boolean forUser;

    private boolean system;

    @JsonProperty("excluded_permission")
    private Set<PermissionValues> excludedPermission;

    @JsonProperty("default_ban_duration")
    private String defaultBanDuration;

}
