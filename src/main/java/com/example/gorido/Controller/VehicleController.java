package com.example.gorido.Controller;
import com.example.gorido.DTO.VehicleRegisterRequest;
import com.example.gorido.Service.VehicleService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService){
        this.vehicleService = vehicleService;
    }

    @GetMapping("/addvehicle")
    public String driverRegiPage() {
        return "addvehicle";
    }

    @GetMapping("/driver/loadDriverOptions")
    @ResponseBody
    public String loadOptions(){
        return vehicleService.loadOptions();
    }

    @GetMapping("/driver/loadBrands")
    @ResponseBody
    public String loadBrands(@RequestParam int typeId) {
        return vehicleService.loadBrands(typeId);
    }

    @GetMapping("/vehicle/loadPassengers")
    @ResponseBody
    public String loadPassengers(@RequestParam int typeId) {
        return vehicleService.loadPassengers(typeId);
    }

    @PostMapping("/addvehicle/register")
    @ResponseBody
    public String vehicleRegister(@ModelAttribute VehicleRegisterRequest request, HttpSession session){
        return vehicleService.addVehicle(request, session);
    }

    @GetMapping("/managevehicle")
    public String manageVehicle(Model model, HttpSession session) {
        return vehicleService.manageVehicle(model, session);
    }

    @PostMapping("/managevehicle/delete")
    @ResponseBody
    public String deleteVehicle(@RequestParam String number, HttpSession session){
        return vehicleService.delete(session, number);
    }

    @PostMapping("/managevehicle/changeStatus")
    @ResponseBody
    public String changeStatus(@RequestParam String number, HttpSession session){
        return vehicleService.changeStatus(session, number);
    }

}
