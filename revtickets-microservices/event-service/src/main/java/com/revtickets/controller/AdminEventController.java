package com.revtickets.controller;

import com.revtickets.dto.AdminEventRequest;
import com.revtickets.model.mysql.Event;
import com.revtickets.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        event.setIsActive(true);
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event existing = eventService.getEventById(id);
        if (event.getTitle() != null) existing.setTitle(event.getTitle());
        if (event.getDescription() != null) existing.setDescription(event.getDescription());
        if (event.getCategory() != null) existing.setCategory(event.getCategory());
        if (event.getLanguage() != null) existing.setLanguage(event.getLanguage());
        if (event.getGenreOrType() != null) existing.setGenreOrType(event.getGenreOrType());
        if (event.getCity() != null) existing.setCity(event.getCity());
        if (event.getVenue() != null) existing.setVenue(event.getVenue());
        if (event.getDurationMinutes() != null) existing.setDurationMinutes(event.getDurationMinutes());
        if (event.getPosterUrl() != null) existing.setPosterUrl(event.getPosterUrl());
        if (event.getRating() != null) existing.setRating(event.getRating());
        if (event.getPrice() != null) existing.setPrice(event.getPrice());
        if (event.getIsActive() != null) existing.setIsActive(event.getIsActive());
        return ResponseEntity.ok(eventService.updateEvent(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/restore-all")
    public ResponseEntity<String> restoreAllEvents() {
        int count = eventService.restoreAllEvents();
        return ResponseEntity.ok("Restored " + count + " events");
    }
}
