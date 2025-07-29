package com.appchat.service.user;

import com.appchat.entity.user.User;
import java.util.List;

public interface UserRoleService {

    void createUserRoles(List<Integer> roles, User user);

}
