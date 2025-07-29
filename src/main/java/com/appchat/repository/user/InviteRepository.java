package com.appchat.repository.user;

import com.appchat.entity.user.Invite;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InviteRepository extends JpaRepository<Invite, Long> {

    @Query("select i from Invite i " +
                   "where not i.used and i.inviteCode = :uuid")
    Optional<Invite> findByInviteCode(@Param("uuid") String uuid);

    @Query("select i from Invite i " +
                   "where not i.used and i.inviteValue = :invite")
    Optional<Invite> findByInviteValue(@Param("invite") String inviteValue);

}
