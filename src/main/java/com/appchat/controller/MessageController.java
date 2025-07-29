package com.appchat.controller;

import com.appchat.dto.message.MessageDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.appchat.service.message.MessageMapper;
import com.appchat.service.message.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/message")
public class MessageController {

    private final MessageService messageService;

    private final MessageMapper messageMapper;

    @MessageMapping("/chat/{chatId}")
    public void processMessage(@Payload MessageDTO messageDTO,
            PreAuthenticatedAuthenticationToken userPrincipal,
            @DestinationVariable long chatId) {
        ChatUserDetails userDetails = (ChatUserDetails) userPrincipal.getPrincipal();
        messageService.sendMessage(messageDTO, userDetails.getId(), chatId);
    }

    @Operation(summary = "Find message in chat")
    @GetMapping("/{chatId}")
    public ResponseEntity<List<MessageDTO>> getMessage(
            @RequestParam(required = false, defaultValue = "0") long cursor,
            @RequestParam long limit,
            @PathVariable long chatId) {
        return ResponseEntity.ok(
                messageService.findMessages(limit, cursor, chatId)
                        .stream()
                        .map(messageMapper::dtoFromEntity)
                        .toList());
    }

}
