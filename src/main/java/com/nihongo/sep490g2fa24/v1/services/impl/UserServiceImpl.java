package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public PersonalInfoResponse getUser(String id) {

        User user =  userRepository.findById(id).orElseThrow(NhgClientException.supplier(NhgErrorHandler.USER_NOT_FOUND));
        return  new PersonalInfoResponse(user);
    }
}

