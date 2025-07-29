package com.appchat.repository.user;

import com.appchat.entity.user.Role;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByRoleName(String name);

    List<Role> findAllByDeleted(boolean deleted, Pageable pageable);

}
