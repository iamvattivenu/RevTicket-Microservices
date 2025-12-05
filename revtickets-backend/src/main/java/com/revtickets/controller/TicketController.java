package com.revtickets.controller;

import com.revtickets.dto.TicketResponse;
import com.revtickets.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<TicketResponse> getTicketByBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(ticketService.getTicketByBookingId(bookingId));
    }

    @GetMapping("/{ticketNumber}")
    public ResponseEntity<TicketResponse> getTicketByNumber(@PathVariable String ticketNumber) {
        return ResponseEntity.ok(ticketService.getTicketByNumber(ticketNumber));
    }
}
