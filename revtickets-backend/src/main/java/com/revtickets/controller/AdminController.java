package com.revtickets.controller;

import com.revtickets.dto.AdminEventRequest;
import com.revtickets.model.mysql.Event;
import com.revtickets.model.mysql.Show;
import com.revtickets.model.mysql.User;
import com.revtickets.model.mysql.Venue;
import com.revtickets.service.EventService;
import com.revtickets.service.ReportService;
import com.revtickets.service.ShowService;
import com.revtickets.service.UserService;
import com.revtickets.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private EventService eventService;

    @Autowired
    private VenueService venueService;

    @Autowired
    private ShowService showService;

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserService userService;

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody AdminEventRequest request) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody AdminEventRequest request) {
        return ResponseEntity.ok(eventService.updateEvent(id, request));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/venues")
    public ResponseEntity<Venue> createVenue(@RequestBody Venue venue) {
        return ResponseEntity.ok(venueService.createVenue(venue));
    }

    @PostMapping("/shows")
    public ResponseEntity<Show> createShow(@RequestBody Show show) {
        return ResponseEntity.ok(showService.createShow(show));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(reportService.getAdminAnalytics());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/users/{id}/block")
    public ResponseEntity<Void> blockUser(@PathVariable Long id) {
        userService.blockUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}/unblock")
    public ResponseEntity<Void> unblockUser(@PathVariable Long id) {
        userService.unblockUser(id);
        return ResponseEntity.ok().build();
    }
}
