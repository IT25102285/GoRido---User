package com.example.gorido.Controller;

import com.example.gorido.DTO.HireRequest;
import com.example.gorido.Service.HireService;
import com.example.gorido.Service.VehicleService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HireController {

    private final HireService hireService;

    public HireController(HireService hireService){
        this.hireService = hireService;
    }

    @GetMapping("/myBookings")
    public String myBookingPage(Model model, HttpSession session){
        return hireService.myBookings(model, session);
    }

    @GetMapping("/bookHire")
    public String bookHirePage(Model model, HttpSession session){

        String email = (String) session.getAttribute("userEmail");

        if(email == null){
            return "redirect:/signin";
        }

        return "bookHire";
    }

    @GetMapping("/hire/loadTypes")
    @ResponseBody
    public String loadTypes(){
        return hireService.loadTypes();
    }

    @GetMapping("/hire/loadPassengers")
    @ResponseBody
    public String loadPassengers(@RequestParam int typeId) {
        return hireService.loadPassengers(typeId);
    }

    @PostMapping("/hire/confirm")
    @ResponseBody
    public String confirmBooking(@ModelAttribute HireRequest request, HttpSession session) {
        return hireService.processHire(request, session);
    }

    @GetMapping("/bookingrequests")
    public String bookingRequests(Model model, HttpSession session) {
        return hireService.bookingRequests(model, session);
    }

    @GetMapping("/hire/assignDriver")
    @ResponseBody
    public String assignDriver(@RequestParam int hireId, HttpSession session) {
        return hireService.assignDriver(hireId, session);
    }
}
