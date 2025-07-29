package com.appchat.auth.filter;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.appchat.auth.jwt.JWTUtils;
import com.appchat.dto.user.registration.LoginPasswordRequestDTO;
import com.appchat.entity.user.ChatUserDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@RequiredArgsConstructor
public class UserAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JWTUtils jwtUtils;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response)
            throws AuthenticationException {
        String username = "";
        String password = "";
        try (ServletInputStream inputStream = request.getInputStream()) {
            LoginPasswordRequestDTO loginPasswordRequestDTO
                    = new ObjectMapper().readValue(inputStream, LoginPasswordRequestDTO.class);
            username = loginPasswordRequestDTO.getUsername();
            password = loginPasswordRequestDTO.getPassword();
        } catch (IOException ex) {
            log.error("Invalid login request", ex);
        }
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                username, password);
        return this.getAuthenticationManager()
                       .authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain, Authentication authentication)
            throws IOException {
        ChatUserDetails user = (ChatUserDetails) authentication.getPrincipal();

        String accessToken = jwtUtils.generateAccessToken(user, request.getRequestURI());

        String refreshToken = jwtUtils.generateRefreshToken(user, request.getRequestURI());

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed)
            throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.getWriter().write("{\"error\": \"" + failed.getMessage() + "\"}");
    }

}
