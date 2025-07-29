package com.appchat.dto.log;

import com.appchat.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserCreatorDTO {

    private User byUser;

    private User entitySampleId;

}
