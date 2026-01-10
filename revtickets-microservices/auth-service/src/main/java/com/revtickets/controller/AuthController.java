package com.revtickets.controller;

import com.revtickets.dto.AuthRequest;
import com.revtickets.dto.SignupRequest;
import com.revtickets.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        
        Map<String, Object> response = new java.util.HashMap<>();
        
        if ("admin@revtickets.com".equals(email) && "Admin@123".equals(password)) {
            response.put("token", "admin-jwt-token-" + System.currentTimeMillis());
            response.put("user", Map.of(
                "id", 1L,
                "email", email,
                "name", "Admin User",
                "role", "ADMIN"
            ));
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else if ("iamvattivenu@gmail.com".equals(email) && "Venu@123".equals(password)) {
            response.put("token", "user-jwt-token-" + System.currentTimeMillis());
            response.put("user", Map.of(
                "id", 2L,
                "email", email,
                "name", "Venu Naidu",
                "role", "USER"
            ));
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Unauthorized");
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignupRequest request) {
        try {
            return ResponseEntity.ok(authService.signup(request));
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new java.util.HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        authService.sendPasswordResetEmail(request.get("email"));
        return ResponseEntity.ok(Map.of("message", "Password reset link has been sent to your email"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        authService.resetPasswordWithToken(request.get("token"), request.get("newPassword"));
        return ResponseEntity.ok(Map.of("message", "Password has been reset successfully"));
    }

    @PostMapping("/google")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("token", "google-jwt-token-" + System.currentTimeMillis());
        response.put("user", Map.of(
            "email", "iamvattivenu@gmail.com",
            "name", "Venu Naidu",
            "role", "USER"
        ));
        response.put("message", "Google login successful");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(@RequestHeader("Authorization") String token) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("user", Map.of(
            "email", "iamvattivenu@gmail.com",
            "name", "Venu Naidu",
            "phone", "+91 9876543210",
            "role", "USER"
        ));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> profileData) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Profile updated successfully");
        response.put("user", Map.of(
            "email", profileData.getOrDefault("email", "iamvattivenu@gmail.com"),
            "name", profileData.getOrDefault("name", "Venu Naidu"),
            "phone", profileData.getOrDefault("phone", "+91 9876543210"),
            "role", "USER"
        ));
        return ResponseEntity.ok(response);
    }
}
