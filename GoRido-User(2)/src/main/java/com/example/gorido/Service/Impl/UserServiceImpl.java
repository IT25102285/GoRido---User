package com.example.gorido.Service.Impl;

import com.example.gorido.Model.User;
import com.example.gorido.Model.*;
import com.example.gorido.Repository.*;
import com.example.gorido.Service.AuthService;
import com.example.gorido.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService, AuthService {
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    private final TypeRepository typeRepository;
    private final GenderRepository genderRepository;
    private final EmailService emailService;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final HireRepository hireRepository;

    public UserServiceImpl(UserRepository userRepository,
                           StatusRepository statusRepository,
                           TypeRepository typeRepository,
                           GenderRepository genderRepository, EmailService emailService, DriverRepository driverRepository, VehicleRepository vehicleRepository,
                           HireRepository hireRepository) {
        this.userRepository = userRepository;
        this.statusRepository = statusRepository;
        this.typeRepository = typeRepository;
        this.genderRepository = genderRepository;
        this.emailService = emailService;
        this.driverRepository = driverRepository;
        this.vehicleRepository = vehicleRepository;
        this.hireRepository = hireRepository;
    }

    public String getAllGenders() {

        List<Gender> genders = genderRepository.findAll();

        StringBuilder gen = new StringBuilder();

        for (Gender gender : genders) {
            gen.append(gender.getId())
                    .append(":")
                    .append(gender.getName())
                    .append(",");
        }

        return gen.toString();
    }

    public String signup(User user){
        if (user.getEmail() != null) {
            user.setEmail(user.getEmail().toLowerCase());
        }

        if (user.getFirst_name() == null || user.getFirst_name().trim().isEmpty()) {
            return "error: First name required";
        }

        if (user.getLast_name() == null || user.getLast_name().trim().isEmpty()) {
            return "error: Last name required";
        }

        if (user.getEmail() == null ||
                !user.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return "error: Invalid email";
        }

        Optional<User> activeUser = userRepository.findByEmailAndStatusId_Id(user.getEmail(), 1);

        if (activeUser.isPresent()) {
            return "You already have an account";
        }

        Optional<User> deactiveUser = userRepository.findByEmailAndStatusId_Id(user.getEmail(), 2);

        if (deactiveUser.isPresent()) {
            return "You account is deactivated";
        }

        if (user.getPassword() == null || user.getPassword().length() < 6) {
            return "error: Password must be at least 6 characters";
        }

        if (user.getMobile_number() == null ||
                !user.getMobile_number().trim().matches("^[0-9]{10}$")) {
            return "error: Invalid mobile number";
        }

        Optional<Status> status = statusRepository.findById(1);
        if (status.isEmpty()) {
            return "error: Status not found";
        }

        Optional<Type> userType = typeRepository.findById(1);
        if (userType.isEmpty()){
            return "error: User type not found";
        }

        if (user.getGender_id() == null || user.getGender_id().getId() == 0) {
            return "error: Gender required";
        }

        Optional<Gender> gender = genderRepository.findById(user.getGender_id().getId());
        if (gender.isEmpty()) {
            return "error: Gender not found";
        }

        user.setTypeId(userType.get());
        user.setStatusId(status.get());
        user.setGender_id(gender.get());
        user.setJoined_date(LocalDate.now());
        userRepository.save(user);

        return "success";
    }

    public String signin(String email, String password, HttpSession session){
        email = email.toLowerCase();

        Optional<User> userObj = userRepository.findByEmail(email);
        if (userObj.isEmpty()){
            return "User not found, Try again";
        }

        User user = userObj.get();

        if (user.getPassword() == null || !user.getPassword().equals(password)) {
            return "Incorrect Password, Try again";
        }

        if (user.getStatusId() != null && user.getStatusId().getId() == 2) {
            return "Your account has been deactivated";
        }

        session.setAttribute("userId", user.getId());
        session.setAttribute("userEmail", user.getEmail());

        return "success";
    }

    public String sendCode(String email){
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()){
            return "User not found, Try again";
        }

        int code = new Random().nextInt(900000)+100000;
        User user = userOpt.get();
        user.setVerificationCode(String.valueOf(code));

        userRepository.save(user);
        emailService.sendCode(email, String.valueOf(code));

        return "success";
    }

    public String resetPassword(String email, String code, String newPassword){
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) return "User not found";

        if (user.getVerificationCode() == null || !user.getVerificationCode().equals(code)) {
            return "Invalid code, Try again";
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return "success";
    }

    public String profile(Model model, HttpSession session) {

        String email = (String) session.getAttribute("userEmail");

        if (email == null) {
            return "redirect:/signin";
        }

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "redirect:/signin";
        }

        if (user.getDriver() != null) {
            return "redirect:/driverprofile";
        }

        List<Hire> latestHires = hireRepository.findTop3ByUserId(user.getId())
                .stream()
                .limit(3)
                .toList();

        model.addAttribute("activePage", "profile");
        model.addAttribute("latestHires", latestHires);

        return "userprofile";
    }

    public String changePassword(String email, String oldPassword, String newPassword){
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) return "User not found";

        if (!user.getPassword().equals(oldPassword)) {
            return "Invalid password, Try again";
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return "success";
    }

    public String updateUser(String first_name, String last_name, String email, String mobile_number, HttpSession session){
        int id = (Integer) session.getAttribute("userId");
        String oldEmail = (String) session.getAttribute("userEmail");

        User user = userRepository.findByEmail(oldEmail).orElse(null);
        if (user == null) return "User not found";

        Optional<User> activeUser = userRepository.findByEmailAndStatusId_Id(email, 1);
        if (activeUser.isPresent() && activeUser.get().getId() != id) {
            return "Email already in use";
        }

        user.setFirst_name(first_name);
        user.setLast_name(last_name);
        user.setEmail(email);
        user.setMobile_number(mobile_number);
        userRepository.save(user);

        session.setAttribute("userEmail", user.getEmail());
        return "success";
    }

    public String deleteUser(HttpSession session) {

        String email = (String) session.getAttribute("userEmail");
        if (email == null) return "Session expired";

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return "User not found";

        Driver driver = user.getDriver();

        if (driver != null) {

            deleteFile(driver.getNic_image(), "driver/personal/nic");
            deleteFile(driver.getLicense_image(), "driver/personal/license");

            for (Vehicle v : driver.getVehicles()) {
                deleteFile(v.getInsurance_photo(), "driver/vehicle/isuarance");
                deleteFile(v.getVehicle_book(), "driver/vehicle/book");
                deleteFile(v.getVehicle_photo(), "driver/vehicle/vehicle_images");
            }
        }

        userRepository.delete(user);

        session.invalidate();

        return "success";
    }

    private void deleteFile(String fileName, String folder) {

        if (fileName == null) return;

        String basePath = "J:/New folder/GoRido/images/";

        File file = new File(basePath + folder + "/" + fileName);

        if (file.exists()) {
            file.delete();
        }
    }

    public String logoutUser(HttpSession session){
        session.invalidate();
        return "success";
    }
}