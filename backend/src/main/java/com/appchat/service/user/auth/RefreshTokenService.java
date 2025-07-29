package com.appchat.service.user.auth;

import com.appchat.dto.user.registration.JWTRequestDTO;
import com.appchat.dto.user.registration.JWTResponseDTO;

public interface RefreshTokenService {

    JWTResponseDTO refreshToken(JWTRequestDTO refreshToken, String uri);

}
