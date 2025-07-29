package com.appchat.entity.converter;

import com.google.common.collect.Sets;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.apache.commons.lang3.StringUtils;

@Converter
public abstract class EnumsConverter<E extends Enum<E>> implements
        AttributeConverter<Set<E>, String> {

    private static final String SPLIT_CHAR = ";";

    private final Class<E> clazz;

    protected EnumsConverter(Class<E> clazz) {
        this.clazz = clazz;
    }

    @Override
    public String convertToDatabaseColumn(Set<E> values) {
        if (values.isEmpty()) {
            return null;
        }
        return values.stream()
                       .map(Enum::name)
                       .collect(Collectors.joining(SPLIT_CHAR));
    }

    @Override
    public Set<E> convertToEntityAttribute(String string) {
        if (StringUtils.isBlank(string)) {
            return EnumSet.noneOf(clazz);
        }
        return Sets.newEnumSet(Stream.of(string.split(SPLIT_CHAR))
                                       .map(e -> Enum.valueOf(clazz, e)).toList(), clazz);
    }

}
