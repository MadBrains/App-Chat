package com.appchat.service.user.profile;

import com.appchat.dto.user.UserWithEmailDTO;
import com.appchat.entity.user.enums.InviteAttributeValues;

public interface ProfileService {

    UserWithEmailDTO findUserWithEmail(int id, InviteAttributeValues methodValue);

}
