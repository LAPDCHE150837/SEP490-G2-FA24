package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;




import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "v1/users", produces = APPLICATION_JSON_VALUE)
@Transactional
public class UserController {
    private final AuthenService authenService;
    private final UserService userService;
    @GetMapping("/user")
    public String getUser() {
        return "success";
    }
    @GetMapping("/{id}")
    public BaseApiResponse<PersonalInfoResponse> getUser(@PathVariable String id) {
        return BaseApiResponse.succeed(userService.getUser(id));
    }

}
