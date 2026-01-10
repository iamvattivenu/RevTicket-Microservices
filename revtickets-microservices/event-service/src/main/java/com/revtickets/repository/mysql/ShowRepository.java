package com.revtickets.repository.mysql;

import com.revtickets.model.mysql.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
    List<Show> findByEventId(Long eventId);
    List<Show> findByVenueId(Long venueId);
    List<Show> findByIsActiveTrue();
}
