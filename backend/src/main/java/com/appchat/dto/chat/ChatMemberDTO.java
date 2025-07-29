package com.appchat.dto.chat;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(NON_DEFAULT)
public class ChatMemberDTO {

    private ChatMemberDTO(Builder builder) {
        this.userId = builder.userId;
        this.chatId = builder.chatId;
        this.isAdmin = builder.isAdmin;
        this.archived = builder.archived;
        this.ignoreInvocation = builder.ignoreInvocation;
        this.mutedTo = builder.mutedTo;
    }

    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("chat_id")
    private long chatId;

    @JsonProperty("is_admin")
    private boolean isAdmin;

    private boolean archived;

    @JsonProperty("ignore_invocation")
    private boolean ignoreInvocation;

    @JsonProperty("muted_to")
    private LocalDateTime mutedTo;

    public static class Builder {

        private int userId;

        private long chatId;

        private boolean isAdmin;

        private boolean archived;

        private boolean ignoreInvocation;

        private LocalDateTime mutedTo;

        public Builder userId(int userId) {
            this.userId = userId;
            return this;
        }

        public Builder chatId(long chatId) {
            this.chatId = chatId;
            return this;
        }

        public Builder isAdmin(boolean isAdmin) {
            this.isAdmin = isAdmin;
            return this;
        }

        public Builder archived(boolean archived) {
            this.archived = archived;
            return this;
        }

        public Builder ignoreInvocation(boolean ignoreInvocation) {
            this.ignoreInvocation = ignoreInvocation;
            return this;
        }

        public Builder localeDateTime(LocalDateTime mutedTo) {
            this.mutedTo = mutedTo;
            return this;
        }

        public ChatMemberDTO build() {
            return new ChatMemberDTO(this);
        }

    }

}
