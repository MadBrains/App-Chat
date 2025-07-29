package com.appchat.dto.log;

import com.appchat.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatCreatorDTO {

    private User byUser;

    private Long entitySampleId;

}
