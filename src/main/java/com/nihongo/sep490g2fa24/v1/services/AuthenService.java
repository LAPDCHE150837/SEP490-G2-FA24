package com.nihongo.sep490g2fa24.v1.services;

import jakarta.servlet.http.HttpSession;

public interface AuthenService {
    void login(String username, String password, HttpSession session);
}
