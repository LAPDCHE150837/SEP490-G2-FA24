package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.dtoMapper.UserDTOMapper;
import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.dtos.request.ChangePasswordRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper ;
    private final PasswordEncoder passwordEncoder;

    @Override
    public PersonalInfoResponse getUser(String id) {

        User user =  userRepository.findById(id).orElseThrow(NhgClientException.supplier(NhgErrorHandler.USER_NOT_FOUND));
        return  new PersonalInfoResponse(user);
    }

    @Override
    public List<UserDTO> getAllCourse() {
        return userRepository.findAll().stream().map(userDTOMapper).toList()  ;
    }

    @Override
    public void changePassword(ChangePasswordRequest changePasswordRequest, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.EMAIL_NOT_FOUND));
        if (passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userRepository.save(user);
        } else {
            throw NhgClientException.ofHandler(NhgErrorHandler.INVALID_PASSWORD);
        }
    }
}
