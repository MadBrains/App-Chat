package com.appchat.controller;

import com.appchat.dto.user.RoleDTO;
import com.appchat.dto.user.UserCreateDTO;
import com.appchat.dto.user.UserDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.appchat.entity.user.enums.permission.PermissionValues;
import com.appchat.service.ban.BanService;
import com.appchat.service.user.UserMapper;
import com.appchat.service.user.UserService;
import com.appchat.service.user.registration.UserCreatorService;
import com.appchat.service.user.role.RoleMapper;
import com.appchat.service.user.role.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import java.util.Arrays;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/admin")
public class AdminController {

    private final RoleService roleService;

    private final UserCreatorService userCreatorService;

    private final UserService userService;

    private final BanService banService;

    private final UserMapper userMapper;

    private RoleMapper roleMapper;

    @Operation(summary = "Create new role")
    @PreAuthorize("hasAnyAuthority('ROLES_MODERATION')")
    @PostMapping("/roles")
    ResponseEntity<HttpStatus> createRole(@Valid @RequestBody RoleDTO roleDTO) {
        roleService.createRole(roleDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(summary = "Edit role")
    @PreAuthorize("hasAnyAuthority('ROLES_MODERATION')")
    @PutMapping("/roles/{roleId}")
    ResponseEntity<HttpStatus> editRole(@PathVariable int roleId,
            @Valid @RequestBody RoleDTO roleDTO) {
        roleService.editRole(roleId, roleDTO);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Delete role")
    @PreAuthorize("hasAnyAuthority('ROLES_MODERATION')")
    @DeleteMapping("/roles/{roleId}")
    ResponseEntity<HttpStatus> deleteRole(@PathVariable int roleId) {
        roleService.deleteRole(roleId);
        return ResponseEntity.ok().build();
    }


    @Operation(summary = "Get all permissions")
    @PreAuthorize("hasAnyAuthority('ROLES_MODERATION')")
    @GetMapping("/permissions")
    ResponseEntity<List<PermissionValues>> getPermissions() {
        return ResponseEntity.ok(Arrays.stream(PermissionValues.values()).toList());
    }

    @Operation(summary = "Get all existing roles")
    @PreAuthorize("hasAnyAuthority('ROLES_MODERATION')")
    @GetMapping("/roles")
    ResponseEntity<List<RoleDTO>> getRoles(Pageable pageable) {
        return ResponseEntity.ok(
                roleService.findAllByNotDeleted(pageable)
                        .stream().map(roleMapper::roleToRoleDTO).toList());
    }

    @Operation(summary = "Create new user in system by email")
    @PreAuthorize("hasAnyAuthority('REGISTRATION_EMPLOYEES')")
    @PostMapping("/users")
    ResponseEntity<HttpStatus> userCreate(@Valid @RequestBody UserCreateDTO user) {
        if (!userService.checkIfUserWhitThisMethodValueAlreadyExist(user.getEmail())) {
            userCreatorService.createUserByEmail(user);
        }
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update user fields by admin")
    @PreAuthorize("hasAnyAuthority('EDITING_PROFILES_EMPLOYEE')")
    @PutMapping("/users/{id}")
    ResponseEntity<UserDTO> userUpdate(@Valid @RequestBody UserDTO userDTO,
            @PathVariable int id,
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        String email = userPrincipal.getUsername();
        userDTO.setId(id);
        return ResponseEntity.ok(
                userMapper.dtoFromEntity(userService.updateUserByAdmin(userDTO, email)));
    }

    @Operation(summary = "Ban user by id")
    @PreAuthorize("hasAnyAuthority('BAN_EMPLOYEES')")
    @PutMapping("/users/{userId}/ban")
    ResponseEntity<HttpStatus> banUser(@PathVariable int userId) {
        banService.banUser(userId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Unban user")
    @PreAuthorize("hasAnyAuthority('BAN_EMPLOYEES')")
    @PutMapping("/users/{userId}/unban")
    ResponseEntity<HttpStatus> unbanUser(@PathVariable int userId) {
        banService.unbanUser(userId);
        return ResponseEntity.ok().build();
    }

}
