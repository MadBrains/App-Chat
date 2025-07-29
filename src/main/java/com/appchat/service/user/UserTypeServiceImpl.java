package com.appchat.service.user;

import com.appchat.entity.user.UserType;
import com.appchat.exception.user.UserTypeNotFoundException;
import com.appchat.repository.user.UserTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserTypeServiceImpl implements UserTypeService {

    private final UserTypeRepository userTypeRepository;

    @Override
    public UserType findById(int userTypeID) {
        return userTypeRepository.findById(userTypeID).orElseThrow(UserTypeNotFoundException::new);
    }

}
