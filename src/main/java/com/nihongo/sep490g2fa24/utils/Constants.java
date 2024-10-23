package com.nihongo.sep490g2fa24.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Constants {
    public static final String ACTIVE = "ACTIVE";
    public static final String INACTIVE = "INACTIVE";
    public static final String HOST_MAIL = "duongtxhe160708@fpt.edu.vn";

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Role {
        public static final String USER = "USER";
        public static final String ADMIN = "ADMIN";
        public static final String MANAGER = "MANAGER";
    }
}