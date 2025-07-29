package com.appchat.service.user.auth;

import com.appchat.auth.jwt.JWTUtils;
import com.appchat.dto.user.registration.JWTRequestDTO;
import com.appchat.dto.user.registration.JWTResponseDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final UserDetailsService userDetailsService;

    private final JWTUtils jwtUtils;

    public JWTResponseDTO refreshToken(JWTRequestDTO refreshToken, String uri) {
        DecodedJWT decodedJWT = jwtUtils.validateToken(refreshToken.getRefreshToken());
        String username = decodedJWT.getSubject();
        ChatUserDetails user = (ChatUserDetails) userDetailsService.loadUserByUsername(username);
        JWTResponseDTO jwtResponseDTO = new JWTResponseDTO();
        jwtResponseDTO.setAccessToken(jwtUtils.generateAccessToken(user, uri));
        jwtResponseDTO.setRefreshToken(jwtUtils.generateRefreshToken(user, uri));
        //TODO: add token blackList
        return jwtResponseDTO;
    }

}
