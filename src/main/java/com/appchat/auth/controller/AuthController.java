package com.appchat.auth.controller;

import com.appchat.dto.user.invite.InviteValueDTO;
import com.appchat.dto.user.password.PasswordNewDTO;
import com.appchat.dto.user.registration.JWTRequestDTO;
import com.appchat.dto.user.registration.JWTResponseDTO;
import com.appchat.dto.user.registration.LoginPasswordRequestDTO;
import com.appchat.service.user.auth.ChangePasswordService;
import com.appchat.service.user.auth.RefreshTokenService;
import com.appchat.service.user.invite.InviteService;
import com.appchat.service.user.registration.UserRegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0/auth")
public class AuthController {

    private final InviteService inviteService;

    private final UserRegistrationService userRegistrationService;

    private final RefreshTokenService refreshTokenService;

    private final ChangePasswordService changePasswordService;


    @Operation(summary = "Refresh token pair")
    @PostMapping("/refresh-token")
    public ResponseEntity<JWTResponseDTO> refreshToken(HttpServletRequest httpRequest,
            @RequestBody JWTRequestDTO refreshToken) {
        return ResponseEntity.ok(
                refreshTokenService.refreshToken(refreshToken, httpRequest.getRequestURI()));
    }

    @Operation(summary = "Registration after using email confirmation")
    @PostMapping("/registration")
    public ResponseEntity<HttpStatus> register(
            @RequestBody @Valid LoginPasswordRequestDTO loginPasswordRequestDTO) {
        userRegistrationService.userRegister(loginPasswordRequestDTO);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Recovery user password by himself")
    @GetMapping("/password-recovery")
    ResponseEntity<HttpStatus> recoveryPassword(@RequestParam String email) {
        changePasswordService.sendRecoveryLink(email);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Set new password")
    @PostMapping("/password-new")
    ResponseEntity<HttpStatus> newPassword(@RequestParam int userId,
            @Valid @RequestBody PasswordNewDTO password) {
        changePasswordService.setNewPassword(userId, password);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "After user click the link")
    @GetMapping("/invite")
    public ResponseEntity<InviteValueDTO> invite(@RequestParam String uuid) {
        InviteValueDTO inviteValue = inviteService.checkInvite(uuid);
        return ResponseEntity.ok(inviteValue);
    }

    @PostMapping("/login")
    public void fakeLogin(@RequestBody LoginPasswordRequestDTO loginPasswordRequestDTO) {
        throw new IllegalStateException(
                "This method shouldn't be called. It's implemented by Spring Security filters.");
    }

}
