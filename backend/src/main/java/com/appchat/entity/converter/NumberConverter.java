package com.appchat.entity.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Converter
public class NumberConverter implements AttributeConverter<Set<Long>, String> {

    private static final String SEPARATOR = ",";

    @Override
    public String convertToDatabaseColumn(Set<Long> attribute) {
        if (attribute == null) {
            return null;
        }
        return String.join(SEPARATOR, attribute.stream()
                                              .map(String::valueOf)
                                              .collect(Collectors.toSet()));
    }

    @Override
    public Set<Long> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return Collections.emptySortedSet();
        }
        return Arrays.stream(dbData.split(SEPARATOR))
                       .map(Long::parseLong)
                       .collect(Collectors.toSet());
    }

}
