package com.nihongo.sep490g2fa24.v1.dtos.course;

import com.nihongo.sep490g2fa24.v1.dtos.users.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private Instant createdAt;
    private Instant updatedAt;
    private Role role;
    private String flagActive;
}
