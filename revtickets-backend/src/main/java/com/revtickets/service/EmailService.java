package com.revtickets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;
        
        if (fromEmail == null || fromEmail.isEmpty()) {
            System.out.println("=" .repeat(60));
            System.out.println("EMAIL NOT CONFIGURED - Password Reset Link:");
            System.out.println(resetLink);
            System.out.println("Configure Gmail credentials in application.properties to send emails");
            System.out.println("=" .repeat(60));
            return;
        }
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Password Reset Request - RevTickets");
            message.setText("Hello,\n\n" +
                    "You have requested to reset your password. Please click the link below to reset your password:\n\n" +
                    resetLink + "\n\n" +
                    "This link will expire in 1 hour.\n\n" +
                    "If you did not request this, please ignore this email.\n\n" +
                    "Best regards,\n" +
                    "RevTickets Team");
            
            mailSender.send(message);
            System.out.println("Password reset email sent to: " + toEmail);
        } catch (Exception e) {
            System.out.println("=" .repeat(60));
            System.out.println("EMAIL SEND FAILED - Password Reset Link:");
            System.out.println(resetLink);
            System.out.println("Error: " + e.getMessage());
            System.out.println("=" .repeat(60));
        }
    }
}
