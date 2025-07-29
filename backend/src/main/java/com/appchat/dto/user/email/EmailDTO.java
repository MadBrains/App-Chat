package com.appchat.dto.user.email;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmailDTO {

    private String email;

    private String text;

    private String subject;

}
