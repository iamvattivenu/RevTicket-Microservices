package com.revtickets.service;

import com.revtickets.model.mysql.Event;
import com.revtickets.repository.mysql.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Map<String, Object> eventData) {
        Event event = new Event();
        event.setTitle((String) eventData.get("title"));
        event.setCategory(Event.Category.valueOf(((String) eventData.get("category")).toUpperCase()));
        event.setLanguage((String) eventData.get("language"));
        event.setGenreOrType((String) eventData.get("genreOrType"));
        event.setDescription((String) eventData.get("description"));
        event.setCity((String) eventData.get("city"));
        event.setVenue((String) eventData.get("venue"));
        event.setPosterUrl((String) eventData.get("posterUrl"));
        
        if (eventData.get("rating") != null) {
            event.setRating(Double.valueOf(eventData.get("rating").toString()));
        }
        if (eventData.get("price") != null) {
            event.setPrice(Double.valueOf(eventData.get("price").toString()));
        }
        if (eventData.get("durationMinutes") != null) {
            event.setDurationMinutes(Integer.valueOf(eventData.get("durationMinutes").toString()));
        }
        
        event.setDateTime(LocalDateTime.now());
        event.setIsActive(true);
        
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Map<String, Object> eventData) {
        Event event = eventRepository.findById(id).orElseThrow();
        
        if (eventData.get("title") != null) {
            event.setTitle((String) eventData.get("title"));
        }
        if (eventData.get("category") != null) {
            event.setCategory(Event.Category.valueOf(((String) eventData.get("category")).toUpperCase()));
        }
        if (eventData.get("language") != null) {
            event.setLanguage((String) eventData.get("language"));
        }
        if (eventData.get("genreOrType") != null) {
            event.setGenreOrType((String) eventData.get("genreOrType"));
        }
        if (eventData.get("description") != null) {
            event.setDescription((String) eventData.get("description"));
        }
        if (eventData.get("city") != null) {
            event.setCity((String) eventData.get("city"));
        }
        if (eventData.get("venue") != null) {
            event.setVenue((String) eventData.get("venue"));
        }
        if (eventData.get("posterUrl") != null) {
            event.setPosterUrl((String) eventData.get("posterUrl"));
        }
        if (eventData.get("rating") != null) {
            event.setRating(Double.valueOf(eventData.get("rating").toString()));
        }
        if (eventData.get("price") != null) {
            event.setPrice(Double.valueOf(eventData.get("price").toString()));
        }
        if (eventData.get("durationMinutes") != null) {
            event.setDurationMinutes(Integer.valueOf(eventData.get("durationMinutes").toString()));
        }
        
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}