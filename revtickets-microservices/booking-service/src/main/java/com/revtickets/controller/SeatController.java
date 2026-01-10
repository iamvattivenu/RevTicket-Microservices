package com.revtickets.controller;

import com.revtickets.model.mysql.Seat;
import com.revtickets.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @GetMapping("/show/{showId}")
    public ResponseEntity<List<Seat>> getSeatsByShowId(@PathVariable Long showId) {
        return ResponseEntity.ok(seatService.getSeatsByShowId(showId));
    }

    @PostMapping("/generate")
    public ResponseEntity<List<Seat>> generateSeats(@RequestParam Long showId, @RequestParam int totalSeats) {
        return ResponseEntity.ok(seatService.generateSeats(showId, totalSeats));
    }
}
