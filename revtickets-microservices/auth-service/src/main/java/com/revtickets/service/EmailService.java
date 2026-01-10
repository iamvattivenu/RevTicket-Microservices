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

    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;
        
        System.out.println("\n" + "=".repeat(80));
        System.out.println("PASSWORD RESET EMAIL");
        System.out.println("To: " + toEmail);
        System.out.println("Reset Link: " + resetLink);
        System.out.println("=".repeat(80) + "\n");
        
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
            System.out.println("✓ Password reset email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("✗ EMAIL SEND FAILED: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
