package com.appchat.service.chat;

import com.appchat.dto.translation.TranslatedEnumFieldsDTO;
import com.appchat.entity.chat.ChatType;
import com.appchat.entity.chat.enums.ChatTypeName;
import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.appchat.exception.chat.NotExistChatTypeWithThisNameException;
import com.appchat.helpers.TranslationHelper;
import com.appchat.repository.chat.ChatTypeRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatTypeServiceImpl implements ChatTypeService {

    private final ChatTypeRepository chatTypeRepository;

    private final TranslationHelper translationHelper;

    public ChatType findByChatTypeByName(ChatTypeName chatTypeNameValue) {
        return chatTypeRepository.findByChatTypeName(chatTypeNameValue).orElseThrow(
                () -> new NotExistChatTypeWithThisNameException(chatTypeNameValue.name()));
    }

    @Override
    public TranslatedEnumFieldsDTO translateChatPermissionsNames() {
        Map<String, String> translatedValues = translationHelper.translateEnumFields(
                ChatPermissionValues.class);
        LocaleContextHolder.resetLocaleContext();
        return new TranslatedEnumFieldsDTO(translatedValues);
    }

}
