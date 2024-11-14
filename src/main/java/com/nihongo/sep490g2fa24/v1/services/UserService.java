package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;

import java.util.List;

public interface UserService {
    PersonalInfoResponse getUser(String id);
    List<UserDTO> getAllCourse();
}
