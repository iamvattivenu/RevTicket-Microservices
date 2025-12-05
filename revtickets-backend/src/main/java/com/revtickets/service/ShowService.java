package com.revtickets.service;

import com.revtickets.exception.ResourceNotFoundException;
import com.revtickets.model.mysql.Show;
import com.revtickets.repository.mysql.ShowRepository;
import com.revtickets.repository.mysql.SeatRepository;
import com.revtickets.repository.mysql.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public Show getShowById(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found"));
    }

    public List<Show> getShowsByEventId(Long eventId) {
        return showRepository.findByEventId(eventId);
    }

    public List<Show> getShowsByVenueId(Long venueId) {
        return showRepository.findByVenueId(venueId);
    }

    public Show createShow(Show show) {
        return showRepository.save(show);
    }

    @Transactional
    public void deleteShow(Long id) {
        bookingRepository.deleteByShowId(id);
        seatRepository.deleteByShowId(id);
        showRepository.deleteById(id);
    }
}
