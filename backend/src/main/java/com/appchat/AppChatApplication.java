package com.appchat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AppChatApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppChatApplication.class, args);
    }

}
