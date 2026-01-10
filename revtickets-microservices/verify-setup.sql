-- ============================================
-- Verify Microservices Database Setup
-- ============================================

-- Check Auth Database
SELECT 'AUTH DATABASE' as 'Checking';
USE revtickets_auth;
SELECT 'Users' as 'Table', COUNT(*) as 'Records' FROM users
UNION ALL
SELECT 'Password Reset Tokens', COUNT(*) FROM password_reset_tokens;

-- Check Events Database
SELECT 'EVENTS DATABASE' as 'Checking';
USE revtickets_events;
SELECT 'Venues' as 'Table', COUNT(*) as 'Records' FROM venues
UNION ALL
SELECT 'Events', COUNT(*) FROM events
UNION ALL
SELECT 'Shows', COUNT(*) FROM shows;

-- Check Booking Database
SELECT 'BOOKING DATABASE' as 'Checking';
USE revtickets_booking;
SELECT 'Bookings' as 'Table', COUNT(*) as 'Records' FROM bookings
UNION ALL
SELECT 'Seats', COUNT(*) FROM seats
UNION ALL
SELECT 'Tickets', COUNT(*) FROM tickets;

-- Check Payment Database
SELECT 'PAYMENT DATABASE' as 'Checking';
USE revtickets_payments;
SELECT 'Payments' as 'Table', COUNT(*) as 'Records' FROM payments;
