package com.appchat.service.user.invite;

import com.appchat.dto.user.email.EmailDTO;
import com.appchat.dto.user.invite.InviteValueDTO;
import com.appchat.entity.user.Invite;
import com.appchat.entity.user.User;
import com.appchat.entity.user.enums.ActionValues;

public interface InviteService {

    void createInviteByEmail(User user, EmailDTO emailDTO, ActionValues actionValues);

    InviteValueDTO checkInvite(String uuid);

    Invite findByInviteValue(String inviteValue);

    Invite findByCodeValue(String codeValue);

    void save(Invite invite);

}
