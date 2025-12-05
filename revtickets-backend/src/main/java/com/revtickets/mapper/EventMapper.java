package com.revtickets.mapper;

import com.revtickets.dto.AdminEventRequest;
import com.revtickets.model.mysql.Event;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class EventMapper {

    public Event toEntity(AdminEventRequest dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setCategory(Event.Category.valueOf(dto.getCategory().toUpperCase()));
        event.setLanguage(dto.getLanguage());
        event.setGenreOrType(dto.getGenreOrType());
        event.setDescription(dto.getDescription());
        event.setCity(dto.getCity());
        event.setVenue(dto.getVenue());
        event.setDurationMinutes(dto.getDurationMinutes());
        event.setPosterUrl(dto.getPosterUrl());
        event.setRating(dto.getRating());
        event.setPrice(dto.getPrice());
        event.setDateTime(LocalDateTime.now());
        return event;
    }
}
