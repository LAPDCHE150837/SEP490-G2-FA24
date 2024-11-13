package com.nihongo.sep490g2fa24.v1.controllers;

import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;
import com.nihongo.sep490g2fa24.v1.services.CourseService;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "api/v1/users", produces = APPLICATION_JSON_VALUE)
@Transactional
public class UserController {
    private final UserService userService;
    private final CourseService courseService;
    @GetMapping("/course/find-all")
    BaseApiResponse<List<CourseDTO>> getAllCourses() {
        return BaseApiResponse.succeed(courseService.getAllCourse());
    }
    @GetMapping("/{id}")
    public BaseApiResponse<PersonalInfoResponse> getUser(@PathVariable String id) {
        return BaseApiResponse.succeed(userService.getUser(id));
    }


}
