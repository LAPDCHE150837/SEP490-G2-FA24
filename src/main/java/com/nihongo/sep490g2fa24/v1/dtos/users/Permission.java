package com.nihongo.sep490g2fa24.v1.dtos.users;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MANAGER_READ("management:read"),
    MANAGER_UPDATE("management:update"),
    MANAGER_CREATE("management:create"),
    MANAGER_DELETE("management:delete"),
    CONTENT_READ("content:read"),
    CONTENT_UPDATE("content:update"),
    CONTENT_CREATE("content:create"),
    CONTENT_DELETE("content:delete");
    @Getter
    private final String permission;
}
