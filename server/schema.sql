-- ============================================================
-- AirOpsManager — Schema (CREATE TABLE only, no destructive ops)
-- ============================================================

CREATE TABLE IF NOT EXISTS admin (
  username VARCHAR(64) PRIMARY KEY,
  password VARCHAR(60) NOT NULL  -- bcrypt hash
);

CREATE TABLE IF NOT EXISTS CLIENTS (
  client_id INT PRIMARY KEY AUTO_INCREMENT,
  fname     VARCHAR(25) NOT NULL,
  mname     VARCHAR(25),
  lname     VARCHAR(25) NOT NULL,
  phone     VARCHAR(14) NOT NULL,
  email     VARCHAR(40) NOT NULL UNIQUE,
  passport  VARCHAR(40) NOT NULL,
  password  VARCHAR(60) NOT NULL  -- bcrypt hash
);

CREATE TABLE IF NOT EXISTS AIRPLANE (
  airplane_id INT NOT NULL,
  max_seats   INT NOT NULL,
  CONSTRAINT PK_AIRPLANEID PRIMARY KEY (airplane_id)
);

CREATE TABLE IF NOT EXISTS FlightStatus (
  flightStatus_id INT PRIMARY KEY,
  status          VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Gates (
  gate_no INT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Airport (
  airport_code VARCHAR(3) PRIMARY KEY,
  airport_name VARCHAR(100),
  city         VARCHAR(85),
  gate_no      INT,
  CONSTRAINT FK_AIRPORTCODE FOREIGN KEY (gate_no) REFERENCES Gates (gate_no)
);

CREATE TABLE IF NOT EXISTS CUSTOMER_REVIEW (
  client_id INT,
  review    VARCHAR(255),
  CONSTRAINT PK_CLIENTID_REVIEW PRIMARY KEY (client_id)
);

CREATE TABLE IF NOT EXISTS SCHEDULE (
  schedule_id    INT NOT NULL,
  departure_time VARCHAR(30) NOT NULL,
  arrival_time   VARCHAR(30) NOT NULL,
  duration_time  FLOAT,
  CONSTRAINT PK_SCHEDULEID PRIMARY KEY (schedule_id)
);

CREATE TABLE IF NOT EXISTS FLIGHT (
  flight_no       INT NOT NULL,
  schedule_id     INT NOT NULL,
  flightStatus_id INT NOT NULL,
  airplane_id     INT NOT NULL,
  fares           INT,
  CONSTRAINT PK_FLIGHTNO     PRIMARY KEY (flight_no),
  CONSTRAINT FK_SCHEDULEID   FOREIGN KEY (schedule_id)     REFERENCES SCHEDULE (schedule_id),
  CONSTRAINT FK_FLIGHTSTATUSID FOREIGN KEY (flightStatus_id) REFERENCES FlightStatus (flightStatus_id),
  CONSTRAINT FK_AIRPLANEID   FOREIGN KEY (airplane_id)     REFERENCES AIRPLANE (airplane_id)
);

CREATE TABLE IF NOT EXISTS Ticket (
  ticket_id      INT PRIMARY KEY AUTO_INCREMENT,
  seat_no        VARCHAR(3),
  departure_time VARCHAR(30),
  gate_no        INT,
  airport_code   VARCHAR(3)
);

CREATE TABLE IF NOT EXISTS BOOKING (
  client_id    INT,
  airport_code VARCHAR(3),
  ticket_id    INT,
  flight_no    INT,
  fares        FLOAT,
  CONSTRAINT FK_CLIENTID       FOREIGN KEY (client_id)    REFERENCES CLIENTS (client_id),
  CONSTRAINT FK_AIRPORTCODE_B  FOREIGN KEY (airport_code) REFERENCES Airport (airport_code),
  CONSTRAINT FK_TicketID       FOREIGN KEY (ticket_id)    REFERENCES Ticket (ticket_id),
  CONSTRAINT FK_FLIGHTNO       FOREIGN KEY (flight_no)    REFERENCES FLIGHT (flight_no)
);

CREATE TABLE IF NOT EXISTS FlightBooking (
  fb_id         INT PRIMARY KEY AUTO_INCREMENT,
  departure     VARCHAR(30) NOT NULL,
  arrival       VARCHAR(30) NOT NULL,
  departureDate VARCHAR(30) NOT NULL,
  returnDate    VARCHAR(30) NOT NULL,
  class         VARCHAR(15) NOT NULL,
  price         VARCHAR(20) NOT NULL,
  flight_no     INT
);

CREATE TABLE IF NOT EXISTS TempSeatGen (
  gen_id INT PRIMARY KEY AUTO_INCREMENT,
  nm     VARCHAR(3)
);

-- Views
CREATE OR REPLACE VIEW client        AS SELECT client_id, fname, mname, lname, phone, email, passport FROM clients;
CREATE OR REPLACE VIEW airplanes     AS SELECT airplane_id, max_seats FROM airplane;
CREATE OR REPLACE VIEW flightstatuses AS SELECT flightStatus_id, status FROM flightstatus;
CREATE OR REPLACE VIEW gate          AS SELECT gate_no FROM gates;
CREATE OR REPLACE VIEW airports      AS SELECT airport_code, airport_name, city, gate_no FROM airport;
CREATE OR REPLACE VIEW reviews       AS SELECT client_id, review FROM customer_review;
CREATE OR REPLACE VIEW schedules     AS SELECT schedule_id, departure_time, arrival_time, duration_time FROM schedule;
CREATE OR REPLACE VIEW flights       AS SELECT flight_no, schedule_id, flightStatus_id, airplane_id, fares FROM flight;
CREATE OR REPLACE VIEW tickets       AS SELECT ticket_id, seat_no, departure_time, gate_no, airport_code FROM ticket;
CREATE OR REPLACE VIEW bookings      AS SELECT client_id, airport_code, ticket_id, flight_no, fares FROM booking;
