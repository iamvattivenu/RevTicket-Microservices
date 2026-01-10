package com.revtickets.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class BookingController {

    @GetMapping("/bookings/user/{userId}")
    public ResponseEntity<java.util.List<Map<String, Object>>> getUserBookings(@PathVariable String userId) {
        java.util.List<Map<String, Object>> bookings = new java.util.ArrayList<>();
        if (!"undefined".equals(userId)) {
            bookings.add(Map.of(
                "id", 1,
                "userId", userId,
                "eventTitle", "Sample Movie",
                "bookingDate", "2025-01-10",
                "totalAmount", 200.0,
                "status", "CONFIRMED"
            ));
        }
        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Map<String, Object>> createBooking(@RequestBody Map<String, Object> bookingData) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Booking created successfully");
        response.put("id", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}