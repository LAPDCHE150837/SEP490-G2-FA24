package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.request.LoginRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.RegisterRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "v1/auth", produces = APPLICATION_JSON_VALUE)
public class AuthenController {
    private final AuthenService authenService;
    @PostMapping("/register")
    public BaseApiResponse<LoginResponse> register(@RequestBody RegisterRequest registerRequest) {
        return BaseApiResponse.succeed(authenService.register(registerRequest));
    }
    @PostMapping("/authenticate")
    public BaseApiResponse<LoginResponse> authenticate(@RequestBody LoginRequest loginRequest) {
        return BaseApiResponse.succeed(authenService.authenticate(loginRequest));
    }
    //Oauth2
    // TODO dang fix bug
    @PostMapping("/token")
    public BaseApiResponse<LoginResponse> getAccessToken(OAuth2AuthenticationToken authentication) {
        return BaseApiResponse.succeed(authenService.login(authentication));
    }
}
