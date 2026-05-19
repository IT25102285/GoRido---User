package com.example.gorido.Controller;
import com.example.gorido.Model.User;
import com.example.gorido.Service.AuthService;
import com.example.gorido.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "signup";
    }

    @PostMapping("/signup")
    @ResponseBody
    public String signup(@ModelAttribute User user) {
        return authService.signup(user);
    }

    @GetMapping("/signup/options")
    @ResponseBody
    public String getAllGenders() {
        return userService.getAllGenders();
    }

    @GetMapping("/signin")
    public String signinPage() {
        return "signin";
    }

    @PostMapping("/signin")
    @ResponseBody
    public String signin(@RequestParam String email,
                         @RequestParam String password,
                         HttpSession session){
        return authService.signin(email, password, session);
    }

    @RestController
    public class ForgotPasswordController{

        @PostMapping("/send_code")
        public String sendcode(@RequestParam String email){
            return authService.sendCode(email);
        }

        @PostMapping("/reset_password")
        public String resetPassword(@RequestParam String email,
                                    @RequestParam String code,
                                    @RequestParam String newPassword){
            return authService.resetPassword(email, code, newPassword);
        }
    }

    @GetMapping("/userprofile")
    public String profile(Model model, HttpSession session) {
        return userService.profile(model, session);
    }

    @RestController
    public class savepw{
        @PostMapping("/new_password")
        public String savePassword(@RequestParam String email, @RequestParam String oldpassword, @RequestParam String newpassword){
            return authService.changePassword(email, oldpassword, newpassword);
        }
    }

    @RestController
    public class editUser{
        @PostMapping("/updateUser")
        public String updateUser(@RequestParam String first_name, @RequestParam String last_name, @RequestParam String email, @RequestParam String mobile_number,
                                 HttpSession session){
            return userService.updateUser(first_name, last_name, email, mobile_number, session);
        }
    }

    @RestController
    public class delUser{
        @GetMapping("/delete/user")
        public String deleteUser(HttpSession session){
            return userService.deleteUser(session);
        }
    }

    @RestController
    public class logout{
        @GetMapping("/logout/user")
        public String logoutUser(HttpSession session){
            return authService.logoutUser(session);
        }
    }
}
