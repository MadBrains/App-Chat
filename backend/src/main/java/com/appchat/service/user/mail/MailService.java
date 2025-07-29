package com.appchat.service.user.mail;

import com.appchat.dto.user.email.EmailDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    @Value("${spring.mail.username}")
    private String hostEmail;

    private final JavaMailSender javaMailSender;

    @Async
    public void generateMailMessage(EmailDTO emailDTO, String link) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(hostEmail);
        simpleMailMessage.setTo(emailDTO.getEmail());
        simpleMailMessage.setSubject(emailDTO.getSubject());
        simpleMailMessage.setText(emailDTO.getText() + link);
        javaMailSender.send(simpleMailMessage);
        log.info("send link to user: " + emailDTO.getEmail());
    }

}
