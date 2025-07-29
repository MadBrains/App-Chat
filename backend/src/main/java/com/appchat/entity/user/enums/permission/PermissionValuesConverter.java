package com.appchat.entity.user.enums.permission;

import com.appchat.entity.converter.EnumsConverter;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Set;

@Converter
public class PermissionValuesConverter extends EnumsConverter<PermissionValues>
        implements AttributeConverter<Set<PermissionValues>, String> {

    public PermissionValuesConverter() {
        super(PermissionValues.class);
    }

}
