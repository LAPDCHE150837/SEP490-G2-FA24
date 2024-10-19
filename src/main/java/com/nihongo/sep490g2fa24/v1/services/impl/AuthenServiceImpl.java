package com.nihongo.sep490g2fa24.v1.services.impl;

import com.nihongo.sep490g2fa24.exception.NhgClientException;
import com.nihongo.sep490g2fa24.exception.NhgErrorHandler;
import com.nihongo.sep490g2fa24.v1.services.AuthenService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class AuthenServiceImpl implements AuthenService {
    private static final String USERNAME = "user";
    private static final String PASSWORD = "password";

    @Override
    public void login(String username, String password, HttpSession session) {
        if (USERNAME.equals(username) && PASSWORD.equals(password)) {
            session.setAttribute(USERNAME, username);
        } else {
            throw NhgClientException.ofHandler(NhgErrorHandler.UNAUTHORIZED);
        }
    }
}
