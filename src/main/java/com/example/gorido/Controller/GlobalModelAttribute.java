package com.example.gorido.Controller;

import com.example.gorido.Model.Driver;
import com.example.gorido.Model.User;
import com.example.gorido.Repository.DriverRepository;
import com.example.gorido.Repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalModelAttribute {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    @ModelAttribute
    public void addGlobalAttributes(Model model, HttpSession session) {

        String email = (String) session.getAttribute("userEmail");

        if (email == null) return;

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) return;

        Driver driver = driverRepository.findByUserId(user).orElse(null);

        model.addAttribute("user", user);
        model.addAttribute("driver", driver);
    }
}
