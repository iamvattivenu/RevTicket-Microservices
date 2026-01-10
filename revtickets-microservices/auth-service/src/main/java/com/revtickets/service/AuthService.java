package com.revtickets.service;

import com.revtickets.config.JwtTokenUtil;
import com.revtickets.dto.AuthRequest;
import com.revtickets.dto.SignupRequest;
import com.revtickets.exception.UnauthorizedException;
import com.revtickets.model.mysql.PasswordResetToken;
import com.revtickets.model.mysql.User;
import com.revtickets.repository.mysql.PasswordResetTokenRepository;
import com.revtickets.repository.mysql.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import java.util.Collections;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public Map<String, Object> login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (user.getIsBlocked() != null && user.getIsBlocked()) {
            throw new UnauthorizedException("Your account has been blocked. Please contact support.");
        }

        String token = jwtTokenUtil.generateToken(user.getEmail(), user.getRole().name());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }

    public Map<String, Object> signup(SignupRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists");
            }

            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhone(request.getPhone() != null ? request.getPhone() : "");
            user.setRole("admin@revtickets.com".equals(request.getEmail()) ? User.Role.ADMIN : User.Role.USER);
            user.setIsBlocked(false);

            user = userRepository.save(user);

            String token = jwtTokenUtil.generateToken(user.getEmail(), user.getRole().name());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Signup failed: " + e.getMessage());
        }
    }

    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String token = UUID.randomUUID().toString();
        
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        resetToken.setUsed(false);
        tokenRepository.save(resetToken);
        
        emailService.sendPasswordResetEmail(email, token);
    }

    public void resetPasswordWithToken(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));
        
        if (resetToken.getUsed()) {
            throw new RuntimeException("Reset token has already been used");
        }
        
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }
        
        User user = userRepository.findByEmail(resetToken.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
    }

    public Map<String, Object> googleLogin(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList("1027193563356-ta6hhmqco0f1tbk95ljr671754odkh1q.apps.googleusercontent.com"))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                User user = userRepository.findByEmail(email).orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                    newUser.setRole(User.Role.USER);
                    return userRepository.save(newUser);
                });

                if (user.getIsBlocked() != null && user.getIsBlocked()) {
                    throw new UnauthorizedException("Your account has been blocked. Please contact support.");
                }

                String token = jwtTokenUtil.generateToken(user.getEmail(), user.getRole().name());
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", user);
                return response;
            } else {
                throw new UnauthorizedException("Invalid Google token");
            }
        } catch (Exception e) {
            throw new UnauthorizedException("Google authentication failed: " + e.getMessage());
        }
    }
}
