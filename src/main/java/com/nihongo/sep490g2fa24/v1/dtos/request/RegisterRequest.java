package com.nihongo.sep490g2fa24.v1.dtos.request;

import com.nihongo.sep490g2fa24.v1.dtos.users.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Role role;
}
