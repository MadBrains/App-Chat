package com.appchat.service.user;

import com.appchat.entity.user.User;
import com.appchat.entity.user.UserRole;
import com.appchat.repository.user.UserRoleRepository;
import com.appchat.service.user.role.RoleService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {

    private final RoleService roleService;

    private final UserRoleRepository userRoleRepository;

    public void createUserRoles(List<Integer> roles, User user) {
        roles.forEach(role -> {
            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(roleService.findRoleById(role));
            userRoleRepository.save(userRole);
        });
    }

}
