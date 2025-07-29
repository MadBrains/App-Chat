package com.appchat.dto.user.password;

import com.appchat.validator.password.ValidPassword;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PasswordNewDTO {

    @NotNull
    @JsonProperty("invite_code")
    private String inviteCode;

    @ValidPassword
    private String password;

}
