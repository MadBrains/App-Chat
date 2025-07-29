package com.appchat.entity.user;

import com.appchat.entity.user.enums.ActionValues;
import com.appchat.entity.user.enums.InviteAttributeValues;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

@Entity
@Getter
@Setter
@Table(name = "invite")
public class Invite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "invite_attribute")
    @Enumerated(EnumType.STRING)
    private InviteAttributeValues inviteAttribute;

    @Column(name = "invite_value")
    private String inviteValue;

    @Column(name = "invite_code")
    private String inviteCode;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    @Column(name = "invite_link", unique = true)
    private String inviteLink;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ActionValues action;

    private boolean used;

}
