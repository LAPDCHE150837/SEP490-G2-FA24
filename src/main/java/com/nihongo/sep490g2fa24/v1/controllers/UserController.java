package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "v1/users", produces = APPLICATION_JSON_VALUE)
@Transactional
public class UserController {
    private final UserService userService;

    @PostMapping("/token")
    public BaseApiResponse<LoginResponse> getAccessToken(OAuth2AuthenticationToken authentication) {
        return BaseApiResponse.succeed(userService.login(authentication));
    }
    @GetMapping("/user")
    public String getUser(OAuth2AuthenticationToken authentication) {
        return "success";
    }

}
