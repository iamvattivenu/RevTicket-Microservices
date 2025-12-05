package com.revtickets.service;

import com.revtickets.repository.mysql.BookingRepository;
import com.revtickets.repository.mysql.EventRepository;
import com.revtickets.repository.mysql.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> getAdminAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalBookings", bookingRepository.count());
        analytics.put("totalEvents", eventRepository.count());
        analytics.put("totalUsers", userRepository.count());
        return analytics;
    }
}
