package com.appchat.service.log;

import com.appchat.dto.log.EntityInfoDTO;
import com.appchat.entity.log.EntityInfo;
import com.appchat.repository.log.EntityInfoRepository;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EntityInfoServiceImpl implements EntityInfoService {

    private final EntityInfoRepository entityInfoRepository;

    public void createEntityInfo(EntityInfoDTO entityInfoDTO) {
        EntityInfo entityInfo = new EntityInfo();
        entityInfo.setDateTime(LocalDateTime.now(ZoneOffset.UTC));
        entityInfo.setEntity(entityInfoDTO.getEntity());
        entityInfo.setOperationType(entityInfoDTO.getType());
        entityInfo.setByUser(entityInfoDTO.getByUser());
        entityInfo.setEntitySampleId(entityInfoDTO.getEntitySampleId());
        entityInfo.setCreatedBySystem(entityInfoDTO.isCreatedBySystem());
        entityInfoRepository.save(entityInfo);
    }

}
