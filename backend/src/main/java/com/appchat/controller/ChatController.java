package com.appchat.controller;

import com.appchat.dto.chat.ChatDTO;
import com.appchat.dto.chat.ChatTypeDTO;
import com.appchat.dto.translation.TranslatedEnumFieldsDTO;
import com.appchat.entity.chat.enums.ChatTypeName;
import com.appchat.entity.user.ChatUserDetails;
import com.appchat.service.chat.ChatEventService;
import com.appchat.service.chat.ChatService;
import com.appchat.service.chat.ChatTypeService;
import com.appchat.service.chat.mapper.ChatMapper;
import com.appchat.service.chat.mapper.ChatTypeMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/chat")
public class ChatController {

    private final ChatService chatService;

    private final ChatEventService chatEventService;

    private final ChatTypeService chatTypeService;

    private final ChatTypeMapper chatTypeMapper;

    private final ChatMapper chatMapper;

    @Operation(summary = "Create new chat")
    @PreAuthorize("hasAnyAuthority('CREATE_GROUP_CHATS')")
    @PostMapping
    ResponseEntity<?> createChat(@Valid @RequestBody ChatDTO chatDTO,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        if (ChatTypeName.PRIVATE.equals(chatDTO.getChatTypeName())) {
            Long chatId = chatService.findIdOfPrivateChatIfExist(userPrincipal.getId(), chatDTO);
            if (chatId != null) {
                //If we find out that a private chat has already been created before,
                // then we return only the chatId for front-side routing.
                return ResponseEntity.status(HttpStatus.SEE_OTHER).body(chatId);
            }
        }
        ChatDTO responseChatDTO = chatEventService.createChatAndSendEvent(chatDTO,
                userPrincipal.getId());
        return ResponseEntity.ok(responseChatDTO);
    }

    @Operation(summary = "Edit chat fields")
    @PreAuthorize("hasAnyAuthority('CREATE_GROUP_CHATS')")
    @PatchMapping("/{chatId}")
    ResponseEntity<ChatDTO> editChat(@PathVariable long chatId,
            @Valid @RequestBody ChatDTO chatDTO,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        ChatDTO responseChatDTO = chatEventService.editChatAndSendEvent(chatDTO,
                userPrincipal.getId(), chatId);
        return ResponseEntity.ok(responseChatDTO);
    }

    @Operation(summary = "Get default and available permission by chat type")
    @PreAuthorize("hasAnyAuthority('CREATE_GROUP_CHATS')")
    @GetMapping("/permissions")
    ResponseEntity<ChatTypeDTO> chatPermissions(@RequestParam ChatTypeName name) {
        return ResponseEntity.ok(
                chatTypeMapper.dtoFromEntity(chatTypeService.findByChatTypeByName(name))
        );
    }

    @Operation(summary = "Get translation of the chat types")
    @GetMapping("/permissions/translations")
    ResponseEntity<TranslatedEnumFieldsDTO> chatChatPermissionsTranslations(
            @RequestParam(required = false) String language) {
        return ResponseEntity.ok(
                chatTypeService.translateChatPermissionsNames()
        );
    }

    @Operation(summary = "Find all not deleted chats in which the user is a member")
    @GetMapping
    ResponseEntity<List<ChatDTO>> findAllChats(Pageable pageable,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        return ResponseEntity.ok(chatService.findAllChats(userPrincipal.getId(), pageable));
    }

    @Operation(summary = "Delete chat by id")
    @PreAuthorize("hasAnyAuthority('CREATE_GROUP_CHATS')")
    @DeleteMapping("/{chatId}")
    ResponseEntity<HttpStatus> deleteChat(@PathVariable long chatId,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        chatEventService.deleteChatAndSendEvent(userPrincipal.getId(), chatId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Find all deleted chats by admin")
    @GetMapping("/deleted")
    ResponseEntity<List<ChatDTO>> findAllDeletedChats(Pageable pageable) {
        return ResponseEntity.ok(chatService.findAllDeletedChats(pageable)
                                         .stream()
                                         .map(chatMapper::dtoFromEntity)
                                         .toList());
    }

    @Operation(summary = "Restore deleted chats by ids")
    @PutMapping("/restore")
    ResponseEntity<HttpStatus> restoreChats(@RequestBody List<Long> chatIds) {
        chatService.restoreChats(chatIds);
        return ResponseEntity.ok().build();
    }

    //TODO: add events
    @Operation(summary = "Pin message in chat")
    @PutMapping("/{chatId}/message/{messageId}/pin")
    ResponseEntity<HttpStatus> pinMessage(@PathVariable long chatId,
            @PathVariable long messageId) {
        chatService.pinMessage(chatId, messageId);
        return ResponseEntity.ok().build();
    }

    //TODO: add events
    @Operation(summary = "Unpin message in chat")
    @PutMapping("/{chatId}/message/{messageId}/unpin")
    ResponseEntity<HttpStatus> unpinMessage(@PathVariable long chatId,
            @PathVariable long messageId) {
        chatService.unpinMessage(chatId, messageId);
        return ResponseEntity.ok().build();
    }

}
