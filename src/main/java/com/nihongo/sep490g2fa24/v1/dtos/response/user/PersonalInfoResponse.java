package com.nihongo.sep490g2fa24.v1.dtos.response.user;

import com.nihongo.sep490g2fa24.v1.model.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalInfoResponse {
    private String id;
    private String username;
    private String email;
    private String createdAt;

    public PersonalInfoResponse(User user) {
        BeanUtils.copyProperties(user, this);
    }
}
