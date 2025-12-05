package com.revtickets.service;

import com.revtickets.dto.BookingRequest;
import com.revtickets.exception.ResourceNotFoundException;
import com.revtickets.exception.SeatUnavailableException;
import com.revtickets.model.mysql.*;
import com.revtickets.repository.mysql.BookingRepository;
import com.revtickets.repository.mysql.SeatRepository;
import com.revtickets.repository.mysql.PaymentRepository;
import com.revtickets.repository.mysql.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
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
    private UserService userService;

    @Autowired
    private ShowService showService;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Transactional
    public Booking createBooking(BookingRequest request) {
        User user = userService.getUserById(request.getUserId());
        Show show = showService.getShowById(request.getShowId());

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
        booking.setUser(user);
        booking.setShow(show);
        booking.setNumberOfSeats(request.getSeatNumbers().size());
        booking.setSeatNumbers(String.join(",", request.getSeatNumbers()));
        booking.setTotalAmount(show.getEvent().getPrice() * request.getSeatNumbers().size());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);

        booking = bookingRepository.save(booking);

        for (Seat seat : requestedSeats) {
            seat.setStatus(Seat.SeatStatus.BOOKED);
            seat.setBooking(booking);
            seatRepository.save(seat);
        }

        String paymentId = "PAY-" + UUID.randomUUID().toString();
        Payment payment = new Payment();
        payment.setPaymentId(paymentId);
        payment.setBookingId(booking.getId());
        payment.setAmount(booking.getTotalAmount());
        payment.setStatus(Payment.PaymentStatus.SUCCESS);
        payment.setMethod(request.getPaymentMethod() != null ? Payment.PaymentMethod.valueOf(request.getPaymentMethod()) : Payment.PaymentMethod.UPI);
        paymentRepository.save(payment);

        booking.setPaymentId(paymentId);
        bookingRepository.save(booking);

        String ticketNumber = "TKT-" + UUID.randomUUID().toString();
        Ticket ticket = new Ticket();
        ticket.setTicketNumber(ticketNumber);
        ticket.setBooking(booking);
        ticket.setQrCode("QR-" + booking.getId());
        ticketRepository.save(ticket);

        return booking;
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    @Transactional
    public Booking confirmBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        
        List<Seat> seats = seatRepository.findByShowId(booking.getShow().getId());
        for (Seat seat : seats) {
            if (seat.getBooking() != null && seat.getBooking().getId().equals(bookingId)) {
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
        
        List<Seat> seats = seatRepository.findByShowId(booking.getShow().getId());
        for (Seat seat : seats) {
            if (seat.getBooking() != null && seat.getBooking().getId().equals(bookingId)) {
                seat.setStatus(Seat.SeatStatus.AVAILABLE);
                seat.setBooking(null);
                seatRepository.save(seat);
            }
        }
    }
}
