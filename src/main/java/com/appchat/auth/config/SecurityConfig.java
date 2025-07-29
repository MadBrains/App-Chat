package com.appchat.auth.config;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import com.appchat.auth.filter.JWTRequestFilter;
import com.appchat.auth.filter.UserAuthenticationFilter;
import com.appchat.auth.jwt.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    @Value("${spring.security.debug:false}")
    boolean securityDebug;

    private final UserDetailsService userDetailsService;

    private final JWTUtils jwtUtils;

    private static final String[] AUTH_WHITELIST = {
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webpack/**",
            "/webjars/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/api/v1.0/auth/**",
            "/api/v1.0/socket/**",
            "/*"
    };

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public UserAuthenticationFilter userAuthenticationFilter(
            AuthenticationManager authenticationManager) {
        UserAuthenticationFilter filter = new UserAuthenticationFilter(jwtUtils);
        filter.setRequiresAuthenticationRequestMatcher(
                new AntPathRequestMatcher("/api/v1.0/auth/login", "POST"));
        filter.setAuthenticationManager(authenticationManager);
        return filter;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeHttpRequests().requestMatchers(AUTH_WHITELIST).permitAll();
        http.authorizeHttpRequests().anyRequest().authenticated();
        http.userDetailsService(userDetailsService);

        http.addFilter(
                userAuthenticationFilter(authenticationManager(
                        http.getSharedObject(AuthenticationConfiguration.class))));

        http.addFilterAfter(new JWTRequestFilter(jwtUtils),
                UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.debug(securityDebug);
    }

}
