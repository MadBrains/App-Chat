package com.appchat.service.user.profile;

import com.appchat.dto.user.UserWithEmailDTO;
import com.appchat.entity.user.User;
import com.appchat.entity.user.enums.InviteAttributeValues;
import com.appchat.repository.user.UserRepository;
import com.appchat.service.user.UserMapper;
import jakarta.persistence.Tuple;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserMapper userMapper;

    private final UserRepository userRepository;

    @Override
    public UserWithEmailDTO findUserWithEmail(int id, InviteAttributeValues methodValue) {
        Tuple userWithEmail = userRepository.findUserWithMethodValue(id, methodValue);
        UserWithEmailDTO user = userMapper.dtoWithEmailFromEntity(userWithEmail.get(0, User.class));
        user.setEmail(userWithEmail.get(1, String.class));
        return user;
    }

}
