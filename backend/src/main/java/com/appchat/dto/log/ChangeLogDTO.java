package com.appchat.dto.log;

import com.appchat.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class ChangeLogDTO {

    private String detailed;

    private String entity;

    private String field;

    private String newState;

    private String oldState;

    private User byUser;

    private Integer entitySampleId;

}
