package com.revtickets.service;

import com.revtickets.dto.AdminEventRequest;
import com.revtickets.exception.ResourceNotFoundException;
import com.revtickets.mapper.EventMapper;
import com.revtickets.model.mysql.Event;
import com.revtickets.repository.mysql.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventMapper eventMapper;

    public List<Event> getAllEvents() {
        return eventRepository.findByIsActiveTrue();
    }

    public List<Event> getEventsByCategory(String category) {
        Event.Category cat = Event.Category.valueOf(category.toUpperCase());
        return eventRepository.findByCategoryAndIsActiveTrue(cat);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    public List<Event> searchEvents(String query) {
        return eventRepository.searchEvents(query);
    }

    public Event createEvent(AdminEventRequest request) {
        Event event = eventMapper.toEntity(request);
        event.setIsActive(true);
        return eventRepository.save(event);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, AdminEventRequest request) {
        Event event = getEventById(id);
        event.setTitle(request.getTitle());
        event.setCategory(Event.Category.valueOf(request.getCategory().toUpperCase()));
        event.setLanguage(request.getLanguage());
        event.setGenreOrType(request.getGenreOrType());
        event.setDescription(request.getDescription());
        event.setCity(request.getCity());
        event.setVenue(request.getVenue());
        event.setDurationMinutes(request.getDurationMinutes());
        event.setPosterUrl(request.getPosterUrl());
        event.setRating(request.getRating());
        event.setPrice(request.getPrice());
        if (request.getIsActive() != null) {
            event.setIsActive(request.getIsActive());
        }
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        event.setIsActive(false);
        eventRepository.save(event);
    }

    public int restoreAllEvents() {
        return eventRepository.restoreAllEvents();
    }
}
