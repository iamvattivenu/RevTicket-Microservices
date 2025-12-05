package com.revtickets.util;

import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SeatLockManager {

    private final Map<String, Long> lockedSeats = new ConcurrentHashMap<>();
    private static final long LOCK_DURATION = 5 * 60 * 1000; // 5 minutes

    public boolean lockSeat(String seatKey) {
        Long lockTime = lockedSeats.get(seatKey);
        if (lockTime != null && System.currentTimeMillis() - lockTime < LOCK_DURATION) {
            return false;
        }
        lockedSeats.put(seatKey, System.currentTimeMillis());
        return true;
    }

    public void unlockSeat(String seatKey) {
        lockedSeats.remove(seatKey);
    }

    public boolean isSeatLocked(String seatKey) {
        Long lockTime = lockedSeats.get(seatKey);
        return lockTime != null && System.currentTimeMillis() - lockTime < LOCK_DURATION;
    }
}
