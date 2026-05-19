package com.example.gorido.Service;

import com.example.gorido.Model.User;
import jakarta.servlet.http.HttpSession;

public interface AuthService {
    String signup(User user);
    String signin(String email, String password, HttpSession session);
    String logoutUser(HttpSession session);
    String sendCode(String email);
    String resetPassword(String email, String code, String newPassword);
    String changePassword(String email, String oldPassword, String newPassword);
}
