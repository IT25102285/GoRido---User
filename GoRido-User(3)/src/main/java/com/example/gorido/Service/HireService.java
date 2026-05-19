package com.example.gorido.Service;
import com.example.gorido.DTO.HireRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.ui.Model;

import java.util.Map;

public interface HireService {
    String draftBookings(Model model, HttpSession session);
    String deleteDraft(HttpSession session, int hireId);
    String cancelBooking(HttpSession session, int hireId);
}
