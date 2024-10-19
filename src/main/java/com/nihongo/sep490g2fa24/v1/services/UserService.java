package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface UserService {
    LoginResponse login(OAuth2AuthenticationToken authentication);

    LoginResponse login(String refreshToken);

    void logout();
}
