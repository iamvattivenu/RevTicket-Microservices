package com.revtickets.repository.mysql;

import com.revtickets.model.mysql.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByTicketNumber(String ticketNumber);
    Optional<Ticket> findByBookingId(Long bookingId);
}
