package com.appchat.service.chat;

import com.appchat.dto.translation.TranslatedEnumFieldsDTO;
import com.appchat.entity.chat.ChatType;
import com.appchat.entity.chat.enums.ChatTypeName;

public interface ChatTypeService {

    ChatType findByChatTypeByName(ChatTypeName chatTypeNameValue);

    TranslatedEnumFieldsDTO translateChatPermissionsNames();

}
