package com.revtickets.service;

import com.revtickets.dto.BookingRequest;
import com.revtickets.dto.NotificationRequest;
import com.revtickets.exception.ResourceNotFoundException;
import com.revtickets.exception.SeatUnavailableException;
import com.revtickets.model.mysql.*;
import com.revtickets.repository.mysql.BookingRepository;
import com.revtickets.repository.mysql.SeatRepository;
import com.revtickets.repository.mysql.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Transactional
    public Booking createBooking(BookingRequest request) {
        List<Seat> seats = seatRepository.findByShowId(request.getShowId());
        List<Seat> requestedSeats = seats.stream()
                .filter(s -> request.getSeatNumbers().contains(s.getSeatNumber()))
                .collect(Collectors.toList());

        if (requestedSeats.size() != request.getSeatNumbers().size()) {
            throw new ResourceNotFoundException("Some seats not found");
        }

        for (Seat seat : requestedSeats) {
            if (seat.getStatus() != Seat.SeatStatus.AVAILABLE) {
                throw new SeatUnavailableException("Seat " + seat.getSeatNumber() + " is not available");
            }
        }

        Booking booking = new Booking();
        booking.setUserId(request.getUserId());
        booking.setShowId(request.getShowId());
        booking.setNumberOfSeats(request.getSeatNumbers().size());
        booking.setSeatNumbers(String.join(",", request.getSeatNumbers()));
        booking.setTotalAmount(100.0 * request.getSeatNumbers().size());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);

        booking = bookingRepository.save(booking);

        for (Seat seat : requestedSeats) {
            seat.setStatus(Seat.SeatStatus.BOOKED);
            seat.setBookingId(booking.getId());
            seatRepository.save(seat);
        }

        String ticketNumber = "TKT-" + UUID.randomUUID().toString();
        Ticket ticket = new Ticket();
        ticket.setTicketNumber(ticketNumber);
        ticket.setBookingId(booking.getId());
        ticket.setQrCode("QR-" + booking.getId());
        ticketRepository.save(ticket);

        sendBookingConfirmation(booking, request.getSeatNumbers());

        return booking;
    }

    private void sendBookingConfirmation(Booking booking, List<String> seatNumbers) {
        try {
            System.out.println("=== Starting booking confirmation for Booking ID: " + booking.getId() + " ===");
            
            String userEmail = restTemplate.getForObject(
                "http://localhost:8081/api/users/" + booking.getUserId() + "/email",
                String.class
            );
            System.out.println("User email fetched: " + userEmail);
            
            String userName = "Customer";
            String eventName = "Event";
            String showTime = "TBD";
            
            try {
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> user = restTemplate.getForObject(
                    "http://localhost:8081/api/users/" + booking.getUserId(),
                    java.util.Map.class
                );
                if (user != null && user.get("name") != null) {
                    userName = user.get("name").toString();
                }
                System.out.println("User name fetched: " + userName);
            } catch (Exception e) {
                System.err.println("Error fetching user name: " + e.getMessage());
            }
            
            try {
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> show = restTemplate.getForObject(
                    "http://localhost:8087/api/shows/" + booking.getShowId(),
                    java.util.Map.class
                );
                if (show != null) {
                    if (show.get("event") != null) {
                        @SuppressWarnings("unchecked")
                        java.util.Map<String, Object> event = (java.util.Map<String, Object>) show.get("event");
                        if (event.get("title") != null) {
                            eventName = event.get("title").toString();
                        }
                    }
                    if (show.get("showTime") != null) {
                        showTime = show.get("showTime").toString();
                    }
                }
                System.out.println("Event name: " + eventName + ", Show time: " + showTime);
            } catch (Exception e) {
                System.err.println("Error fetching show details: " + e.getMessage());
            }
            
            String emailBody = buildTicketEmailBody(userName, booking, seatNumbers, eventName, showTime);
            System.out.println("Email body created");
            
            NotificationRequest notification = new NotificationRequest(
                booking.getUserId(),
                userEmail,
                "Booking Confirmed - RevTickets",
                emailBody,
                "BOOKING_CONFIRMATION"
            );
            
            System.out.println("Sending notification to: " + userEmail);
            Object response = restTemplate.postForObject("http://localhost:8084/api/notifications", notification, Object.class);
            System.out.println("Notification sent successfully! Response: " + response);
        } catch (Exception e) {
            System.err.println("Failed to send notification: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private String buildTicketEmailBody(String userName, Booking booking, List<String> seatNumbers, String eventName, String showTime) {
        return "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
            "<div style='max-width: 600px; margin: 0 auto; padding: 20px;'>" +
            "<h2 style='color: #e50914;'>🎬 RevTickets - Booking Confirmed #" + booking.getId() + "</h2>" +
            "<p>Dear " + userName + ",</p>" +
            "<p style='font-size: 16px;'><strong>🎬 Your booking has been confirmed!</strong></p>" +
            "<div style='background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;'>" +
            "<h3 style='margin-top: 0;'>📋 Booking Details:</h3>" +
            "<p style='margin: 5px 0;'><strong>Booking ID:</strong> " + booking.getId() + "</p>" +
            "<p style='margin: 5px 0;'><strong>Movie:</strong> " + eventName + "</p>" +
            "<p style='margin: 5px 0;'><strong>Show Time:</strong> " + showTime + "</p>" +
            "<p style='margin: 5px 0;'><strong>Seats:</strong> " + String.join(", ", seatNumbers) + "</p>" +
            "<p style='margin: 5px 0;'><strong>Total Amount:</strong> ₹" + booking.getTotalAmount() + "</p>" +
            "</div>" +
            "<p style='margin: 20px 0;'>🎫 <a href='http://localhost:4200/user/ticket/" + booking.getId() + "' style='color: #e50914; text-decoration: none; font-weight: bold;'>View Your Ticket</a></p>" +
            "<p style='color: #666; font-size: 14px;'>Please show this email or your booking ID at the venue.</p>" +
            "<p style='margin-top: 30px;'>Enjoy your movie! 🍿</p>" +
            "<p style='margin-top: 20px;'>Best regards,<br><strong>RevTickets Team</strong></p>" +
            "</div></body></html>";
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        Ticket ticket = ticketRepository.findByBookingId(id).orElse(null);
        if (ticket != null) {
            booking.setQrCode(ticket.getQrCode());
        }
        
        return booking;
    }

    @Transactional
    public Booking confirmBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        
        List<Seat> seats = seatRepository.findByShowId(booking.getShowId());
        for (Seat seat : seats) {
            if (seat.getBookingId() != null && seat.getBookingId().equals(bookingId)) {
                seat.setStatus(Seat.SeatStatus.BOOKED);
                seatRepository.save(seat);
            }
        }
        
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        
        List<Seat> seats = seatRepository.findByShowId(booking.getShowId());
        for (Seat seat : seats) {
            if (seat.getBookingId() != null && seat.getBookingId().equals(bookingId)) {
                seat.setStatus(Seat.SeatStatus.AVAILABLE);
                seat.setBookingId(null);
                seatRepository.save(seat);
            }
        }
        
        sendCancellationEmail(booking);
    }
    
    private void sendCancellationEmail(Booking booking) {
        try {
            System.out.println("=== Sending cancellation email for Booking ID: " + booking.getId() + " ===");
            
            String userEmail = restTemplate.getForObject(
                "http://localhost:8081/api/users/" + booking.getUserId() + "/email",
                String.class
            );
            System.out.println("User email: " + userEmail);
            
            String userName = "Customer";
            String eventName = "Event";
            String showTime = "TBD";
            String venueName = "Venue";
            
            try {
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> user = restTemplate.getForObject(
                    "http://localhost:8081/api/users/" + booking.getUserId(),
                    java.util.Map.class
                );
                if (user != null && user.get("name") != null) {
                    userName = user.get("name").toString();
                }
            } catch (Exception e) {
                System.err.println("Error fetching user name: " + e.getMessage());
            }
            
            try {
                @SuppressWarnings("unchecked")
                java.util.Map<String, Object> show = restTemplate.getForObject(
                    "http://localhost:8087/api/shows/" + booking.getShowId(),
                    java.util.Map.class
                );
                if (show != null) {
                    if (show.get("event") != null) {
                        @SuppressWarnings("unchecked")
                        java.util.Map<String, Object> event = (java.util.Map<String, Object>) show.get("event");
                        if (event.get("title") != null) {
                            eventName = event.get("title").toString();
                        }
                    }
                    if (show.get("showTime") != null) {
                        showTime = show.get("showTime").toString();
                    }
                    if (show.get("venue") != null) {
                        @SuppressWarnings("unchecked")
                        java.util.Map<String, Object> venue = (java.util.Map<String, Object>) show.get("venue");
                        if (venue.get("name") != null) {
                            venueName = venue.get("name").toString();
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Error fetching show details: " + e.getMessage());
            }
            
            String emailBody = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
                "<div style='max-width: 600px; margin: 0 auto; padding: 20px;'>" +
                "<h2 style='color: #e50914;'>❌ RevTickets - Booking Cancelled #" + booking.getId() + "</h2>" +
                "<p>Dear " + userName + ",</p>" +
                "<p style='font-size: 16px;'><strong>❌ Your booking has been cancelled.</strong></p>" +
                "<div style='background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;'>" +
                "<h3 style='margin-top: 0;'>📋 Cancellation Details:</h3>" +
                "<p style='margin: 5px 0;'><strong>Booking ID:</strong> " + booking.getId() + "</p>" +
                "<p style='margin: 5px 0;'><strong>Movie:</strong> " + eventName + "</p>" +
                "<p style='margin: 5px 0;'><strong>Show Time:</strong> " + showTime + "</p>" +
                "<p style='margin: 5px 0;'><strong>Seats:</strong> " + booking.getSeatNumbers() + "</p>" +
                "<p style='margin: 5px 0;'><strong>Venue:</strong> " + venueName + "</p>" +
                "<p style='margin: 5px 0;'><strong>Refund Amount:</strong> ₹" + booking.getTotalAmount() + "</p>" +
                "</div>" +
                "<p style='color: #666; font-size: 14px;'>The refund will be processed within 5-7 business days.</p>" +
                "<p style='color: #666; font-size: 14px;'>If you have any questions, please contact our support team.</p>" +
                "<p style='margin-top: 30px;'>Best regards,<br><strong>RevTickets Team</strong></p>" +
                "</div></body></html>";
            
            NotificationRequest notification = new NotificationRequest(
                booking.getUserId(),
                userEmail,
                "Booking Cancelled - RevTickets",
                emailBody,
                "BOOKING_CANCELLATION"
            );
            
            System.out.println("Sending cancellation notification to: " + userEmail);
            restTemplate.postForObject("http://localhost:8084/api/notifications", notification, Object.class);
            System.out.println("Cancellation email sent successfully!");
        } catch (Exception e) {
            System.err.println("Failed to send cancellation email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
