package com.appchat.service.user;

import com.appchat.dto.user.UserCreateDTO;
import com.appchat.dto.user.UserDTO;
import com.appchat.dto.user.UserWithRoleNameDTO;
import com.appchat.entity.user.User;
import com.appchat.entity.user.UserType;
import com.appchat.entity.user.auth.Password;
import com.appchat.entity.user.enums.permission.PermissionValues;
import com.appchat.exception.auth.NotExistActualPasswordException;
import com.appchat.exception.user.UserNotfoundException;
import com.appchat.repository.user.UserRepository;
import com.appchat.service.user.auth.LoginService;
import com.appchat.service.user.role.RoleService;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final RoleService roleService;

    private final LoginService loginService;

    private final UserTypeService userTypeService;

    private final UserMapper userMapper;

    @Override
    public Password findActualPasswordForUser(Integer userId) {
        return userRepository.findActualPasswordByUser(userId)
                       .orElseThrow(NotExistActualPasswordException::new);
    }

    public User findUserById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotfoundException(id));
    }

    public User findUserByMethodValue(String methodValue) {
        return loginService.findByMethodValue(methodValue).getUser();
    }

    public boolean checkIfUserWhitThisMethodValueAlreadyExist(String methodValue) {
        return loginService.checkIfUserWithThisMethodValueAlreadyExist(methodValue);
    }

    public User createUser(UserCreateDTO userDTO) {
        //create record in user table
        User user = new User();
        //TODO: How we can see who create user?
        userMapper.saveUserFromDTO(userDTO, user);
        UserType userType = userTypeService.findById(userDTO.getUserType());
        user.setUserType(userType);
        Set<PermissionValues> permissions = new HashSet<>();
        if (userDTO.getExtendedPermissionList() != null) {
            permissions.addAll(userDTO.getExtendedPermissionList());
        }
        userDTO.getRoleIds().forEach(
                roleId -> permissions.addAll(roleService.findRoleById(roleId).getPermissionList()));
        user.setExtendedPermissionList(permissions);
        user.setDeleted(false);
        user.setEnabled(false);
        userRepository.save(user);
        return user;
    }

    public User updateUserByAdmin(UserDTO userDTO, String email) {
        User user = findUserById(userDTO.getId());
        userMapper.updateUserFromDTO(userDTO, user);
        user.setUserType(userTypeService.findById(userDTO.getUserType()));
        //TODO: how update user role? We need this?
        if (userDTO.getExtendedPermissionList() != null) {
            user.setExtendedPermissionList(userDTO.getExtendedPermissionList());
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    public User updateUser(UserDTO userDTO, int userId) {
        User user = findUserById(userId);
        userMapper.updateUserFromDTO(userDTO, user);
        userRepository.save(user);
        return user;
    }

    @Transactional
    public List<UserWithRoleNameDTO> searchAllUsersByFirstNameAndLastName(String text,
            Pageable pageable) {
        if (!text.isEmpty()) {
            List<Tuple> users = userRepository.searchUsersByFirstNameAndLastName(text, pageable);
            return users.stream().map(it -> {
                UserWithRoleNameDTO userDTO = userMapper.dtoWithRoleNameFromEntity(
                        it.get(0, User.class));
                userDTO.setRoles(List.of(it.get(1, String.class)));
                return userDTO;
            }).toList();
        }
        return findAllUsersWithRole(pageable);
    }

    @Transactional
    public List<UserWithRoleNameDTO> findAllUsersWithRole(Pageable pageable) {
        List<Tuple> users = userRepository.findAllUsers(pageable);
        return users.stream().map(it -> {
            UserWithRoleNameDTO userDTO = userMapper.dtoWithRoleNameFromEntity(
                    it.get(0, User.class));
            userDTO.setRoles(List.of(it.get(1, String.class)));
            return userDTO;
        }).toList();
    }

}
