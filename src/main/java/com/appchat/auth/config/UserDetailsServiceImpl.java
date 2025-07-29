package com.appchat.auth.config;

import com.appchat.entity.user.ChatUserDetails;
import com.appchat.entity.user.Role;
import com.appchat.entity.user.User;
import com.appchat.entity.user.UserRole;
import com.appchat.entity.user.auth.Password;
import com.appchat.entity.user.enums.permission.PermissionValues;
import com.appchat.exception.auth.UserBannedException;
import com.appchat.service.user.UserService;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        User user = userService.findUserByMethodValue(username);
        if (user.isBanned()) {
            throw new UserBannedException();
        }
        Password password = userService.findActualPasswordForUser(user.getId());

        Set<SimpleGrantedAuthority> roleAuthorities = user.getUsersRole().stream()
                                                              .map(UserRole::getRole)
                                                              .map(Role::getPermissionList)
                                                              .flatMap(
                                                                      (Function<Set<PermissionValues>, Stream<PermissionValues>>) Collection::stream)
                                                              .map(it -> new SimpleGrantedAuthority(
                                                                      it.name()))
                                                              .collect(Collectors.toSet());
        Set<SimpleGrantedAuthority> extendedAuthorities = user.getExtendedPermissionList().stream()
                                                                  .map(it -> new SimpleGrantedAuthority(
                                                                          it.name()))
                                                                  .collect(Collectors.toSet());
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.addAll(roleAuthorities);
        authorities.addAll(extendedAuthorities);

        return new ChatUserDetails(user.getId(), username, password.getPass(), user.isEnabled(),
                authorities);
    }

}
