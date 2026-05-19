package com.example.gorido.Controller;

import com.example.gorido.DTO.HireRequest;
import com.example.gorido.Service.HireService;
import com.example.gorido.Service.VehicleService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class HireController {

    private final HireService hireService;

    public HireController(HireService hireService){
        this.hireService = hireService;
    }

    @GetMapping("/draftBookings")
    public String draftBookings(Model model, HttpSession session) {
        return hireService.draftBookings(model, session);
    }

    @PostMapping("/hire/deleteDraft")
    @ResponseBody
    public String deleteDraft(@RequestParam int hireId, HttpSession session) {
        return hireService.deleteDraft(session, hireId);
    }

    @PostMapping("/hire/cancelBooking")
    @ResponseBody
    public String cancelBooking(@RequestParam int hireId, HttpSession session) {
        return hireService.cancelBooking(session, hireId);
    }
}
