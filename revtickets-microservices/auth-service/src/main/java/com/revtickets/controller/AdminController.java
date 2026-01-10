package com.revtickets.controller;

import com.revtickets.service.EventServiceClient;
import com.revtickets.service.UserService;
import com.revtickets.model.mysql.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private EventServiceClient eventServiceClient;

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<java.util.List<Map<String, Object>>> getAllUsers() {
        java.util.List<User> users = userService.getAllUsers();
        java.util.List<Map<String, Object>> userList = users.stream()
            .map(user -> {
                Map<String, Object> userMap = new java.util.HashMap<>();
                userMap.put("id", user.getId());
                userMap.put("email", user.getEmail());
                userMap.put("name", user.getName());
                userMap.put("phone", user.getPhone() != null ? user.getPhone() : "");
                userMap.put("role", user.getRole().name());
                userMap.put("isActive", !user.getIsBlocked());
                userMap.put("isBlocked", user.getIsBlocked());
                return userMap;
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(userList);
    }

    @PutMapping("/users/{id}/block")
    public ResponseEntity<Map<String, Object>> blockUser(@PathVariable Long id) {
        userService.blockUser(id);
        User user = userService.getUserById(id);
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "User blocked successfully");
        response.put("userId", id);
        response.put("isBlocked", user.getIsBlocked());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}/unblock")
    public ResponseEntity<Map<String, Object>> unblockUser(@PathVariable Long id) {
        userService.unblockUser(id);
        User user = userService.getUserById(id);
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "User unblocked successfully");
        response.put("userId", id);
        response.put("isBlocked", user.getIsBlocked());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Map<String, Object>> updateEvent(@PathVariable Long id, @RequestBody Map<String, Object> eventData) {
        try {
            Map<String, Object> result = eventServiceClient.updateEvent(id, eventData);
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("message", "Event updated successfully");
            response.put("id", id);
            response.put("event", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("error", "Failed to update event: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/events")
    public ResponseEntity<Map<String, Object>> createEvent(@RequestBody Map<String, Object> eventData) {
        try {
            Map<String, Object> result = eventServiceClient.createEvent(eventData);
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("message", "Event created successfully");
            response.put("id", result.get("id"));
            response.put("event", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("error", "Failed to create event: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Map<String, Object>> deleteEvent(@PathVariable Long id) {
        try {
            eventServiceClient.deleteEvent(id);
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("message", "Event deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("error", "Failed to delete event: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}