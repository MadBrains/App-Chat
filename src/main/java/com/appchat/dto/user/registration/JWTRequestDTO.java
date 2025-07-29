package com.appchat.dto.user.registration;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class JWTRequestDTO {

    @JsonProperty("refresh_token")
    private String refreshToken;

}
