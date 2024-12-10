package com.nihongo.sep490g2fa24.v1.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Constants {
    public static final String ACTIVE = "ACTIVE";
    public static final String INACTIVE = "INACTIVE";
    public static final String HOST_MAIL = "btung548@gmail.com";

    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static final class Role {
        public static final String USER = "USER";
        public static final String ADMIN = "ADMIN";
        public static final String CONTENT = "CONTENT";
        public static final String STUDENT = "STUDENT";
    }
}
