package com.appchat.entity.message;

import com.appchat.entity.chat.Chat;
import com.appchat.entity.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "message")
public class Message {

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

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "contains_message_id")
    private Long containsMessageId;

    private String body;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private boolean deleted;

    private boolean system;

    @Column(name = "first_read_at")
    private LocalDateTime firstReadAt;

    @Column(name = "has_attachment")
    private boolean hasAttachment;

}
