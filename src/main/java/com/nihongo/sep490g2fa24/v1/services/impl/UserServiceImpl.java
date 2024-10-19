package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.config.JwtService;
import com.nihongo.sep490g2fa24.config.OAuth2Properties;
import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final OAuth2Properties oAuth2Properties;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public LoginResponse login(OAuth2AuthenticationToken authentication) {
        OAuth2User oAuth2User = authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        User user = userRepository.findByEmail(email)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.EMAIL_NOT_FOUND));

        String clientId = oAuth2Properties.getClientId();
        String secretKey = oAuth2Properties.getSecretKey();

        if (secretKey != null || clientId != null) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("email", user.getEmail());
            claims.put("roles", user.getAuthorities());

            String accessToken = jwtService.generateOauth2Token(user, secretKey, claims);

            return LoginResponse.builder()
                    .token(accessToken)
                    .build();
        }
        return null;
    }


    @Override
    public LoginResponse login(String refreshToken) {
        return null;
    }

    @Override
    public void logout() {

    }
}
