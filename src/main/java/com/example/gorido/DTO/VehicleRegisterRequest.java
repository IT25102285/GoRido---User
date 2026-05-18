package com.example.gorido.DTO;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;

public class VehicleRegisterRequest {
    private String number;
    private String insurance_number;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate insurance_exp_date;
    private String model;

    private int typeId;
    private int brandId;
    private int passengersID;
    private int colorId;

    private MultipartFile vehicleImage;
    private MultipartFile bookImage;
    private MultipartFile insuranceImage;

    public void setModel(String model) {
        this.model = model;
    }

    public String getModel() {
        return model;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getNumber() {
        return number;
    }

    public void setInsurance_number(String insurance_number) {
        this.insurance_number = insurance_number;
    }

    public String getInsurance_number() {
        return insurance_number;
    }

    public void setInsurance_exp_date(LocalDate insurance_exp_date) {
        this.insurance_exp_date = insurance_exp_date;
    }

    public LocalDate getInsurance_exp_date() {
        return insurance_exp_date;
    }

    public void setVehicleImage(MultipartFile vehicleImage) {
        this.vehicleImage = vehicleImage;
    }

    public MultipartFile getVehicleImage() {
        return vehicleImage;
    }

    public void setInsuranceImage(MultipartFile insuranceImage) {
        this.insuranceImage = insuranceImage;
    }

    public MultipartFile getInsuranceImage() {
        return insuranceImage;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }

    public int getBrandId() {
        return brandId;
    }

    public void setPassengersID(int passengersID) {
        this.passengersID = passengersID;
    }

    public int getPassengersID() {
        return passengersID;
    }

    public void setColorId(int colorId) {
        this.colorId = colorId;
    }

    public int getColor() {
        return colorId;
    }

    public void setBookImage(MultipartFile bookImage) {
        this.bookImage = bookImage;
    }

    public MultipartFile getBookImage() {
        return bookImage;
    }
}
