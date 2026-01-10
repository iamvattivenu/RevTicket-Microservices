package com.revtickets.service;

import com.revtickets.dto.ReviewRequest;
import com.revtickets.model.mongo.Review;
import com.revtickets.repository.mongo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(ReviewRequest request) {
        Review review = new Review();
        review.setEventId(request.getEventId());
        review.setEventName("Event-" + request.getEventId());
        review.setUserId(request.getUserId());
        review.setUserName("User-" + request.getUserId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByEventId(Long eventId) {
        return reviewRepository.findByEventId(eventId);
    }

    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public Double getAverageRatingByEventId(Long eventId) {
        List<Review> reviews = reviewRepository.findByEventId(eventId);
        if (reviews.isEmpty()) return 0.0;
        double avgRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
        return Math.round(avgRating * 100.0) / 100.0;
    }
}
