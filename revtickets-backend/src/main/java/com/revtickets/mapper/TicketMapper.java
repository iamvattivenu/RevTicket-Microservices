package com.revtickets.mapper;

import com.revtickets.dto.TicketResponse;
import com.revtickets.model.mysql.Ticket;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {

    public TicketResponse toResponse(Ticket ticket) {
        TicketResponse response = new TicketResponse();
        response.setTicketNumber(ticket.getTicketNumber());
        response.setEventTitle(ticket.getBooking().getShow().getEvent().getTitle());
        response.setVenueName(ticket.getBooking().getShow().getVenue().getName());
        response.setShowTime(ticket.getBooking().getShow().getShowTime());
        response.setSeatNumbers(ticket.getBooking().getSeatNumbers());
        response.setQrCode(ticket.getQrCode());
        return response;
    }
}
