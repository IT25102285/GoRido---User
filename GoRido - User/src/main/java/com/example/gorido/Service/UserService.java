package com.example.gorido.Service;
import com.example.gorido.Model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.ui.Model;

public interface UserService {
    String signup(User user);
    String getAllGenders();
    String signin(String email, String password, HttpSession session);
    String sendCode(String email);
    String resetPassword(String email, String code, String newPassword);
    String profile(Model model, HttpSession session);
    String saveNewPassword(String email, String oldPassword, String newPassword);
    String updateUser(String first_name, String last_name, String email, String mobile_number, HttpSession session);
    String logoutUser(HttpSession session);
}
