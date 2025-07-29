package com.appchat.dto.translation;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TranslatedEnumFieldsDTO {

    private Map<String, String> values;

}
