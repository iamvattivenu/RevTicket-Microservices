package com.revtickets.repository.mysql;

import com.revtickets.model.mysql.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByIsActiveTrue();
    List<Event> findByCategoryAndIsActiveTrue(Event.Category category);
    @Query("SELECT e FROM Event e WHERE e.isActive = true AND (e.title LIKE %?1% OR e.description LIKE %?1%)")
    List<Event> searchEvents(String query);
}
