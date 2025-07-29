package com.appchat.dto.user.invite;

import com.appchat.entity.user.enums.ActionValues;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class InviteValueDTO {

    @JsonProperty("user_id")
    private int userId;

    @JsonProperty("invite_value")
    private String inviteValue;

    private ActionValues action;

}
