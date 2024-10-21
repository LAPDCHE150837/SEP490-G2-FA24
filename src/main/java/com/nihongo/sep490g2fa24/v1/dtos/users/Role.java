package com.nihongo.sep490g2fa24.v1.dtos.users;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.nihongo.sep490g2fa24.v1.dtos.users.Permission.*;


@RequiredArgsConstructor
public enum Role {
    USER(Collections.emptySet()),
    ADMIN(
            Set.of
                    (
                            ADMIN_READ,
                            ADMIN_UPDATE,
                            ADMIN_DELETE,
                            ADMIN_CREATE,
                            MANAGER_READ,
                            MANAGER_UPDATE,
                            MANAGER_DELETE,
                            MANAGER_CREATE
                    )
    ),
    MANAGER(
            Set.of(
                    MANAGER_READ,
                    MANAGER_UPDATE,
                    MANAGER_DELETE,
                    MANAGER_CREATE
            )
    );
    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermisstion()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + name()));
        return authorities;
    }
}
