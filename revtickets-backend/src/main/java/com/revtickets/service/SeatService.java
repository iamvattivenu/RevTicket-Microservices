package com.revtickets.service;

import com.revtickets.exception.SeatUnavailableException;
import com.revtickets.model.mysql.Seat;
import com.revtickets.model.mysql.Show;
import com.revtickets.repository.mysql.SeatRepository;
import com.revtickets.util.SeatLockManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private SeatLockManager seatLockManager;

    public List<Seat> getSeatsByShowId(Long showId) {
        return seatRepository.findByShowId(showId);
    }

    public List<Seat> getAvailableSeats(Long showId) {
        return seatRepository.findByShowIdAndStatus(showId, Seat.SeatStatus.AVAILABLE);
    }

    public void generateSeatsForShow(Long showId, int totalSeats) {
        Show show = new Show();
        show.setId(showId);
        generateSeatsForShow(show, totalSeats);
    }

    @Transactional
    public void generateSeatsForShow(Show show, int totalSeats) {
        seatRepository.deleteByShowId(show.getId());
        
        List<Seat> seats = new ArrayList<>();
        String[] rows = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"};
        int seatsPerRow = (totalSeats + rows.length - 1) / rows.length;

        int seatCount = 0;
        for (int r = 0; r < rows.length && seatCount < totalSeats; r++) {
            String category;
            if (r < 2) category = "Regular"; // A, B
            else if (r < 8) category = "Silver"; // C, D, E, F, G, H
            else if (r < 13) category = "Gold"; // I, J, K, L, M
            else category = "Premium"; // N, O
            
            for (int i = 1; i <= seatsPerRow && seatCount < totalSeats; i++) {
                Seat seat = new Seat();
                seat.setShow(show);
                seat.setSeatNumber(rows[r] + i);
                seat.setSeatType(category);
                seat.setStatus(Seat.SeatStatus.AVAILABLE);
                seats.add(seat);
                seatCount++;
            }
        }
        seatRepository.saveAll(seats);
    }

    public boolean lockSeats(Long showId, List<String> seatNumbers) {
        for (String seatNumber : seatNumbers) {
            String seatKey = showId + "-" + seatNumber;
            if (!seatLockManager.lockSeat(seatKey)) {
                return false;
            }
        }
        return true;
    }

    public void unlockSeats(Long showId, List<String> seatNumbers) {
        for (String seatNumber : seatNumbers) {
            String seatKey = showId + "-" + seatNumber;
            seatLockManager.unlockSeat(seatKey);
        }
    }
}
