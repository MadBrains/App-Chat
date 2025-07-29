package com.appchat.dto.user.password;

import com.appchat.validator.password.ValidPassword;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangesDTO {

    @JsonProperty("old_pass")
    private String oldPass;

    @JsonProperty("new_pass")
    @ValidPassword
    private String newPass;

}
