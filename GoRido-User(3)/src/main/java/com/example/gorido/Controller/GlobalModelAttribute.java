package com.example.gorido.Controller;

import com.example.gorido.Model.*;
import com.example.gorido.Repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

@ControllerAdvice
public class GlobalModelAttribute {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private HireRepository hireRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @ModelAttribute
    public void addGlobalAttributes(Model model, HttpSession session) {

        String userEmail = (String) session.getAttribute("userEmail");
        String adminEmail = (String) session.getAttribute("adminEmail");

        if (userEmail != null) {

            User user = userRepository.findByEmail(userEmail).orElse(null);

            if (user != null) {
                Driver driver = driverRepository.findByUserId(user).orElse(null);

                model.addAttribute("user", user);
                model.addAttribute("driver", driver);
                model.addAttribute("userRole", "USER");
            }
        }

        if (adminEmail != null) {

            Admin admin = adminRepository.findByEmail(adminEmail).orElse(null);

            if (admin != null) {
                model.addAttribute("admin", admin);
                model.addAttribute("userRole", "ADMIN");
            }
        }
    }

    @ModelAttribute
    public void sideBar(Model model, HttpSession session){
        String userEmail = (String) session.getAttribute("userEmail");
        if (userEmail != null) {

            User user = userRepository.findByEmail(userEmail).orElse(null);

            if (user != null) {
                Driver driver = driverRepository.findByUserId(user).orElse(null);
                List<Vehicle> vehicles = vehicleRepository.findByDriverId(driver);
                List<Integer> vtpIds = vehicles.stream()
                        .map(v -> v.getTypeHasBrand().getVehicleType().getId())
                        .toList();

                List<Hire> requestCount = hireRepository.findMatchingHires(vtpIds);
                model.addAttribute("requestCount", requestCount);

                List<Hire> draftCount = hireRepository.findByUserIdPaymentsAtDesc(user.getId());
                model.addAttribute("draftCount", draftCount);
            }
        }
    }
}
