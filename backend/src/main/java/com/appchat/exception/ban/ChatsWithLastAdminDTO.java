package com.appchat.exception.ban;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatsWithLastAdminDTO {

    private String text;

    @JsonProperty("chat_ids")
    private List<Long> chatIds;

}
