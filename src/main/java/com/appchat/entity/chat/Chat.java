package com.appchat.entity.chat;

import com.appchat.entity.chat.enums.permission.ChatPermissionValues;
import com.appchat.entity.chat.enums.permission.ChatPermissionValuesConverter;
import com.appchat.entity.converter.NumberConverter;
import com.appchat.entity.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "chat_name")
    private String chatName;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_owner")
    private User chatOwner;

    private String description;

    @Column(name = "avatar_image")
    private String avatarImage;

    @Column(name = "is_deleted")
    private boolean deleted;

    @NotNull
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "chat_type_id")
    private ChatType chatTypeId;

    @Convert(converter = ChatPermissionValuesConverter.class)
    @Column(name = "chat_permission_list")
    private Set<ChatPermissionValues> chatPermissionsList;

    @Convert(converter = NumberConverter.class)
    @Column(name = "pinned_message_list")
    private Set<Long> pinnedMessageList;

    @OneToMany(mappedBy = "chatId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<ChatMember> members = new HashSet<>();

}
