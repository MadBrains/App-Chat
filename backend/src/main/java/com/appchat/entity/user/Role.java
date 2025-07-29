package com.appchat.entity.user;

import com.appchat.entity.user.enums.permission.PermissionValues;
import com.appchat.entity.user.enums.permission.PermissionValuesConverter;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "role_name", unique = true)
    private String roleName;

    private String description;

    @Column(name = "permission_list")
    @Convert(converter = PermissionValuesConverter.class)
    private Set<PermissionValues> permissionList;

    @NotNull
    @Column(name = "deleted")
    private boolean deleted;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<UserRole> roles = new HashSet<>();

}
