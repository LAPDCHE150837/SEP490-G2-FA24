package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.dtos.request.ChangePasswordRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.LoginRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.RegisterRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import java.util.List;

public interface AuthenService {
    LoginResponse login(OAuth2AuthenticationToken authentication);

    LoginResponse register(RegisterRequest registerRequest, HttpServletRequest httpServletRequest);

    LoginResponse authenticate(LoginRequest loginRequest);

    String verifyEmail(String token);
    void saveUserToken(User user, String jwtToken);

    void changePassword(ChangePasswordRequest changePasswordRequest);

    LoginResponse forgotPassword(ChangePasswordRequest changePasswordRequest, HttpServletRequest httpServletRequest);

    void resetPassword(String token, HttpServletResponse response, ChangePasswordRequest changePasswordRequest);

    List<UserDTO> getAll();


    User getMyProfile(String remoteUser);
}
