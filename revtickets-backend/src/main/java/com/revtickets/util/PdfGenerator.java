package com.revtickets.util;

import org.springframework.stereotype.Component;

@Component
public class PdfGenerator {

    public String generateTicketPdf(String ticketNumber, String eventDetails) {
        // PDF generation logic
        return "/static/tickets/" + ticketNumber + ".pdf";
    }
}
