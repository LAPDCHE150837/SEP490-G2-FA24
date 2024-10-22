package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.dtos.request.LoginRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.RegisterRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.model.User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface AuthenService{


    LoginResponse login(OAuth2AuthenticationToken authentication);
    LoginResponse register(RegisterRequest registerRequest);
    LoginResponse authenticate(LoginRequest loginRequest);
    String verifyEmail(String token);
    void saveUserToken(User user, String jwtToken);
}
