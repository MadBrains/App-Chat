package com.appchat.repository.user.auth;

import com.appchat.entity.user.auth.Login;
import com.appchat.entity.user.enums.InviteAttributeValues;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoginRepository extends JpaRepository<Login, Long> {

    Optional<Login> findByMethodValue(String login);

    @Query("select l from Login l " +
                   "where l.user.id = :userId and l.method = :method")
    Optional<Login> findByUserAndMethod(@Param("userId") int userId,
            @Param("method") InviteAttributeValues method);

}
