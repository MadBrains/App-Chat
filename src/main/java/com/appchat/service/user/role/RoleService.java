package com.appchat.service.user.role;

import com.appchat.dto.user.RoleDTO;
import com.appchat.entity.user.Role;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface RoleService {

    List<Role> findAllByNotDeleted(Pageable pageable);

    void createRole(RoleDTO roleDTO);

    Role findRoleById(int id);

    void editRole(int roleId, RoleDTO roleDTO);

    void deleteRole(int roleId);

}
