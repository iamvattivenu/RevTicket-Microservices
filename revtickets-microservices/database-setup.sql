-- ============================================
-- RevTickets Microservices Database Setup
-- ============================================

-- Create separate databases for each microservice
CREATE DATABASE IF NOT EXISTS revtickets_auth;
CREATE DATABASE IF NOT EXISTS revtickets_events;
CREATE DATABASE IF NOT EXISTS revtickets_booking;
CREATE DATABASE IF NOT EXISTS revtickets_payments;

-- ============================================
-- 1. AUTH SERVICE DATABASE
-- ============================================
USE revtickets_auth;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(255) DEFAULT NULL,
  role ENUM('USER','ADMIN') DEFAULT NULL,
  is_blocked BIT(1) DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY UK_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  expiry_date DATETIME(6) NOT NULL,
  token VARCHAR(255) NOT NULL,
  used BIT(1) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- 2. EVENTS SERVICE DATABASE
-- ============================================
USE revtickets_events;

-- Venues table
CREATE TABLE IF NOT EXISTS venues (
  id BIGINT NOT NULL AUTO_INCREMENT,
  address VARCHAR(255) DEFAULT NULL,
  city VARCHAR(255) NOT NULL,
  is_active BIT(1) DEFAULT 1,
  name VARCHAR(255) NOT NULL,
  total_seats INT DEFAULT NULL,
  type VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id BIGINT NOT NULL AUTO_INCREMENT,
  category ENUM('MOVIES','CONCERTS','SPORTS','COMEDY') DEFAULT NULL,
  city VARCHAR(255) DEFAULT NULL,
  date_time DATETIME(6) DEFAULT NULL,
  description VARCHAR(1000) DEFAULT NULL,
  duration_minutes INT DEFAULT NULL,
  genre_or_type VARCHAR(255) DEFAULT NULL,
  is_active BIT(1) DEFAULT 1,
  language VARCHAR(255) DEFAULT NULL,
  poster_url VARCHAR(255) DEFAULT NULL,
  price DOUBLE DEFAULT NULL,
  rating DOUBLE DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  venue VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Shows table
CREATE TABLE IF NOT EXISTS shows (
  id BIGINT NOT NULL AUTO_INCREMENT,
  available_seats INT DEFAULT NULL,
  is_active BIT(1) DEFAULT 1,
  show_time DATETIME(6) NOT NULL,
  event_id BIGINT NOT NULL,
  venue_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY FK_event (event_id),
  KEY FK_venue (venue_id),
  CONSTRAINT FK_show_event FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT FK_show_venue FOREIGN KEY (venue_id) REFERENCES venues (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- 3. BOOKING SERVICE DATABASE
-- ============================================
USE revtickets_booking;

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT NOT NULL AUTO_INCREMENT,
  booking_date DATETIME(6) NOT NULL,
  number_of_seats INT NOT NULL,
  payment_id VARCHAR(255) DEFAULT NULL,
  seat_numbers VARCHAR(255) NOT NULL,
  status ENUM('PENDING','CONFIRMED','CANCELLED') NOT NULL,
  total_amount DOUBLE NOT NULL,
  show_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Seats table
CREATE TABLE IF NOT EXISTS seats (
  id BIGINT NOT NULL AUTO_INCREMENT,
  seat_number VARCHAR(255) NOT NULL,
  seat_type VARCHAR(255) NOT NULL,
  status ENUM('AVAILABLE','BOOKED','BLOCKED') NOT NULL,
  booking_id BIGINT DEFAULT NULL,
  show_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  KEY FK_seat_booking (booking_id),
  CONSTRAINT FK_seat_booking FOREIGN KEY (booking_id) REFERENCES bookings (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id BIGINT NOT NULL AUTO_INCREMENT,
  generated_at DATETIME(6) NOT NULL,
  pdf_url VARCHAR(255) DEFAULT NULL,
  qr_code VARCHAR(255) DEFAULT NULL,
  ticket_number VARCHAR(255) NOT NULL,
  booking_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_ticket_number (ticket_number),
  KEY FK_ticket_booking (booking_id),
  CONSTRAINT FK_ticket_booking FOREIGN KEY (booking_id) REFERENCES bookings (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================
-- 4. PAYMENT SERVICE DATABASE
-- ============================================
USE revtickets_payments;

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id BIGINT NOT NULL AUTO_INCREMENT,
  amount DOUBLE NOT NULL,
  booking_id BIGINT NOT NULL,
  method ENUM('CREDIT_CARD','DEBIT_CARD','UPI','NET_BANKING','WALLET') DEFAULT NULL,
  payment_date DATETIME(6) NOT NULL,
  payment_id VARCHAR(255) NOT NULL,
  status ENUM('PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UK_payment_id (payment_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
