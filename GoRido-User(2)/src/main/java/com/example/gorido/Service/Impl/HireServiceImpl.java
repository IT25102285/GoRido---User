package com.example.gorido.Service.Impl;

import com.example.gorido.DTO.HireRequest;
import com.example.gorido.Model.Passengers;
import com.example.gorido.Model.*;
import com.example.gorido.Model.VehicleColor;
import com.example.gorido.Model.VehicleType;
import com.example.gorido.Repository.*;
import com.example.gorido.Service.HireService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class HireServiceImpl implements HireService {
    private final UserRepository userRepository;
    private final VehicleTypeRepository vehicleTypeRepository;
    private final HireStatusRepository hireStatusRepository;
    private final HireRepository hireRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;

    public HireServiceImpl(UserRepository userRepository, VehicleTypeRepository vehicleTypeRepository,
                           HireStatusRepository hireStatusRepository, HireRepository hireRepository,
                           VehicleRepository vehicleRepository, DriverRepository driverRepository){
        this.userRepository = userRepository;
        this.vehicleTypeRepository = vehicleTypeRepository;
        this.hireStatusRepository = hireStatusRepository;
        this.hireRepository = hireRepository;
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
    }

    public String draftBookings(Model model, HttpSession session){
        Integer userId = (Integer) session.getAttribute("userId");

        if(userId == null){
            return "redirect:/signin";
        }

        List<Hire> hires = hireRepository.findByUserIdPaymentsAtDesc(userId);

        model.addAttribute("hires", hires);
        model.addAttribute("activePage", "draftBookings");

        return "draftBookings";
    }

    public String deleteDraft(HttpSession session, int hireId){
        Integer userId = (Integer) session.getAttribute("userId");

        if(userId == null){
            return "redirect:/signin";
        }

        Hire hire = hireRepository.findById(hireId).orElse(null);
        if (hire == null){
            return "Something went wrong";
        }

        hireRepository.delete(hire);
        return "success";
    }

    public String cancelBooking(HttpSession session, int hireId){
        Integer userId = (Integer) session.getAttribute("userId");

        if(userId == null){
            return "redirect:/signin";
        }

        Hire hire = hireRepository.findById(hireId).orElse(null);
        if (hire == null){
            return "Something went wrong";
        }

        Optional<HireStatus> status = hireStatusRepository.findById(3);
        if (status.isEmpty()) {
            return "Hire status not found";
        }
        hire.setHireStatus(status.get());
        hireRepository.save(hire);
        return "success";
    }
}
