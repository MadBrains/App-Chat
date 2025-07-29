package com.appchat.service.user.role;

import com.appchat.dto.user.RoleDTO;
import com.appchat.entity.user.Role;
import com.appchat.exception.role.RoleNotExistException;
import com.appchat.exception.role.RoleWithThisNameAlreadyExistException;
import com.appchat.repository.user.RoleRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository repository;

    private final RoleMapper roleMapper;

    public List<Role> findAllByNotDeleted(Pageable pageable) {
        return repository.findAllByDeleted(false, pageable);
    }

    public Role findRoleById(int id) {
        return repository.findById(id).orElseThrow(RoleNotExistException::new);
    }

    public void editRole(int roleId, RoleDTO roleDTO) {
        Role role = findRoleById(roleId);
        roleMapper.updateRoleFromDTO(roleDTO, role);
        repository.save(role);
    }

    @Override
    public void deleteRole(int roleId) {
        Role role = findRoleById(roleId);
        repository.delete(role);
    }

    public void createRole(RoleDTO roleDTO) {
        if (repository.findByRoleName(roleDTO.getRoleName()).isPresent()) {
            throw new RoleWithThisNameAlreadyExistException(roleDTO.getRoleName());
        }
        Role role = new Role();
        role.setRoleName(roleDTO.getRoleName());
        role.setDeleted(false);
        role.setDescription(roleDTO.getDescription());
        role.setPermissionList(roleDTO.getPermissionList());
        repository.save(role);
    }

}
