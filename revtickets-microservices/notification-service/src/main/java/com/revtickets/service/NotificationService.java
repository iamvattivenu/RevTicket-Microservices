package com.revtickets.service;

import com.revtickets.dto.NotificationRequest;
import com.revtickets.model.mongo.Notification;
import com.revtickets.repository.mongo.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private JavaMailSender mailSender;

    public Notification createNotification(NotificationRequest request) {
        System.out.println("=== Creating notification ===");
        System.out.println("User ID: " + request.getUserId());
        System.out.println("User Email: " + request.getUserEmail());
        System.out.println("Title: " + request.getTitle());
        
        Notification notification = new Notification();
        notification.setUserId(request.getUserId());
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setType(request.getType());
        notification = notificationRepository.save(notification);
        System.out.println("Notification saved to MongoDB");
        
        if (request.getUserEmail() != null && !request.getUserEmail().isEmpty()) {
            System.out.println("Attempting to send email to: " + request.getUserEmail());
            sendEmail(request.getUserEmail(), request.getTitle(), request.getMessage());
        } else {
            System.err.println("No email address provided!");
        }
        
        return notification;
    }

    private void sendEmail(String to, String subject, String text) {
        try {
            System.out.println("Creating HTML email message...");
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("venuvenunaidu@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            System.out.println("Sending email via JavaMailSender...");
            mailSender.send(message);
            System.out.println("Email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId);
    }

    public void markAsRead(String notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        if (notification.isPresent()) {
            Notification notif = notification.get();
            notif.setIsRead(true);
            notificationRepository.save(notif);
        }
    }
}
