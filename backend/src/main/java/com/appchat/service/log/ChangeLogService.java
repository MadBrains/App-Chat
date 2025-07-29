package com.appchat.service.log;

import com.appchat.dto.log.ChangeLogDTO;
import com.appchat.dto.log.EntityChangerDTO;

public interface ChangeLogService {

    void findChanges(Object before, Object after, String entity, EntityChangerDTO entityChangerDTO);

    void createChangeLog(ChangeLogDTO changeLogDTO);

}
