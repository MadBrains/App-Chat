package com.appchat.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class SpringFoxConfig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                       .group("app-chat-api")
                       .pathsToMatch("/api/v1.0/**")
                       .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                       .info(new Info().title("Mad-Chat API")
                                     .description("Mad-Chat sample application")
                                     .version("v1.0")
                                     .license(new License().name("Apache 2.0")
                                                      .url("http://springdoc.org")))
                       .externalDocs(new ExternalDocumentation()
                                             .description("Mad-Chat Wiki Documentation")
                                             .url("https://wiki.yandex.ru/madbrains/proekty/appchat/"));
    }

}
