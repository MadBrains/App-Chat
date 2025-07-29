package com.appchat.config.socket;

import com.appchat.entity.user.ChatUserDetails;
import java.util.Collection;
import java.util.Objects;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

@Getter
public class AdviceWebSocketPrincipal extends PreAuthenticatedAuthenticationToken {

    private final ChatUserDetails userDetails;

    public AdviceWebSocketPrincipal(Object aPrincipal, Object aCredentials,
            Collection<? extends GrantedAuthority> anAuthorities) {
        super(aPrincipal, aCredentials, anAuthorities);
        userDetails = (ChatUserDetails) aPrincipal;
    }

    @Override
    public String getName() {
        return userDetails.getId().toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AdviceWebSocketPrincipal that)) {
            return false;
        }
        if (!super.equals(o)) {
            return false;
        }
        return Objects.equals(userDetails, that.userDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), userDetails);
    }

}
