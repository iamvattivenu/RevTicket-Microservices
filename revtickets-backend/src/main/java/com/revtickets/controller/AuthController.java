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
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
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
}
