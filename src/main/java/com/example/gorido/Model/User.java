package com.example.gorido.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String email;
    private String first_name;
    private String last_name;
    private String mobile_number;
    private String password;
    private LocalDate joined_date;
    @Column(name = "verification_code")
    private String verificationCode;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type_id;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status statusId;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender_id;

    public User(){}

    public void setId(int id) {
        Id = id;
    }

    public int getId() {
        return Id;
    }

    public void setLast_name(String last_name) {this.last_name = last_name;}
    public String getFirst_name() {return first_name;}

    public void setFirst_name(String first_name) {this.first_name = first_name;}
    public String getLast_name() {return last_name;}

    public void setEmail(String email) {this.email = email;}
    public String getEmail() {return email;}

    public void setMobile_number(String mobile_number) {this.mobile_number = mobile_number;}
    public String getMobile_number() {return mobile_number;}

    public void setGender_id(Gender gender_id) {
        this.gender_id = gender_id;
    }

    public Gender getGender_id() {
        return gender_id;
    }

    public void setPassword(String password) {this.password = password;}
    public String getPassword() {return password;}

    public void setJoined_date(LocalDate joined_date) {this.joined_date = joined_date;}
    public LocalDate getJoined_date() {return joined_date;}

    public void setStatusId(Status statusId) {
        this.statusId = statusId;
    }

    public Status getStatusId() {
        return statusId;
    }

    public String getVerificationCode() {
        return verificationCode;
    }
    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Type getTypeId() {
        return type_id;
    }

    public void setTypeId(Type type_id) {
        this.type_id = type_id;
    }

    @OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, orphanRemoval = true)
    private Driver driver;

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Driver getDriver() {
        return driver;
    }
}