package com.revtickets.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class ShowController {

    @PostMapping("/shows")
    public ResponseEntity<Map<String, Object>> createShow(@RequestBody Map<String, Object> showData) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Show created successfully");
        response.put("id", System.currentTimeMillis());
        response.put("show", showData);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/shows/event/{eventId}")
    public ResponseEntity<java.util.List<Map<String, Object>>> getShowsForEvent(@PathVariable Long eventId) {
        java.util.List<Map<String, Object>> shows = new java.util.ArrayList<>();
        shows.add(Map.of(
            "id", 1,
            "eventId", eventId,
            "showTime", "2025-01-15T18:00:00",
            "availableSeats", 100
        ));
        return ResponseEntity.ok(shows);
    }

    @GetMapping("/seats/show/{showId}")
    public ResponseEntity<java.util.List<Map<String, Object>>> getSeatsForShow(@PathVariable Long showId) {
        java.util.List<Map<String, Object>> seats = new java.util.ArrayList<>();
        for (int i = 1; i <= 50; i++) {
            seats.add(Map.of(
                "id", i,
                "seatNumber", "A" + i,
                "showId", showId,
                "status", i <= 5 ? "BOOKED" : "AVAILABLE",
                "seatType", "REGULAR"
            ));
        }
        return ResponseEntity.ok(seats);
    }

    @PutMapping("/seats/{seatId}")
    public ResponseEntity<Map<String, Object>> updateSeatStatus(@PathVariable Long seatId, @RequestBody Map<String, Object> seatData) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Seat status updated successfully");
        response.put("seatId", seatId);
        response.put("status", seatData.get("status"));
        return ResponseEntity.ok(response);
    }
}