package com.revtickets.repository.mysql;

import com.revtickets.model.mysql.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByCity(String city);
    List<Venue> findByIsActiveTrue();
}
