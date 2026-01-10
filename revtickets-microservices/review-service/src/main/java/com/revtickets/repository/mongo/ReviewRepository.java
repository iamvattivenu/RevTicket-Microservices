package com.revtickets.repository.mongo;

import com.revtickets.model.mongo.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByEventId(Long eventId);
    List<Review> findByUserId(Long userId);
}
