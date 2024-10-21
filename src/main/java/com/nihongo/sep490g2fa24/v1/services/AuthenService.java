package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.dtos.request.LoginRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.RegisterRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import jakarta.servlet.http.HttpSession;

public interface AuthenService{
    void login (String username, String password, HttpSession session);
    LoginResponse register(RegisterRequest registerRequest);
    LoginResponse authenticate(LoginRequest loginRequest);
}
