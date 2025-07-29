package com.appchat.service.log;

import com.appchat.dto.log.ChangeLogDTO;
import com.appchat.dto.log.EntityChangerDTO;
import com.appchat.entity.log.ChangeLog;
import com.appchat.repository.log.ChangeLogRepository;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ChangeLogServiceImpl implements ChangeLogService {

    private final ChangeLogRepository changeLogRepository;

    public void findChanges(Object before, Object after, String entity,
            EntityChangerDTO entityChangerDTO) {
        Field[] fieldsBefore = before.getClass().getDeclaredFields();
        Field[] fieldsAfter = after.getClass().getDeclaredFields();
        //TODO: is fields size can be different?
        for (int i = 0; i < fieldsBefore.length; i++) {
            try {
                fieldsBefore[i].setAccessible(true);
                fieldsAfter[i].setAccessible(true);
                if (ObjectUtils.notEqual(fieldsBefore[i].get(before), fieldsAfter[i].get(after))) {
                    ChangeLogDTO changeLogDTO = new ChangeLogDTO();
                    changeLogDTO.setByUser(entityChangerDTO.getByUser());
                    changeLogDTO.setEntitySampleId(entityChangerDTO.getEntitySampleId());
                    changeLogDTO.setField(fieldsAfter[i].getName());
                    changeLogDTO.setNewState(String.valueOf(fieldsAfter[i].get(after)));
                    changeLogDTO.setOldState(String.valueOf(fieldsBefore[i].get(before)));
                    changeLogDTO.setEntity(entity);
                    ////TODO: how it fills?
                    changeLogDTO.setDetailed("");
                    createChangeLog(changeLogDTO);
                }
            } catch (IllegalAccessException ex) {
                log.error(ex.getMessage());
            }
        }
    }

    public void createChangeLog(ChangeLogDTO changeLogDTO) {
        ChangeLog changeLog = new ChangeLog();
        changeLog.setDateTime(LocalDateTime.now(ZoneOffset.UTC));
        changeLog.setField(changeLogDTO.getField());
        changeLog.setEntity(changeLogDTO.getEntity());
        changeLog.setDetailed(changeLogDTO.getDetailed());
        changeLog.setNewState(changeLogDTO.getNewState());
        changeLog.setOldState(changeLogDTO.getOldState());
        changeLog.setByUser(changeLogDTO.getByUser());
        changeLog.setEntitySampleId(changeLogDTO.getEntitySampleId());
        changeLogRepository.save(changeLog);
    }

}
