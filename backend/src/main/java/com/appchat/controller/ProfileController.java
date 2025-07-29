package com.appchat.controller;

import com.appchat.dto.user.UserWithEmailDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.appchat.entity.user.enums.InviteAttributeValues;
import com.appchat.service.user.profile.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Operation(summary = "Get user profile details")
    @GetMapping("/me")
    ResponseEntity<UserWithEmailDTO> getProfileWithEmail(
            @AuthenticationPrincipal ChatUserDetails userPrincipal) {
        return ResponseEntity.ok(
                profileService.findUserWithEmail(userPrincipal.getId(),
                        InviteAttributeValues.EMAIL));
    }

}
