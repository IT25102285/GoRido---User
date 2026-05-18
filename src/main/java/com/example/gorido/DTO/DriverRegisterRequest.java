package com.example.gorido.DTO;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.Date;

public class DriverRegisterRequest {
    private String email;
    private String nic_number;
    private String license_number;
    private int district;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate license_exp_date;
    private int experience;

    private MultipartFile licenseImage;
    private MultipartFile nicImage;

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setNic_number(String nic_number) {
        this.nic_number = nic_number;
    }

    public String getNic_number() {
        return nic_number;
    }

    public void setLicense_number(String license_number) {
        this.license_number = license_number;
    }

    public String getLicense_number() {
        return license_number;
    }

    public void setDistrict(int district) {
        this.district = district;
    }

    public int getDistrict() {
        return district;
    }

    public void setLicense_exp_date(LocalDate license_exp_date) {
        this.license_exp_date = license_exp_date;
    }

    public LocalDate getLicense_exp_date() {
        return license_exp_date;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public int getExperience() {
        return experience;
    }

    public void setLicenseImage(MultipartFile licenseImage) {
        this.licenseImage = licenseImage;
    }

    public MultipartFile getLicenseImage() {
        return licenseImage;
    }

    public void setNicImage(MultipartFile nicImage) {
        this.nicImage = nicImage;
    }

    public MultipartFile getNicImage() {
        return nicImage;
    }
}
