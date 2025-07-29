package com.appchat.repository.ban;

import com.appchat.entity.ban.Ban;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BanRepository extends JpaRepository<Ban, Long> {

}
