package com.appchat.dto.user.registration;

import com.appchat.validator.password.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginPasswordRequestDTO {

    @NotEmpty
    private String username;

    @NotEmpty
    @ValidPassword
    private String password;

}
