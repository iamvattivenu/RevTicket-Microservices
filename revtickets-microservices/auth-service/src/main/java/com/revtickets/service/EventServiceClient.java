package com.revtickets.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import java.util.Map;

@Service
public class EventServiceClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String EVENT_SERVICE_URL = "http://localhost:8082";

    public Map<String, Object> createEvent(Map<String, Object> eventData) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(eventData, headers);
        
        return restTemplate.postForObject(EVENT_SERVICE_URL + "/api/events", request, Map.class);
    }

    public Map<String, Object> updateEvent(Long id, Map<String, Object> eventData) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(eventData, headers);
        
        return restTemplate.exchange(EVENT_SERVICE_URL + "/api/events/" + id, HttpMethod.PUT, request, Map.class).getBody();
    }

    public void deleteEvent(Long id) {
        restTemplate.delete(EVENT_SERVICE_URL + "/api/events/" + id);
    }
}