package com.revtickets.service;

import com.revtickets.dto.PaymentRequest;
import com.revtickets.model.mysql.Payment;
import com.revtickets.repository.mysql.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingService bookingService;

    public Payment processPayment(PaymentRequest request) {
        Payment payment = new Payment();
        payment.setPaymentId("PAY-" + UUID.randomUUID().toString());
        payment.setBookingId(request.getBookingId());
        payment.setAmount(request.getAmount());
        payment.setMethod(Payment.PaymentMethod.valueOf(request.getMethod().toUpperCase()));
        payment.setStatus(Payment.PaymentStatus.SUCCESS);

        payment = paymentRepository.save(payment);

        bookingService.confirmBooking(request.getBookingId());

        return payment;
    }

    public Payment getPaymentByBookingId(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId).orElse(null);
    }
}
