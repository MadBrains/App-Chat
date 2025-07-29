package com.appchat.entity.chat;

import com.appchat.entity.chat.enums.ChatTypeName;
import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.appchat.entity.chat.enums.permission.ChatPermissionValuesConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "chat_type")
public class ChatType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "chat_type_name")
    private ChatTypeName chatTypeName;

    @Column(name = "available_permissions")
    @Convert(converter = ChatPermissionValuesConverter.class)
    private Set<ChatPermissionValues> availablePermissions;

    @Column(name = "default_permissions")
    @Convert(converter = ChatPermissionValuesConverter.class)
    private Set<ChatPermissionValues> defaultPermissions;

}
