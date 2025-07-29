package com.appchat.entity.chat;

import com.appchat.entity.message.Message;
import com.appchat.entity.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "chat_member")
public class ChatMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private Chat chatId;

    @Column(name = "is_admin")
    private boolean isAdmin;

    private boolean archived;

    @Column(name = "ignore_invocation")
    private boolean ignoreInvocation;

    @Column(name = "muted_to")
    private LocalDateTime mutedTo;

    @OneToOne
    @JoinColumn(name = "last_read_message_id")
    private Message lastReadMessageId;

    @OneToOne
    @JoinColumn(name = "start_message_id")
    private Message startMessageId;

}
