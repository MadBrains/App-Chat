package com.appchat.repository.log;

import com.appchat.entity.log.EntityInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityInfoRepository extends JpaRepository<EntityInfo, Long> {

}
