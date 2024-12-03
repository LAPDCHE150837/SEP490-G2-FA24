package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.dtos.request.ChangePasswordRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.LoginRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.RegisterRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "v1/auth", produces = APPLICATION_JSON_VALUE)
public class AuthenController {
    private final AuthenService authenService;

    @GetMapping("/user")
    public List<UserDTO> getAllUser() throws IOException {

        return authenService.getAll();
    }

    @PostMapping("/register")
    public BaseApiResponse<LoginResponse> register(@RequestBody RegisterRequest registerRequest,
                                                   final HttpServletRequest httpServletRequest) {
        return BaseApiResponse.succeed(authenService.register(registerRequest, httpServletRequest));
    }


    @PostMapping("/authenticate")
    public BaseApiResponse<LoginResponse> authenticate(@RequestBody LoginRequest loginRequest) {
        return BaseApiResponse.succeed(authenService.authenticate(loginRequest));
    }



    @GetMapping("/verify-email")
    public BaseApiResponse<Void> verifyEmail(@RequestParam String token,
                                             HttpServletResponse response) throws IOException {
        String successful = authenService.verifyEmail(token);
        if ("Successful".equals(successful)) {
            response.sendRedirect("/verification-success.html");
        } else {
            response.sendRedirect("/verification-failed.html");
        }

        return BaseApiResponse.succeed();
    }


    @PostMapping("/change-password")
    public BaseApiResponse<Void> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        authenService.changePassword(changePasswordRequest);
        return BaseApiResponse.succeed();
    }


    @PostMapping("/forgot-password")
    public BaseApiResponse<LoginResponse> forgotPassword(@RequestBody ChangePasswordRequest changePasswordRequest,
                                                         final HttpServletRequest httpServletRequest) {
        return BaseApiResponse.succeed(authenService.forgotPassword(changePasswordRequest, httpServletRequest));
    }

    @PostMapping("/reset-password")
    public BaseApiResponse<Void> resetPassword(@RequestParam String token,
                                               @RequestBody ChangePasswordRequest changePasswordRequest,
                                               final HttpServletResponse response) {
        authenService.resetPassword(token, response, changePasswordRequest);
        return BaseApiResponse.succeed();
    }

    //Oauth2
    // TODO dang fix bug
    @PostMapping("/token")
    public BaseApiResponse<LoginResponse> getAccessToken(OAuth2AuthenticationToken authentication) {
        return BaseApiResponse.succeed(authenService.login(authentication));
    }
}