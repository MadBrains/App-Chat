package com.appchat.dto.chat;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.appchat.entity.chat.enums.ChatTypeName;
import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
@JsonInclude(NON_NULL)
public class ChatTypeDTO {

    private Long id;

    @JsonProperty("chat_type")
    private ChatTypeName chatTypeName;

    @JsonProperty("available_permissions")
    private Set<ChatPermissionValues> availablePermissions;

    @JsonProperty("default_permissions")
    private Set<ChatPermissionValues> defaultPermissions;

}
