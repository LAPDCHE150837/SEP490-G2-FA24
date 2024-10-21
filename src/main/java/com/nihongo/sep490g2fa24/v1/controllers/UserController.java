package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;


import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "v1/users", produces = APPLICATION_JSON_VALUE)
@Transactional
public class UserController {
    private final AuthenService authenService;
    @GetMapping("/user")
    public String getUser(OAuth2AuthenticationToken authentication) {
        return "success";
    }

}
