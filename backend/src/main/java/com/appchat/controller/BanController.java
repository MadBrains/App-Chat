package com.appchat.controller;

import com.appchat.dto.ban.BanDTO;
import com.appchat.service.ban.BanMapper;
import com.appchat.service.ban.BanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v1.0/ban")
public class BanController {

    private final BanService banService;

    private final BanMapper banMapper;

    @Operation(summary = "Create ban")
    @PreAuthorize("hasAnyAuthority('BAN_LIST_MODERATION')")
    @PostMapping
    ResponseEntity<HttpStatus> createBan(@RequestBody BanDTO banDTO) {
        banService.createBan(banDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Find all ban in system")
    @PreAuthorize("hasAnyAuthority('BAN_LIST_MODERATION')")
    @GetMapping
    ResponseEntity<List<BanDTO>> findAllBan(Pageable pageable) {
        return ResponseEntity.ok(banService.findAllBan(pageable)
                                         .stream()
                                         .map(banMapper::dtoFromEntity)
                                         .toList());
    }

}
