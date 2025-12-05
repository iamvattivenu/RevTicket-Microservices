package com.revtickets.service;

import com.revtickets.dto.TicketResponse;
import com.revtickets.exception.ResourceNotFoundException;
import com.revtickets.mapper.TicketMapper;
import com.revtickets.model.mysql.Booking;
import com.revtickets.model.mysql.Ticket;
import com.revtickets.repository.mysql.TicketRepository;
import com.revtickets.util.PdfGenerator;
import com.revtickets.util.QRCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private QRCodeGenerator qrCodeGenerator;

    @Autowired
    private PdfGenerator pdfGenerator;

    @Autowired
    private TicketMapper ticketMapper;

    public Ticket generateTicket(Booking booking) {
        try {
            Ticket ticket = new Ticket();
            ticket.setTicketNumber("TKT-" + UUID.randomUUID().toString());
            ticket.setBooking(booking);
            
            String qrCode = qrCodeGenerator.generateQRCode(ticket.getTicketNumber());
            ticket.setQrCode(qrCode);
            
            return ticketRepository.save(ticket);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate ticket", e);
        }
    }

    public TicketResponse getTicketByBookingId(Long bookingId) {
        Ticket ticket = ticketRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        return ticketMapper.toResponse(ticket);
    }

    public TicketResponse getTicketByNumber(String ticketNumber) {
        Ticket ticket = ticketRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        return ticketMapper.toResponse(ticket);
    }
}
