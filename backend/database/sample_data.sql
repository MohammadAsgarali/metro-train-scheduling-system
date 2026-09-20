USE metro_fleet_db;

-- USERS
INSERT INTO user (username, password, role) VALUES
('admin', 'admin123', 'ADMIN');

-- STATIONS
INSERT INTO station (station_code, station_name, line, zone, platforms, status) VALUES
('DM-001', 'Dwarka Sector 21', 'Blue Line', 'West Delhi', 2, 'Operational'),
('DM-002', 'Dwarka', 'Blue Line', 'West Delhi', 2, 'Operational'),
('DM-006', 'Janakpuri West', 'Blue Line', 'West Delhi', 2, 'Operational'),
('DM-009', 'Rajouri Garden', 'Blue Line', 'West Delhi', 4, 'Operational'),
('DM-011', 'Rithala', 'Red Line', 'North West Delhi', 2, 'Operational'),
('DM-012', 'Rohini West', 'Red Line', 'North West Delhi', 2, 'Operational'),
('DM-018', 'Shalimar Bagh', 'Red Line', 'North Delhi', 2, 'Operational'),
('DM-019', 'Samaypur Badli', 'Yellow Line', 'North Delhi', 2, 'Operational'),
('DM-023', 'Azadpur', 'Yellow Line', 'North Delhi', 4, 'Maintenance'),
('DM-027', 'Inderlok', 'Green Line', 'Central Delhi', 4, 'Operational'),
('DM-031', 'Madipur', 'Green Line', 'West Delhi', 2, 'Closed'),
('DM-035', 'Kashmere Gate', 'Violet Line', 'Central Delhi', 6, 'Operational'),
('DM-040', 'Central Secretariat', 'Violet Line', 'Central Delhi', 4, 'Closed');

-- ROUTES (LINES)
INSERT INTO route (line_key, line_name, total_stations, distance_km, start_station, end_station, status) VALUES
('Blue', 'Blue Line', 13, 22.8, 'Dwarka Sector 21', 'Noida City Centre', 'Operational'),
('Red', 'Red Line', 8, 21.6, 'Rithala', 'Shaheed Sthal', 'Operational'),
('Yellow', 'Yellow Line', 8, 21.2, 'Samaypur Badli', 'Huda City Centre', 'Operational'),
('Green', 'Green Line', 6, 16.5, 'Inderlok', 'Brigadier Hoshiar Singh', 'Operational'),
('Violet', 'Violet Line', 5, 13.4, 'Kashmere Gate', 'Raja Nahar Singh', 'Operational');

-- ROUTE_STATION (ordered stops per line)
INSERT INTO route_station (route_id, station_name, sequence_no) VALUES
(1, 'Dwarka Sector 21', 1), (1, 'Dwarka Sector 10', 2), (1, 'Dwarka', 3),
(1, 'Janakpuri West', 4), (1, 'Rajouri Garden', 5), (1, 'Karol Bagh', 6),
(1, 'Rajiv Chowk', 7), (1, 'Yamuna Bank', 8), (1, 'Akshardham', 9),
(1, 'Mayur Vihar', 10), (1, 'New Ashok Nagar', 11), (1, 'Noida Sector 15', 12),
(1, 'Noida City Centre', 13),

(2, 'Rithala', 1), (2, 'Rohini West', 2), (2, 'Pitampura', 3),
(2, 'Shalimar Bagh', 4), (2, 'Kashmere Gate', 5), (2, 'Welcome', 6),
(2, 'Dilshad Garden', 7), (2, 'Shaheed Sthal', 8),

(3, 'Samaypur Badli', 1), (3, 'Rohini Sector 18', 2), (3, 'Azadpur', 3),
(3, 'Vishwavidyalaya', 4), (3, 'Kashmere Gate', 5), (3, 'Chandni Chowk', 6),
(3, 'Rajiv Chowk', 7), (3, 'Huda City Centre', 8),

(4, 'Inderlok', 1), (4, 'Ashok Park Main', 2), (4, 'Punjabi Bagh', 3),
(4, 'Paschim Vihar', 4), (4, 'Mundka', 5), (4, 'Brigadier Hoshiar Singh', 6),

