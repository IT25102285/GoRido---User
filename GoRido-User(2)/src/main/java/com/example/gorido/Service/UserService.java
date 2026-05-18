package com.example.gorido.Service;
import com.example.gorido.Model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.ui.Model;

public interface UserService {
    String getAllGenders();
    String updateUser(String first_name, String last_name, String email, String mobile_number, HttpSession session);
    String deleteUser(HttpSession session);
    String profile(Model model, HttpSession session);
}
