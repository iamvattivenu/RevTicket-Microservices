-- ============================================
-- Data Migration from Monolithic to Microservices
-- ============================================

-- ============================================
-- 1. Migrate AUTH data
-- ============================================
USE revtickets_auth;

INSERT INTO users (id, email, name, password, phone, role, is_blocked)
SELECT id, email, name, password, phone, role, is_blocked
FROM revtickets.users
ON DUPLICATE KEY UPDATE
  email = VALUES(email),
  name = VALUES(name),
  password = VALUES(password),
  phone = VALUES(phone),
  role = VALUES(role),
  is_blocked = VALUES(is_blocked);

INSERT INTO password_reset_tokens (id, email, expiry_date, token, used)
SELECT id, email, expiry_date, token, used
FROM revtickets.password_reset_tokens
ON DUPLICATE KEY UPDATE
  email = VALUES(email),
  expiry_date = VALUES(expiry_date),
  token = VALUES(token),
  used = VALUES(used);

-- ============================================
-- 2. Migrate EVENTS data
-- ============================================
USE revtickets_events;

INSERT INTO venues (id, address, city, is_active, name, total_seats, type)
SELECT id, address, city, is_active, name, total_seats, type
FROM revtickets.venues
ON DUPLICATE KEY UPDATE
  address = VALUES(address),
  city = VALUES(city),
  is_active = VALUES(is_active),
  name = VALUES(name),
  total_seats = VALUES(total_seats),
  type = VALUES(type);

INSERT INTO events (id, category, city, date_time, description, duration_minutes, genre_or_type, is_active, language, poster_url, price, rating, title, venue)
SELECT id, category, city, date_time, description, duration_minutes, genre_or_type, is_active, language, poster_url, price, rating, title, venue
FROM revtickets.events
ON DUPLICATE KEY UPDATE
  category = VALUES(category),
  city = VALUES(city),
  date_time = VALUES(date_time),
  description = VALUES(description),
  duration_minutes = VALUES(duration_minutes),
  genre_or_type = VALUES(genre_or_type),
  is_active = VALUES(is_active),
  language = VALUES(language),
  poster_url = VALUES(poster_url),
  price = VALUES(price),
  rating = VALUES(rating),
  title = VALUES(title),
  venue = VALUES(venue);

INSERT INTO shows (id, available_seats, is_active, show_time, event_id, venue_id)
SELECT id, available_seats, is_active, show_time, event_id, venue_id
FROM revtickets.shows
ON DUPLICATE KEY UPDATE
  available_seats = VALUES(available_seats),
  is_active = VALUES(is_active),
  show_time = VALUES(show_time),
  event_id = VALUES(event_id),
  venue_id = VALUES(venue_id);

-- ============================================
-- 3. Migrate BOOKING data
-- ============================================
USE revtickets_booking;

INSERT INTO bookings (id, booking_date, number_of_seats, payment_id, seat_numbers, status, total_amount, show_id, user_id)
SELECT id, booking_date, number_of_seats, payment_id, seat_numbers, status, total_amount, show_id, user_id
FROM revtickets.bookings
ON DUPLICATE KEY UPDATE
  booking_date = VALUES(booking_date),
  number_of_seats = VALUES(number_of_seats),
  payment_id = VALUES(payment_id),
  seat_numbers = VALUES(seat_numbers),
  status = VALUES(status),
  total_amount = VALUES(total_amount),
  show_id = VALUES(show_id),
  user_id = VALUES(user_id);

INSERT INTO seats (id, seat_number, seat_type, status, booking_id, show_id)
SELECT id, seat_number, seat_type, status, booking_id, show_id
FROM revtickets.seats
ON DUPLICATE KEY UPDATE
  seat_number = VALUES(seat_number),
  seat_type = VALUES(seat_type),
  status = VALUES(status),
  booking_id = VALUES(booking_id),
  show_id = VALUES(show_id);

INSERT INTO tickets (id, generated_at, qr_code, ticket_number, booking_id)
SELECT id, generated_at, qr_code, ticket_number, booking_id
FROM revtickets.tickets
ON DUPLICATE KEY UPDATE
  generated_at = VALUES(generated_at),
  qr_code = VALUES(qr_code),
  ticket_number = VALUES(ticket_number),
  booking_id = VALUES(booking_id);

-- ============================================
-- 4. Migrate PAYMENT data
-- ============================================
USE revtickets_payments;

INSERT INTO payments (id, amount, booking_id, method, payment_date, payment_id, status)
SELECT id, amount, booking_id, method, payment_date, payment_id, status
FROM revtickets.payments
ON DUPLICATE KEY UPDATE
  amount = VALUES(amount),
  booking_id = VALUES(booking_id),
  method = VALUES(method),
  payment_date = VALUES(payment_date),
  payment_id = VALUES(payment_id),
  status = VALUES(status);
