package com.revtickets.repository.mysql;

import com.revtickets.model.mysql.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByShowId(Long showId);
    List<Seat> findByShowIdAndStatus(Long showId, Seat.SeatStatus status);
    void deleteByShowId(Long showId);
}
