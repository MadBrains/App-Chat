package com.appchat.helpers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TranslationHelper {

    private final MessageSource messageSource;

    public String getSingleCodeTranslation(String code, @Nullable Object[] args) {
        Locale locale = LocaleContextHolder.getLocale();
        return translate(code, args, locale);
    }

    public <T> Map<String, String> translateEnumFields(Class<T> className) {
        Locale locale = LocaleContextHolder.getLocale();
        HashMap<String, String> paramsMap = new HashMap<>();
        if (className.isEnum()) {
            Arrays.asList(className.getEnumConstants()).forEach(chatTypeName -> paramsMap
                                                                                        .put(chatTypeName.toString(),
                                                                                                translate(
                                                                                                        String.format(
                                                                                                                "%s.%s",
                                                                                                                className.getSimpleName(),
                                                                                                                chatTypeName),
                                                                                                        null,
                                                                                                        locale)));
        }
        return paramsMap;
    }

    private String translate(String code, @Nullable Object[] args, Locale locale) {
        try {
            return messageSource.getMessage(code, args, locale);
        } catch (NoSuchMessageException ex) {
            return code;
        }
    }

}
