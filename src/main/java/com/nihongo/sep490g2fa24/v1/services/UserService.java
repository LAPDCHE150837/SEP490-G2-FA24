package com.nihongo.sep490g2fa24.v1.services;

import com.nihongo.sep490g2fa24.v1.dtos.response.user.PersonalInfoResponse;

public interface UserService {
    PersonalInfoResponse getUser(String id);
}
