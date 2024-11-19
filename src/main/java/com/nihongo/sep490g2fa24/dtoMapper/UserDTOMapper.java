package com.nihongo.sep490g2fa24.dtoMapper;

import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.model.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getRole(),
                user.getFlagActive()
        );
    }
}
