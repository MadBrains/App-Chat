package com.appchat.entity.chat.enums.permission;

import com.appchat.entity.converter.EnumsConverter;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Set;

@Converter
public class ChatPermissionValuesConverter extends EnumsConverter<ChatPermissionValues>
        implements AttributeConverter<Set<ChatPermissionValues>, String> {

    public ChatPermissionValuesConverter() {
        super(ChatPermissionValues.class);
    }

}
