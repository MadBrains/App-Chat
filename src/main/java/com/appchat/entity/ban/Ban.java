package com.appchat.entity.ban;


import com.appchat.entity.user.enums.permission.PermissionValues;
import com.appchat.entity.user.enums.permission.PermissionValuesConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ban")
public class Ban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "ban_name")
    private String banName;

    private String description;

    @Column(name = "for_client")
    private boolean forClient;

    @Column(name = "for_user")
    private boolean forUser;

    private boolean system;

    @Column(name = "excluded_permission")
    @Convert(converter = PermissionValuesConverter.class)
    private Set<PermissionValues> excludedPermission;

    @Column(name = "default_ban_duration")
    private LocalDateTime defaultBanDuration;

}
