package com.revtickets.controller;

import com.revtickets.dto.AdminEventRequest;
import com.revtickets.model.mysql.Event;
import com.revtickets.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/api/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/api/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping("/api/events/category/{category}")
    public ResponseEntity<List<Event>> getEventsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(eventService.getEventsByCategory(category));
    }

    @GetMapping("/api/events/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String q) {
        return ResponseEntity.ok(eventService.searchEvents(q));
    }

    @PostMapping("/api/events")
    public ResponseEntity<Event> createEvent(@RequestBody Map<String, Object> eventData) {
        Event event = new Event();
        event.setTitle((String) eventData.get("title"));
        event.setCategory(Event.Category.valueOf(((String) eventData.get("category")).toUpperCase()));
        event.setDescription((String) eventData.get("description"));
        event.setLanguage((String) eventData.getOrDefault("language", "English"));
        event.setGenreOrType((String) eventData.getOrDefault("genreOrType", "General"));
        event.setCity((String) eventData.getOrDefault("city", "Hyderabad"));
        event.setVenue((String) eventData.getOrDefault("venue", "PVR"));
        event.setDurationMinutes((Integer) eventData.getOrDefault("durationMinutes", 120));
        event.setPosterUrl((String) eventData.getOrDefault("posterUrl", ""));
        event.setRating(eventData.get("rating") != null ? ((Number) eventData.get("rating")).doubleValue() : 0.0);
        event.setPrice(eventData.get("price") != null ? ((Number) eventData.get("price")).doubleValue() : 200.0);
        event.setIsActive(true);
        
        Event savedEvent = eventService.createEvent(event);
        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/api/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Map<String, Object> eventData) {
        Event existingEvent = eventService.getEventById(id);
        
        if (eventData.get("title") != null) existingEvent.setTitle((String) eventData.get("title"));
        if (eventData.get("description") != null) existingEvent.setDescription((String) eventData.get("description"));
        if (eventData.get("rating") != null) existingEvent.setRating(((Number) eventData.get("rating")).doubleValue());
        if (eventData.get("price") != null) existingEvent.setPrice(((Number) eventData.get("price")).doubleValue());
        
        Event updatedEvent = eventService.updateEvent(existingEvent);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/api/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }
}
