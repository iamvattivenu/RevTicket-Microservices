package com.revtickets.service;

import com.revtickets.model.mysql.Seat;
import com.revtickets.repository.mysql.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<Seat> getSeatsByShowId(Long showId) {
        return seatRepository.findByShowId(showId);
    }

    public List<Seat> generateSeats(Long showId, int totalSeats) {
        List<Seat> seats = new ArrayList<>();
        String[] rows = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"};
        int seatsPerRow = 11;
        int seatCount = 0;
        
        for (int r = 0; r < rows.length && seatCount < totalSeats; r++) {
            String seatType;
            if (r < 2) seatType = "Regular";
            else if (r < 8) seatType = "Silver";
            else if (r < 13) seatType = "Gold";
            else seatType = "Premium";
            
            for (int s = 1; s <= seatsPerRow && seatCount < totalSeats; s++) {
                Seat seat = new Seat();
                seat.setShowId(showId);
                seat.setSeatNumber(rows[r] + s);
                seat.setSeatType(seatType);
                seat.setStatus(Seat.SeatStatus.AVAILABLE);
                seats.add(seatRepository.save(seat));
                seatCount++;
            }
        }
        return seats;
    }
}
