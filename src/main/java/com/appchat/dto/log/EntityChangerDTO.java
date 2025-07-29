package com.appchat.dto.log;

import com.appchat.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EntityChangerDTO {

    private User byUser;

    private Integer entitySampleId;

}
