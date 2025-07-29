package com.appchat.service.user;

import com.appchat.dto.user.UserCreateDTO;
import com.appchat.dto.user.UserDTO;
import com.appchat.dto.user.UserWithRoleNameDTO;
import com.appchat.entity.user.User;
import com.appchat.entity.user.auth.Password;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Password findActualPasswordForUser(Integer userId);

    User findUserById(int id);

    void save(User user);

    User findUserByMethodValue(String methodValue);

    User createUser(UserCreateDTO userDTO);

    boolean checkIfUserWhitThisMethodValueAlreadyExist(String newEmail);

    User updateUserByAdmin(UserDTO userDTO, String email);

    User updateUser(UserDTO userDTO, int userId);

    List<UserWithRoleNameDTO> searchAllUsersByFirstNameAndLastName(String text, Pageable pageable);

    List<UserWithRoleNameDTO> findAllUsersWithRole(Pageable pageable);

}
