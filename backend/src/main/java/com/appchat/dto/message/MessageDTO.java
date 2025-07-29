package com.appchat.dto.message;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(NON_NULL)
public class MessageDTO {

    private long id;

    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("chat_id")
    private long chatId;

    @JsonProperty("sent_at")
    private String sentAt;

    @JsonProperty("contains_message_id")
    private Long containsMessageId;

    private String body;

    private String username;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    @JsonProperty("update_at")
    private String updatedAt;

    private boolean deleted;

    private boolean system;

    @JsonProperty("first_read_at")
    private String firstReadAt;

    @JsonProperty("has_attachment")
    private boolean hasAttachment;

}
