package com.nihongo.sep490g2fa24.v1.controllers;


import com.nihongo.sep490g2fa24.dtoMapper.UserDTOMapper;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.dtos.request.ChangePasswordRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.services.CourseService;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;


@RestController
@RequiredArgsConstructor
@RequestMapping(value = "api/v1/users", produces = APPLICATION_JSON_VALUE)
@Transactional
public class UserController {
    private final UserService userService;
    private final CourseService courseService;
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    //    @GetMapping("/course/find-all")
//    BaseApiResponse<List<CourseDTO>> getAllCourses() {
//        return BaseApiResponse.succeed(courseService.getAllCourse());
//    }
    @GetMapping("/id")
    public BaseApiResponse<PersonalInfoResponse> getUser(HttpServletRequest request) {
        User user = userRepository.findByUsername(request.getRemoteUser()).orElseThrow() ;
        return BaseApiResponse.succeed(userService.getUser(user.getId()));
    }

    @GetMapping("/{id}")
    public BaseApiResponse<UserDTO> getUserById(@PathVariable String id) {
        User user = userRepository.findById(id).orElseThrow() ;
        UserDTO userDTO = userDTOMapper.apply(user);
        return BaseApiResponse.succeed(userDTO);
    }

    @PostMapping("/change-password")
    public BaseApiResponse<Void> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpServletRequest req) {
        userService.changePassword(changePasswordRequest,req.getRemoteUser());
        return BaseApiResponse.succeed();
    }


    //TODO viet api lession vao day
}
