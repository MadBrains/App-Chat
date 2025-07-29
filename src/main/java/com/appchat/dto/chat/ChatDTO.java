package com.appchat.dto.chat;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.appchat.dto.message.LastMessageDTO;
import com.appchat.entity.chat.enums.ChatTypeName;
import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(NON_NULL)
public class ChatDTO {

    private long id;

    @NotNull
    @JsonProperty("chat_type")
    private ChatTypeName chatTypeName;

    @JsonProperty("chat_name")
    private String chatName;

    private String description;

    //TODO: check trouble with blob!!
    @JsonProperty("avatar_image")
    private String avatarImage;

    @JsonProperty("chat_permission_list")
    private Set<ChatPermissionValues> chatPermissionsList;

    private Set<ChatMemberDTO> members;

    @JsonProperty("pinned_message_list")
    private Set<Long> pinnedMessageList;

    @JsonProperty("is_deleted")
    private boolean isDeleted;

    @JsonProperty("self_member")
    private ChatMemberDTO selfMember;

    @JsonProperty("last_message")
    private LastMessageDTO lastMessageDTO;

}
