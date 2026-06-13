-- ============================================================
-- AirOpsManager — Seed Data
-- Passwords are bcrypt hashes (cost factor 10).
-- Plaintext passwords for dev/testing are listed in comments.
-- NEVER commit plaintext passwords.
-- ============================================================

-- Admin (plaintext: fast123)
INSERT INTO admin (username, password) VALUES
  ('Ahmad',   '$2a$10$qKpMzWeqQysNR5n3GzJoHeNv/x4PDJtPEZsaq0PpjZ7BVFpWU1qMC'),
  ('Faheem',  '$2a$10$kG2JaI6YGcXv5AIYg.2SvetqVLbwJVqsFbnVo9Wsu81SLeIa00fw6'),
  ('Mohsin',  '$2a$10$LdRhPpbk7v4AvZV1IQs08uLomiMx0SCu05YCDo7bPEGGz6VaJBiwW');

-- Clients (password: clientpass123 for all seed users)
INSERT INTO CLIENTS (fname, mname, lname, phone, email, passport, password) VALUES
  ('MOHSIN',    'ALI',     'MIRZA',   '+923317534906', 'mohsinalimirza@gmail.com',         '123', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('AHMAD',     NULL,      'ALEEM',   '+923317534907', 'ahmadaleem@hotmail.com',            '124', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('MUHAMMAD',  'HATIF',   'MUJAHID', '+923317534908', 'muhammadhatifmujahd@yahoo.com',     '125', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('WAHAJ',     NULL,      'JAVED',   '+443317534909', 'wahajjaved@gmail.com',              '126', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('ASFEEN',    NULL,      'HAKANI',  '+1233317534910','asfeenhakani@gmail.com',            '127', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('DURE',      'SAMEEN',  'WASEEM',  '+443317534911', 'duresameenwaseem@outlook.com',      '128', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('ABDULLAH',  'KHWAJA',  'GHORI',   '+9783317534912','abdullahkhawajaghori@gmail.com',    '129', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('MUHAMMAD',  NULL,      'SAAD',    '+923317534913', 'muhammadsaad@gmail.com',            '130', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('MUHAMMAD',  NULL,      'MARIJ',   '+943317534914', 'muhammadmarij@gmail.com',           '131', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi'),
  ('MUHAMMAD',  'WALEED',  'GUL',     '+923317534915', 'muhammadwaleedgul@gmail.com',       '132', '$2a$10$O3X3mbc5j9HzkKJp6APEDeC/tHlEzsVZvSb5vpxHfezKY7vAynlKi');

-- Airplanes
INSERT INTO AIRPLANE VALUES
  (41,100),(42,100),(43,300),(44,100),(45,300),
  (46,100),(47,100),(48,300),(49,100),(50,300);

-- Flight Status
INSERT INTO FlightStatus VALUES
  (61,'Departed'),(62,'Landed'),(63,'Delayed'),(64,'Boarding'),(65,'On Time');

-- Gates
INSERT INTO Gates VALUES (66),(67),(68),(69),(70),(71),(72),(73),(74),(75);

-- Airports
INSERT INTO Airport VALUES
  ('LAX','Los Angeles Airport','Los Angeles',66),
  ('KHI','Karachi Airport','Karachi',66),
  ('LHR','Lahore Airport','Lahore',68),
  ('NYU','Newyork Airport','Newyork',69),
  ('ATL','Atlanta Airport','Atlanta',70),
  ('BOS','Boston Airport','Boston',75),
  ('CLT','Charlotte Airport','Charlotte',72),
  ('DEN','Denver Airport','Denver',73),
  ('EWR','Newark Airport','Newark',74),
  ('LAS','Las Vegas Airport','Las Vegas',68);

-- Reviews
INSERT INTO CUSTOMER_REVIEW VALUES
  (1,'Good'),(2,'Bad'),(3,'Satisfactory'),(4,'Good'),(5,'Bad'),
  (6,'Good'),(7,'Bad'),(8,'Adequate'),(9,'Satisfactory'),(10,'Satisfactory');

-- Schedules
INSERT INTO SCHEDULE VALUES
  (51,'3-Jul-2023 12:30:00','3-Jul-2023 1:30:00',NULL),
  (52,'3-Sep-2023 4:30:00','4-Sep-2023 4:30:00',NULL),
  (53,'5-Jan-2024 1:50:00','5-Jan-2023 1:30:00',NULL),
  (54,'6-Feb-2023 5:30:00','6-Feb-2023 8:30:00',NULL),
  (55,'18-Jul-2025 2:00:00','18-Jul-2025 2:30:00',NULL),
  (56,'3-Aug-2025 10:30:00','3-Aug-2025 11:30:00',NULL),
  (57,'6-Feb-2023 9:30:00','7-Feb-2023 1:30:00',NULL),
  (58,'2-Jul-2023 6:30:00','2-Jul-2023 9:30:00',NULL),
  (59,'1-Jul-2023 1:30:00','1-Jul-2023 3:30:00',NULL),
  (60,'9-Jul-2023 5:30:00','9-Jul-2023 6:30:00',NULL),
  (61,'2022-12-07 5:30:00','2022-12-07 6:30:00',NULL),
  (62,'2022-12-07 1:30:00','2022-12-07 3:30:00',NULL);

-- Flights
INSERT INTO FLIGHT VALUES
  (31,51,61,41,NULL),(32,51,64,45,NULL),(33,56,64,47,NULL),
  (35,55,63,42,NULL),(36,58,65,43,NULL),(37,59,62,43,NULL),
  (38,55,65,45,NULL),(39,59,61,49,NULL),(40,60,65,50,5000),
  (42,62,64,45,2000);

-- Tickets
INSERT INTO Ticket VALUES
  (11,'A01','3-Jul-2023 12:30:00',66,'LAX'),
  (12,'D01','1-Jul-2023 1:30:00',67,'KHI'),
  (13,'E21','5-Jan-2024 1:50:00',67,'LHR'),
  (14,'F31','1-Jul-2023 1:30:00',68,'NYU'),
  (15,'G01','18-Jul-2025 2:00:00',66,'ATL'),
  (16,'H01','3-Aug-2025 10:30:00',66,'BOS'),
  (17,'I01','6-Feb-2023 9:30:00',67,'CLT'),
  (18,'J01','2-Jul-2023 6:30:00',68,'DEN'),
  (19,'K01','1-Jul-2023 1:30:00',69,'EWR'),
  (20,'L01','1-Jul-2023 1:30:00',70,'LAX');

-- TempSeatGen
INSERT INTO TempSeatGen (nm) VALUES
  ('A01'),('D01'),('E21'),('F21'),('G31'),('H01'),('I01'),('J01'),('K01');

-- Trigger: assign random seat after ticket insert
DROP TRIGGER IF EXISTS Ticket_AFTER_INSERT;
DELIMITER $$
CREATE TRIGGER Ticket_AFTER_INSERT AFTER INSERT ON Ticket FOR EACH ROW
BEGIN
  UPDATE Ticket SET seat_no = (SELECT nm FROM TempSeatGen ORDER BY RAND() LIMIT 1)
  WHERE seat_no IS NULL AND ticket_id = NEW.ticket_id;
END$$
DELIMITER ;

-- Trigger: fill booking after ticket insert
DROP TRIGGER IF EXISTS fill_booking;
DELIMITER $$
CREATE TRIGGER fill_booking AFTER INSERT ON Ticket FOR EACH ROW
BEGIN
  INSERT INTO booking (airport_code, ticket_id) VALUES (NEW.airport_code, NEW.ticket_id);
END$$
DELIMITER ;
