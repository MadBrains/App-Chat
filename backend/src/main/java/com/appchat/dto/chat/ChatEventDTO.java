package com.appchat.dto.chat;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

import com.appchat.entity.chat.enums.ChatEvent;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(NON_NULL)
public class ChatEventDTO {

    private ChatEvent event;

    private ChatDTO chat;

}
