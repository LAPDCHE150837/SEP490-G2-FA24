package com.nihongo.sep490g2fa24.v1.dtos.response.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private static final long serialVersionUID = 1L;
    private String token;
    private String tokenType;
    private long expireIn;
    private String refreshToken;
}
