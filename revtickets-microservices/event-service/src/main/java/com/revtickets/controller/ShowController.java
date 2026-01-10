package com.revtickets.controller;

import com.revtickets.model.mysql.Show;
import com.revtickets.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    @GetMapping
    public ResponseEntity<List<Show>> getAllShows() {
        return ResponseEntity.ok(showService.getAllShows());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Show> getShowById(@PathVariable Long id) {
        return ResponseEntity.ok(showService.getShowById(id));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Show>> getShowsByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(showService.getShowsByEventId(eventId));
    }

    @GetMapping("/venue/{venueId}")
    public ResponseEntity<List<Show>> getShowsByVenueId(@PathVariable Long venueId) {
        return ResponseEntity.ok(showService.getShowsByVenueId(venueId));
    }

    @PostMapping
    public ResponseEntity<Show> createShow(@RequestBody Show show) {
        return ResponseEntity.ok(showService.createShow(show));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return ResponseEntity.ok().build();
    }
}
