package com.revtickets.service;

import com.revtickets.dto.ReviewRequest;
import com.revtickets.model.mongo.Review;
import com.revtickets.model.mysql.User;
import com.revtickets.repository.mongo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserService userService;

    public Review createReview(ReviewRequest request) {
        User user = userService.getUserById(request.getUserId());
        
        Review review = new Review();
        review.setEventId(request.getEventId());
        review.setUserId(request.getUserId());
        review.setUserName(user.getName());
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
}
