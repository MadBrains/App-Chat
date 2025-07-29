package com.appchat.service.user.auth;

import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Password;
import com.appchat.repository.user.auth.PasswordRepository;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PasswordServiceImpl implements PasswordService {

    private final PasswordRepository passwordRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void createPassword(String pass, User user) {
        Password password = new Password();
        password.setUser(user);
        password.setActual(true);
        password.setCreatedAt(LocalDateTime.now(ZoneOffset.UTC));
        password.setPass(bCryptPasswordEncoder.encode(pass));
        passwordRepository.save(password);
    }

    public void savePassword(Password password) {
        passwordRepository.save(password);
    }

}
