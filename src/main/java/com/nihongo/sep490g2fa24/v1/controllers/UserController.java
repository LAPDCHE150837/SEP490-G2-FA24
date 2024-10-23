package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;



import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "v1/users", produces = APPLICATION_JSON_VALUE)
@Transactional
public class UserController {
    private final AuthenService authenService;
    @GetMapping("/user")
    public String getUser() {
        return "success";
    }

}