(5, 'Kashmere Gate', 1), (5, 'Lal Quila', 2), (5, 'Jama Masjid', 3),
(5, 'Central Secretariat', 4), (5, 'Raja Nahar Singh', 5);

-- TRAINS
INSERT INTO train (train_number, line, type, capacity, current_station, status) VALUES
('DMRC101', 'Blue Line', '6 Coach', 2280, 'Dwarka Sector 21', 'Running'),
('DMRC102', 'Blue Line', '6 Coach', 2280, 'Rajouri Garden', 'Running'),
('DMRC103', 'Red Line', '6 Coach', 2280, 'Rithala', 'Running'),
('DMRC104', 'Yellow Line', '6 Coach', 2280, 'Chandni Chowk', 'Running'),
('DMRC105', 'Yellow Line', '6 Coach', 2280, 'Depot', 'Maintenance'),
('DMRC106', 'Green Line', '4 Coach', 1520, 'Inderlok Depot', 'Standby'),
('DMRC107', 'Violet Line', '6 Coach', 2280, 'Kashmere Gate', 'Running'),
('DMRC108', 'Blue Line', '6 Coach', 2280, 'Yamuna Bank Depot', 'Standby'),
('DMRC109', 'Red Line', '6 Coach', 2280, 'Shastri Park Depot', 'Maintenance'),
('DMRC110', 'Green Line', '4 Coach', 1520, 'Inderlok', 'Running'),
('DMRC111', 'Yellow Line', '6 Coach', 2280, 'Hauz Khas', 'Running'),
('DMRC112', 'Violet Line', '6 Coach', 2280, 'Depot', 'Inactive');

-- SCHEDULE
INSERT INTO schedule (train_number, line, from_station, to_station, departure_time, arrival_time, platform, status, schedule_date) VALUES
('DMRC101', 'Blue Line', 'Dwarka Sec-21', 'Noida City Centre', '08:00 AM', '09:12 AM', 2, 'On Time', '2026-09-27'),
('DMRC102', 'Red Line', 'Rithala', 'Shaheed Sthal', '08:20 AM', '09:18 AM', 1, 'On Time', '2026-09-27'),
('DMRC103', 'Yellow Line', 'Samaypur Badli', 'Huda City Centre', '08:35 AM', '09:48 AM', 3, 'Delayed', '2026-09-27'),
('DMRC104', 'Green Line', 'Inderlok', 'Brigadier Hoshiar Singh', '09:00 AM', '09:42 AM', 2, 'On Time', '2026-09-27'),
('DMRC105', 'Violet Line', 'Kashmere Gate', 'Raja Nahar Singh', '09:30 AM', '10:31 AM', 1, 'Scheduled', '2026-09-27'),
('DMRC106', 'Blue Line', 'Vaishali', 'Dwarka Sec-21', '10:00 AM', '11:08 AM', 4, 'On Time', '2026-09-27'),
('DMRC107', 'Red Line', 'Shaheed Sthal', 'Rithala', '10:20 AM', '11:18 AM', 2, 'Delayed', '2026-09-27');

-- PLANNING (train induction planning)
INSERT INTO planning (train_number, line, planned_date, status, remarks) VALUES
('DMRC101', 'Blue Line', '2026-09-28', 'APPROVED', 'Morning peak induction'),
('DMRC105', 'Yellow Line', '2026-09-28', 'PENDING', 'Awaiting maintenance clearance'),
('DMRC106', 'Green Line', '2026-09-28', 'STANDBY', 'Reserve for evening peak'),
('DMRC112', 'Violet Line', '2026-09-28', 'PENDING', 'Inactive - needs inspection');

-- REPORTS
INSERT INTO report (report_type, report_date, content, generated_by) VALUES
('Daily Operations', '2026-09-27', 'Total Passengers: 1.42M | Train Trips: 2486 | On-Time Rate: 96.8%', 1),
('Train Performance', '2026-09-26', 'Blue Line: 42 trains, 97.4% on-time, 2 incidents.', 1);
