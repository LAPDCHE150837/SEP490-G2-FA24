package com.nihongo.sep490g2fa24.v1.services.impl;


import com.nihongo.sep490g2fa24.config.JwtService;
import com.nihongo.sep490g2fa24.config.OAuth2Properties;
import com.nihongo.sep490g2fa24.dtoMapper.UserDTOMapper;
import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.utils.Constants;
import com.nihongo.sep490g2fa24.v1.dtos.course.UserDTO;
import com.nihongo.sep490g2fa24.v1.dtos.request.ChangePasswordRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.LoginRequest;
import com.nihongo.sep490g2fa24.v1.dtos.request.RegisterRequest;
import com.nihongo.sep490g2fa24.v1.dtos.response.user.LoginResponse;
import com.nihongo.sep490g2fa24.v1.dtos.tokens.TokenType;
import com.nihongo.sep490g2fa24.v1.event.PasswordResetEvent;
import com.nihongo.sep490g2fa24.v1.event.RegistrationCompleteEvent;
import com.nihongo.sep490g2fa24.v1.model.Token;
import com.nihongo.sep490g2fa24.v1.model.User;
import com.nihongo.sep490g2fa24.v1.repositories.TokenRepository;
import com.nihongo.sep490g2fa24.v1.repositories.UserRepository;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenServiceImpl implements AuthenService {
    private final OAuth2Properties oAuth2Properties;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final ApplicationEventPublisher publisher;
    private final UserDTOMapper userDTOMapper;

    @Override
    public LoginResponse login(OAuth2AuthenticationToken authentication) {
        OAuth2User oAuth2User = authentication.getPrincipal();
        String username = oAuth2User.getAttribute("username");
        String name = oAuth2User.getAttribute("name");
        User user = userRepository.findByUsername(username)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.USERNAME_NOT_FOUND));

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
    public LoginResponse register(RegisterRequest registerRequest, HttpServletRequest httpServletRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw NhgClientException.ofHandler(NhgErrorHandler.USER_IS_EXISTED);
        }

        // Khi user dang ki chua xac thuc mail -> flagActive = INACTIVE
        User user =
                User.builder()
                        .username(registerRequest.getUsername())
                        .email(registerRequest.getEmail())
                        .password(passwordEncoder.encode(registerRequest.getPassword()))
                        .createdAt(Instant.now())
                        .flagActive(Constants.INACTIVE)
                        .role(registerRequest.getRole())
                        .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        // Sau khi dang ki thanh cong, can xac thuc qua email
        publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(httpServletRequest), jwtToken));
        return LoginResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();

    }

    @Override
    public LoginResponse authenticate(LoginRequest loginRequest) {
        // Authenticate the user with email and password
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(
                NhgClientException.supplier(NhgErrorHandler.USERNAME_NOT_FOUND));
        // Check user da verify email sau khi dang ky chua
        if (!Constants.ACTIVE.equals(user.getFlagActive())) {
            throw NhgClientException.ofHandler(NhgErrorHandler.NOT_VERIFIED);
        }
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return LoginResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }


    @Override
    public String verifyEmail(String token) {
        Token theToken = tokenRepository.findByAccessToken(token)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.TOKEN_INVALID));
        if (Constants.ACTIVE.equals(theToken.getUser().getFlagActive())) {
            throw NhgClientException.ofHandler(NhgErrorHandler.USER_IS_VERIFIED);
        }
        if (jwtService.isTokenValid(theToken.getAccessToken(), theToken.getUser())
                && Constants.INACTIVE.equals(theToken.getUser().getFlagActive())) {
            theToken.getUser().setFlagActive(Constants.ACTIVE);
            userRepository.save(theToken.getUser());
        }
        return "Successful";
    }

    @Override
    public void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .accessToken(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    @Override
    public void changePassword(ChangePasswordRequest changePasswordRequest) {

        User user_info = getCurrentCustomer();
        User user = userRepository.findByEmail(user_info.getEmail())
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.EMAIL_NOT_FOUND));
        if (passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userRepository.save(user);
        } else {
            throw NhgClientException.ofHandler(NhgErrorHandler.INVALID_PASSWORD);
        }
    }

    @Override
    public LoginResponse forgotPassword(ChangePasswordRequest changePasswordRequest, HttpServletRequest httpServletRequest) {
        User user = userRepository.findByEmail(changePasswordRequest.getEmail())
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.EMAIL_NOT_FOUND));
        //Neu nhu dung email roi -> thu hoi token cua email hien tai
        revokeAllUserTokens(user);
        // roi generate new token moi cho user
        String newToken = jwtService.generateToken(user);
        String resetUrl = "http://localhost:5173/forgotPassword?token=";
        publisher.publishEvent(new PasswordResetEvent(user, resetUrl, newToken));
        return LoginResponse.builder()
                .token(newToken)
                .build();
    }

    @Override
    public void resetPassword(String token, HttpServletResponse response, ChangePasswordRequest changePasswordRequest) {
        Token theToken = tokenRepository.findByAccessToken(token)
                .orElseThrow(NhgClientException.supplier(NhgErrorHandler.TOKEN_INVALID));
        if (theToken != null) {
            User user = theToken.getUser();
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userRepository.save(user);
        }
    }

    @Override
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public User getCurrentCustomer() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException("Authentication information not found");
        }

        return (User) authentication.getPrincipal();
    }

    public String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}