package com.revtickets.controller;

import com.revtickets.dto.ReviewRequest;
import com.revtickets.model.mongo.Review;
import com.revtickets.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Review>> getReviewsByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(reviewService.getReviewsByEventId(eventId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId));
    }

    @GetMapping("/event/{eventId}/rating")
    public ResponseEntity<Map<String, Double>> getAverageRating(@PathVariable Long eventId) {
        Double avgRating = reviewService.getAverageRatingByEventId(eventId);
        return ResponseEntity.ok(Map.of("averageRating", avgRating));
    }
}
