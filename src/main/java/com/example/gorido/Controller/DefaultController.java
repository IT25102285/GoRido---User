package com.example.gorido.Controller;
import com.example.gorido.Model.Driver;
import com.example.gorido.Model.User;
import com.example.gorido.Repository.DriverRepository;
import com.example.gorido.Repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultController {
    private final UserRepository userRepository;

    public DefaultController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //Profile Selection
    @GetMapping("/profile")
    public String profileRedirect(HttpSession session) {

        String email = (String) session.getAttribute("userEmail");

        if (email == null) {
            return "redirect:/signin";
        }

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "redirect:/signin";
        }

        int type = user.getTypeId().getId();

        if (type == 1) {
            return "redirect:/userprofile";
        }

        if (type == 2) {
            return "redirect:/driverprofile";
        }

        return "redirect:/signin";
    }
}
