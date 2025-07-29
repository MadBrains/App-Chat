package com.appchat.interceptors;

import static org.springframework.http.HttpHeaders.USER_AGENT;

import com.appchat.entity.user.ChatUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.time.Instant;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class ApiRequestInterceptor implements HandlerInterceptor {

    private static final String ACCOUNT_ID_KEY = "username";

    private static final ThreadLocal<Long> startTimeSeconds = new ThreadLocal<>();

    private static final ThreadLocal<Integer> startTimeNanoseconds = new ThreadLocal<>();

    @Override
    public boolean preHandle(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler
    ) {
        MDC.put(ACCOUNT_ID_KEY, getAccountId());
        Instant now = Instant.now();
        startTimeSeconds.set(now.getEpochSecond());
        startTimeNanoseconds.set(now.getNano());
        return true;
    }

    @Override
    public void afterCompletion(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull Object handler,
            Exception ex
    ) {
        Duration between = Duration.between(
                Instant.ofEpochSecond(startTimeSeconds.get(), startTimeNanoseconds.get()),
                Instant.now());
        startTimeSeconds.remove();
        startTimeNanoseconds.remove();
        log.info(between.toMillis() +
                         ":" + response.getStatus() +
                         ":" + request.getMethod() +
                         ":" + request.getRequestURI() +
                         ":" + request.getHeader(USER_AGENT));
        MDC.remove(ACCOUNT_ID_KEY);
    }

    private String getAccountId() {
        try {
            ChatUserDetails principal = (ChatUserDetails) SecurityContextHolder.getContext()
                                                                  .getAuthentication()
                                                                  .getPrincipal();
            return String.valueOf(principal.getId());
        } catch (Exception e) {
            return "";
        }
    }

}
