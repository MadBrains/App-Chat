package com.appchat.dto.log;

import com.appchat.entity.log.enums.OperationType;
import com.appchat.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class EntityInfoDTO {

    private String entity;

    private OperationType type;

    private boolean createdBySystem;

    //TODO:Fix it
    private User byUser;

    private Long entitySampleId;

}
