package com.appchat.repository.user.auth;

import com.appchat.entity.user.auth.Password;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRepository extends JpaRepository<Password, Long> {

}
