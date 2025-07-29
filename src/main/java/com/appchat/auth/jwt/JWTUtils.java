package com.appchat.auth.jwt;

import com.appchat.config.socket.AdviceWebSocketPrincipal;
import com.appchat.entity.user.ChatUserDetails;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JWTUtils {

    @Value("${app.jwt.secret-key}")
    private String secret;

    @Value("${app.jwt.expiration-time.access-token}")
    private long accessExpiredTime;

    @Value("${app.jwt.expiration-time.refresh-token}")
    private long refreshExpiredTime;

    private static final String PERMISSIONS_CLAIM = "permissions";

    private static final String USER_ID_CLAIM = "user_id";

    public String generateAccessToken(ChatUserDetails user, String url) {
        return JWT.create()
                       .withSubject(user.getUsername())
                       .withExpiresAt(new Date(System.currentTimeMillis() + accessExpiredTime))
                       .withIssuer(url)
                       .withClaim(USER_ID_CLAIM, user.getId())
                       .withClaim(PERMISSIONS_CLAIM,
                               user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                                       .toList())
                       .sign(Algorithm.HMAC256(secret.getBytes()));
    }

    public String generateRefreshToken(ChatUserDetails user, String url) {
        return JWT.create()
                       .withSubject(user.getUsername())
                       .withExpiresAt(new Date(System.currentTimeMillis() + refreshExpiredTime))
                       .withIssuer(url)
                       .sign(Algorithm.HMAC256(secret.getBytes()));
    }

    public DecodedJWT validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret.getBytes())).build();
        return verifier.verify(token);
    }

    private ChatUserDetails extractChatUserDetails(String token) {
        DecodedJWT decodedJWT = validateToken(token);
        String username = decodedJWT.getSubject();
        if (decodedJWT.getClaim(PERMISSIONS_CLAIM).isMissing()) {
            throw new JWTVerificationException("invalid token");
        }
        String[] permissions = decodedJWT.getClaim(PERMISSIONS_CLAIM).asArray(String.class);
        Integer userId = decodedJWT.getClaim(USER_ID_CLAIM).asInt();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        Arrays.stream(permissions)
                .forEach(permission -> authorities.add(new SimpleGrantedAuthority(permission)));

        return new ChatUserDetails(userId, username, null, true, new HashSet<>(authorities));
    }

    public PreAuthenticatedAuthenticationToken getPreAuthenticatedAuthenticationToken(
            String token) {
        ChatUserDetails chatUserDetails = extractChatUserDetails(token);

        return new PreAuthenticatedAuthenticationToken(
                chatUserDetails, null, chatUserDetails.getAuthorities());
    }

    public AdviceWebSocketPrincipal getAdviceWebSocketPrincipal(String token) {
        ChatUserDetails chatUserDetails = extractChatUserDetails(token);

        return new AdviceWebSocketPrincipal(
                chatUserDetails, null, chatUserDetails.getAuthorities());
    }

}
