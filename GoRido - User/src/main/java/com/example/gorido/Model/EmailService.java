package com.example.gorido.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailsender;

    public void sendCode(String toEmail, String code){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("goridotaxiservice@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Forgot Password Code");
        message.setText("Your verification code is: "+code);

        mailsender.send(message);
    }
}
