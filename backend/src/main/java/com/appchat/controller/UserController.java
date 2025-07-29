package com.appchat.controller;

import com.appchat.dto.user.UserDTO;
import com.appchat.dto.user.UserWithRoleNameDTO;
import com.appchat.dto.user.email.EmailChangesDTO;
import com.appchat.dto.user.password.PasswordChangesDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.appchat.service.user.UserMapper;
import com.appchat.service.user.UserService;
import com.appchat.service.user.auth.ChangePasswordService;
import com.appchat.service.user.mail.ChangeEmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/users")
public class UserController {

    private final UserService userService;

    private final ChangeEmailService changeEmailService;

    private final ChangePasswordService changePasswordService;

    private final UserMapper userMapper;

    @Operation(summary = "Update user fields by himself")
    @PutMapping
    ResponseEntity<UserDTO> userUpdate(@Valid @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        return ResponseEntity.ok(
                userMapper.dtoFromEntity(userService.updateUser(userDTO, userPrincipal.getId())));
    }

    @Operation(summary = "Change user email by himself")
    @PostMapping("/email")
    ResponseEntity<HttpStatus> changeEmail(@Valid @RequestBody EmailChangesDTO emailChangesDTO,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        String email = userPrincipal.getUsername();
        changeEmailService.changeUserEmail(email, emailChangesDTO.getEmail());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Change user password by himself")
    @PostMapping("/password")
    ResponseEntity<HttpStatus> changePassword(
            @Valid @RequestBody PasswordChangesDTO passwordChangesDTO,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        changePasswordService.changePassword(passwordChangesDTO, userPrincipal.getId());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Find all users in system")
    @PreAuthorize("hasAnyAuthority('VIEW_ALL_EMPLOYEES')")
    @GetMapping
    ResponseEntity<List<UserWithRoleNameDTO>> findAllUsers(Pageable p) {
        return ResponseEntity.ok().body(userService.findAllUsersWithRole(p));
    }

    @Operation(summary = "Find all users in system")
    @PreAuthorize("hasAnyAuthority('VIEW_ALL_EMPLOYEES')")
    @GetMapping("/search")
    ResponseEntity<List<UserWithRoleNameDTO>> search(@RequestParam String text, Pageable p) {
        return ResponseEntity.ok().body(userService.searchAllUsersByFirstNameAndLastName(text, p));
    }

}
