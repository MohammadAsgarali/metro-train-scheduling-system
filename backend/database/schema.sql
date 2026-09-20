-- ============================================
-- Delhi Metro Fleet System - Database Schema
-- Matches fields already used in stations.js, trains.js,
-- routes.js, schedule.html, reports.html of the frontend.
-- ============================================

CREATE DATABASE IF NOT EXISTS metro_fleet_db;
USE metro_fleet_db;

-- 1. USER (for login)
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'ADMIN'
);

-- 2. STATION
CREATE TABLE IF NOT EXISTS station (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    station_code VARCHAR(10) NOT NULL UNIQUE,   -- e.g. DM-001
    station_name VARCHAR(100) NOT NULL,
    line VARCHAR(30) NOT NULL,                  -- e.g. Blue Line
    zone VARCHAR(50),
    platforms INT DEFAULT 2,
    status VARCHAR(20) DEFAULT 'Operational'    -- Operational / Maintenance / Closed
);

-- 3. ROUTE (a metro line)
CREATE TABLE IF NOT EXISTS route (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    line_key VARCHAR(20) NOT NULL UNIQUE,       -- Blue, Red, Yellow, Green, Violet
    line_name VARCHAR(50) NOT NULL,             -- Blue Line
    total_stations INT,
    distance_km DOUBLE,
    start_station VARCHAR(100),
    end_station VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Operational'
);

-- 4. ROUTE_STATION (ordered stations on a route/line)
CREATE TABLE IF NOT EXISTS route_station (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    route_id BIGINT NOT NULL,
    station_name VARCHAR(100) NOT NULL,
    sequence_no INT NOT NULL,
    FOREIGN KEY (route_id) REFERENCES route(id) ON DELETE CASCADE
);

-- 5. TRAIN
CREATE TABLE IF NOT EXISTS train (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    train_number VARCHAR(20) NOT NULL UNIQUE,   -- e.g. DMRC101
    line VARCHAR(30) NOT NULL,
    type VARCHAR(20),                           -- e.g. 6 Coach
    capacity INT,
    current_station VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Running'        -- Running / Standby / Maintenance / Inactive
);

-- 6. SCHEDULE
CREATE TABLE IF NOT EXISTS schedule (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    train_number VARCHAR(20) NOT NULL,
    line VARCHAR(30) NOT NULL,
    from_station VARCHAR(100),
    to_station VARCHAR(100),
    departure_time VARCHAR(20),
    arrival_time VARCHAR(20),
    platform INT,
    status VARCHAR(20) DEFAULT 'Scheduled',     -- On Time / Delayed / Scheduled
    schedule_date DATE
);

-- 7. PLANNING (train induction planning)
CREATE TABLE IF NOT EXISTS planning (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    train_number VARCHAR(20) NOT NULL,
    line VARCHAR(30) NOT NULL,
    planned_date DATE,
    status VARCHAR(30) DEFAULT 'PENDING',       -- PENDING / APPROVED / IN_SERVICE / STANDBY
    remarks VARCHAR(255)
);

-- 8. REPORT
CREATE TABLE IF NOT EXISTS report (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    report_type VARCHAR(100) NOT NULL,
    report_date DATE,
    content TEXT,
    generated_by BIGINT,
    FOREIGN KEY (generated_by) REFERENCES user(id)
);
