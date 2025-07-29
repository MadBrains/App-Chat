package com.appchat.controller;

import com.appchat.dto.chat.ChatMemberDTO;
import com.appchat.dto.chat.ExtendedChatMemberDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.appchat.service.chat.ChatEventService;
import com.appchat.service.chat.ChatMemberService;
import com.appchat.service.message.ChatMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/chat")
public class ChatMemberController {

    private final ChatMemberService chatMemberService;

    private final ChatMessageService chatMessageService;

    private final ChatEventService chatEventService;


    @Operation(summary = "Mute this chat until requested time")
    @PatchMapping("/{chatId}/mute")
    ResponseEntity<HttpStatus> mute(@PathVariable int chatId,
            @RequestParam String mutedTo,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatMemberService.muteChat(userPrincipal.getId(), chatId, mutedTo);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Ignore invocation in this chat")
    @PatchMapping("/{chatId}/ignore-invocation")
    ResponseEntity<HttpStatus> ignoreInvocation(@PathVariable int chatId,
            @RequestParam boolean ignoreInvocation,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatMemberService.ignoreChatInvocation(userPrincipal.getId(), chatId, ignoreInvocation);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Archive this chat")
    @PatchMapping("/{chatId}/archive")
    ResponseEntity<HttpStatus> archive(@PathVariable int chatId,
            @RequestParam boolean archived,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatMemberService.archiveChat(userPrincipal.getId(), chatId, archived);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Make member admin in this chat")
    @PatchMapping("/{chatId}/members/{userId}/makeAdmin")
    ResponseEntity<HttpStatus> setAdmin(@PathVariable int chatId,
            @PathVariable int userId,
            @RequestParam boolean admin,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatMemberService.setAdmin(userPrincipal.getId(), chatId, userId, admin);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Add members to chat")
    @PostMapping("/{chatId}/members")
    ResponseEntity<HttpStatus> addMemberToChat(@PathVariable long chatId,
            @RequestBody Set<ChatMemberDTO> chatMembersDTO,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatEventService.memberAddingAndSendEvent(chatMembersDTO, chatId, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Join member to chat")
    @PostMapping("/{chatId}/join")
    ResponseEntity<HttpStatus> joinToChat(@PathVariable long chatId,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatEventService.memberJoinAndSendEvent(chatId, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Remove member from chat")
    @DeleteMapping("/{chatId}/members/{userId}")
    ResponseEntity<HttpStatus> removeMember(@AuthenticationPrincipal ChatUserDetails userPrincipal,
            @PathVariable long chatId,
            @PathVariable int userId) {
        chatEventService.removeMemberFromChatAndSendEvent(chatId, userId, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Leave chat")
    @DeleteMapping("/{chatId}/members")
    ResponseEntity<HttpStatus> leaveChat(@AuthenticationPrincipal ChatUserDetails userPrincipal,
            @PathVariable long chatId) {
        chatMessageService.memberLeaveChat(chatId, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get all members in chat")
    @GetMapping("/{chatId}/members")
    ResponseEntity<List<ExtendedChatMemberDTO>> chatMembers(@PathVariable long chatId,
            Pageable pageable) {
        return ResponseEntity.ok()
                       .body(chatMemberService.findExtendedMembersInChat(chatId, pageable));
    }

}
