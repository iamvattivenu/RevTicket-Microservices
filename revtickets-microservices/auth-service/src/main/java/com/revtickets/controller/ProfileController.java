package com.revtickets.controller;

import com.revtickets.service.UserService;
import com.revtickets.model.mysql.User;
import com.revtickets.config.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
public class ProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@RequestHeader(value = "Authorization", required = false) String token) {
        String email = extractEmailFromToken(token);
        User user = userService.getUserByEmail(email);
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId().toString());
        response.put("email", user.getEmail());
        response.put("name", user.getName());
        response.put("phone", user.getPhone() != null ? user.getPhone() : "");
        response.put("role", user.getRole().name());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId().toString());
        response.put("email", user.getEmail());
        response.put("name", user.getName());
        response.put("phone", user.getPhone() != null ? user.getPhone() : "");
        response.put("role", user.getRole().name());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/email")
    public ResponseEntity<String> getUserEmail(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user.getEmail());
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @RequestHeader(value = "Authorization", required = false) String token, 
            @RequestBody Map<String, String> profileData) {
        try {
            String email = profileData.get("email");
            if (email == null || email.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Email is required");
                return ResponseEntity.status(400).body(error);
            }
            
            User user = userService.getUserByEmail(email);
            user.setName(profileData.get("name"));
            user.setPhone(profileData.get("phone"));
            
            User updatedUser = userService.updateUserProfile(email, user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedUser.getId().toString());
            response.put("email", updatedUser.getEmail());
            response.put("name", updatedUser.getName());
            response.put("phone", updatedUser.getPhone() != null ? updatedUser.getPhone() : "");
            response.put("role", updatedUser.getRole().name());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    private String extractEmailFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtTokenUtil.extractEmail(token);
    }
}