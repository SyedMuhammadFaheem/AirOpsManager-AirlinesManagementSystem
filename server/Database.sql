select * from admin_table;
drop table admin_table;
create table admin(
	username varchar(30) not null,
    password varchar(10) not null
);
insert into admin values('cynotryl','12345');
-- Clients 
CREATE TABLE CLIENTS(

client_id INT PRIMARY KEY AUTO_INCREMENT,
fname VARCHAR(25) NOT NULL,
mname VARCHAR(25),
lname VARCHAR(25)NOT NULL,
phone VARCHAR(14)NOT NULL,
email VARCHAR(40) NOT NULL,
passport VARCHAR(40) NOT NULL
);

INSERT INTO CLIENTS VALUES(1,'MOHSIN', 'ALI', 'MIRZA', '+923317534906','MOHSINALIMIRZA@GMAIL.COM','123');
INSERT INTO CLIENTS VALUES(2,'AHMAD', NULL, 'ALEEM', '+923317534907', 'AHMADALEEM@HOTMAIL.COM','124');
INSERT INTO CLIENTS VALUES(3,'MUHAMMAD', 'HATIF', 'MUJAHID', '+923317534908', 'MUHAMMADHATIFMUJAHD@YAHOO.COM','125');
INSERT INTO CLIENTS VALUES(4,'WAHAJ', NULL, 'JAVED', '+443317534909', 'WAHAJJAVED@GMAIL.COM','126');
INSERT INTO CLIENTS VALUES(5,'ASFEEN', NULL, 'HAKANI', '+1233317534910', 'ASFEENHAKANI@GMAIL.COM','127');
INSERT INTO CLIENTS VALUES(6,'DURE', 'SAMEEN', 'WASEEM', '+443317534911', 'DURESAMEENWASEEM@OUTLOOK.COM','128');
INSERT INTO CLIENTS VALUES(7,'ABDULLAH', 'KHWAJA', 'GHORI', '+9783317534912', 'ABDULLAHKHAWAJAGHORI@GMAIL.COM','129');
INSERT INTO CLIENTS VALUES(8,'MUHAMMAD', NULL, 'SAAD', '+923317534913', 'MUHAMMADSAAD@GMAIL.COM','130');
INSERT INTO CLIENTS VALUES(9,'MUHAMMAD', NULL, 'MARIJ', '+943317534914', 'MUHAMMADMARIJ@GMAIL.COM','131');
INSERT INTO CLIENTS VALUES(10,'MUHAMMAD', 'WALEED', 'GUL', '+923317534915', 'MUHAMMADWALEEDGUL@GMAIL.COM','132');

create view client as select * from clients;
select * from clients;

alter table clients add password varchar(25) NOT NULL;
delete from clients where client_id=11;
select * from clients;
update clients set fname='Steve' where client_id=37;
select c.fname,c.lname,cr.review from customer_review cr inner join clients c on c.client_id=cr.client_id;
-- Airplane
CREATE TABLE AIRPLANE(

airplane_id INT NOT NULL,
max_seats INT NOT NULL,

CONSTRAINT PK_AIRPLANEID PRIMARY KEY(airplane_id)
);

INSERT INTO AIRPLANE VALUES(41,100);
INSERT INTO AIRPLANE VALUES(42,100);
INSERT INTO AIRPLANE VALUES(43,300);
INSERT INTO AIRPLANE VALUES(44,100);
INSERT INTO AIRPLANE VALUES(45,300);
INSERT INTO AIRPLANE VALUES(46,100);
INSERT INTO AIRPLANE VALUES(47,100);
INSERT INTO AIRPLANE VALUES(48,300);
INSERT INTO AIRPLANE VALUES(49,100);
INSERT INTO AIRPLANE VALUES(50,300);
create view airplanes as select * from airplane;



-- Flight Status
create table FlightStatus(
flightStatus_id int primary key,
status varchar(100)
);

insert into FlightStatus values('61','Departed');
insert into FlightStatus values('62','Landed');
insert into FlightStatus values('63','Delayed');
insert into FlightStatus values('64','Boarding');
insert into FlightStatus values('65','On Time');


create view flightstatuses as select * from flightstatus;


-- Gates
create table Gates(
gate_no int primary key);

insert into Gates values(66);
insert into Gates values(67);
insert into Gates values(68);
insert into Gates values(69);
insert into Gates values(70);
insert into Gates values(71);
insert into Gates values(72);
insert into Gates values(73);
insert into Gates values(74);
insert into Gates values(75);

create view gate as select * from gates;

-- Airport
create table Airport(
airport_code varchar(3) primary key,-- format (A-Z)(A-Z)(A-Z)
airport_name varchar(100),
city varchar(85),-- longest city name is 85 characters
gate_no INT,

CONSTRAINT FK_AIRPORTCODE FOREIGN KEY (gate_no) REFERENCES GATES (gate_no)
);

insert into Airport values('LAX','Los Angeles Airport','Los Angeles',66);
insert into Airport values('KHI','Karachi Airport','Karachi',66);
insert into Airport values('LHR','Lahore Airport','Lahore',68);
insert into Airport values('NYU','Newyork Airport','Newyork',69);
insert into Airport values('ATL','Atlanta Airport','Atlanta',70);
insert into Airport values('BOS','Boston Airport','Boston',75);
insert into Airport values('CLT','Charlotte Airport','Charlotte',72);
insert into Airport values('DEN','Denver Airport','Denver',73);
insert into Airport values('EWR','Newark Airport','Newark',74);
insert into Airport values('LAS','Las Vegas Airport','Las Vegas',68);
select * from airport;

create view airports as select * from airport;

-- Reviews
CREATE TABLE CUSTOMER_REVIEW(
client_id INT,
review VARCHAR(255),

CONSTRAINT PK_CLIENTID_REVIEW PRIMARY KEY (CLIENT_ID)
);

INSERT INTO CUSTOMER_REVIEW VALUES(1,'Good');
INSERT INTO CUSTOMER_REVIEW VALUES(2,'Bad');
INSERT INTO CUSTOMER_REVIEW VALUES(3,'Satisfactory');
INSERT INTO CUSTOMER_REVIEW VALUES(4,'Good');
INSERT INTO CUSTOMER_REVIEW VALUES(5,'Bad');
INSERT INTO CUSTOMER_REVIEW VALUES(6,'Good');
INSERT INTO CUSTOMER_REVIEW VALUES(7,'Bad');
INSERT INTO CUSTOMER_REVIEW VALUES(8,'Adequate');
INSERT INTO CUSTOMER_REVIEW VALUES(9,'Satisfactory');
INSERT INTO CUSTOMER_REVIEW VALUES(10,'Satisfactory');
select * from customer_review;

create view reviews as select * from customer_review;


-- Schedule
CREATE TABLE SCHEDULE(

schedule_id INT NOT NULL,
departure_time VARCHAR(30) NOT NULL,
arrival_time VARCHAR(30) NOT NULL,
duration_time FLOAT,

CONSTRAINT PK_SCHEDULEID PRIMARY KEY (schedule_id)
);

INSERT INTO SCHEDULE VALUES(51,'3-Jul-2023 12:30:00','3-Jul-2023 1:30:00',NULL);
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(52,'3-Sep-2023 4:30:00','4-Sep-2023 4:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(53,'5-Jan-2024 1:50:00','5-Jan-2023 1:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(54,'6-Feb-2023 5:30:00','6-Feb-2023 8:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(55,'18-Jul-2025 2:00:00','18-Jul-2025 2:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(56,'3-Aug-2025 10:30:00','3-Aug-2025 11:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(57,'6-Feb-2023 9:30:00','7-Feb-2023 1:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(58,'2-Jul-2023 6:30:00','2-Jul-2023 9:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(59,'1-Jul-2023 1:30:00','1-Jul-2023 3:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(60,'9-Jul-2023 5:30:00','9-Jul-2023 6:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(61,'07-12-2022 5:30:00','07-12-2022 6:30:00');
INSERT INTO SCHEDULE (SCHEDULE_ID,DEPARTURE_TIME,ARRIVAL_TIME) VALUES(62,'2022-12-07 1:30:00','2022-12-07 3:30:00');
select * from schedule;
update schedule set departure_time='2022-12-07 5:30:00',arrival_time='2022-12-07 6:30:00' where schedule_id=61;
select * from clients;
create view schedules as select * from schedule;

-- Flight
CREATE TABLE FLIGHT(

flight_no INT NOT NULL,
schedule_id INT NOT NULL,
flightStatus_id INT NOT NULL,
airplane_id INT NOT NULL,

CONSTRAINT PK_FLIGHTNO PRIMARY KEY (flight_no),
CONSTRAINT FK_SCHEDULEID FOREIGN KEY (schedule_id) REFERENCES SCHEDULE(schedule_id),
CONSTRAINT FK_FLIGHTSTATUSID FOREIGN KEY (flightStatus_id) REFERENCES FlightStatus(flightStatus_id),
CONSTRAINT FK_AIRPLANEID FOREIGN KEY (airplane_id) REFERENCES AIRPLANE(airplane_id)
);
alter table flight add fares int;
update flight set fares=5000 where flight_no=40;
select * from flight;

select f.airplane_id,a.max_seats,s.departure_time, s.arrival_time, fs.status,f.fares from Flight f inner join schedule s on s.schedule_id=f.schedule_id inner join FlightStatus fs on fs.flightStatus_id=f.flightStatus_id inner join airplane a on a.airplane_id=f.airplane_id where s.departure_time like '2022-12-07%' and s.arrival_time like '2022-12-07%';

select f.airplane_id,a.max_seats,s.departure_time, s.arrival_time, fs.status,f.fares from Flight f 
inner join schedule s on s.schedule_id=f.schedule_id 
inner join FlightStatus fs on fs.flightStatus_id=f.flightStatus_id
inner join airplane a on a.airplane_id=f.airplane_id where s.departure_time like '2022-12-07%' and s.arrival_time like '2022-12-07%';

INSERT INTO FLIGHT VALUES(31,51,61,41);
INSERT INTO FLIGHT VALUES(32,51,64,45);
INSERT INTO FLIGHT VALUES(33,56,64,47);
INSERT INTO FLIGHT VALUES(34,56,64,47);
INSERT INTO FLIGHT VALUES(35,55,63,42);
INSERT INTO FLIGHT VALUES(36,58,65,43);
INSERT INTO FLIGHT VALUES(37,59,62,43);
INSERT INTO FLIGHT VALUES(38,55,65,45);
INSERT INTO FLIGHT VALUES(39,59,61,49);
INSERT INTO FLIGHT VALUES(40,60,65,50);
INSERT INTO FLIGHT VALUES(42,62,64,45,2000);

create view flights as select * from flight;


-- Ticket
create table Ticket(
ticket_id int primary key auto_increment,
seat_no varchar(3),-- format (A-Z)(0-9)(0-9)
departure_time varchar(30),-- year >= sysdate(year)
gate_no int,
airport_code varchar(3));-- format (A-Z)(A-Z)(A-Z)

insert into airport_management.ticket (seat_no,departure_time) values(62,NULL);
select * from ticket;
alter table ticket auto_increment=10;
delete from ticket where ticket_id=67; 
select t.nm,s.departure_time,a.gate_no,a.airport_code from schedule s, tempseatgen t,airport a where s.schedule_id=62 and a.airport_name='Atlanta Airport' order by rand() limit 1;


insert into Ticket values(11,'A01','3-Jul-2023 12:30:00',66,'LAX');
insert into Ticket values(12,'D01','1-Jul-2023 1:30:00',67,'KHI');
insert into Ticket values(13,'E21','5-Jan-2024 1:50:00',67,'LHR');
insert into Ticket values(14,'F31','1-Jul-2023 1:30:00',68,'NYU');
insert into Ticket values(15,'G01','18-Jul-2025 2:00:00',66,'ATL');
insert into Ticket values(16,'H01','3-Aug-2025 10:30:00',66,'BOS');
insert into Ticket values(17,'I01','6-Feb-2023 9:30:00',67,'CLT');
insert into Ticket values(18,'J01','2-Jul-2023 6:30:00',68,'DEN');
insert into Ticket values(19,'K01','1-Jul-2023 1:30:00',69,'EWR');
insert into Ticket values(20,'L01','1-Jul-2023 1:30:00',70,'LAX');
select* from ticket;
create view tickets as select * from ticket;

select c.fname,c.lname,b.airport_code,b.flight_no,a.gate_no,
t.seat_no,t.departure_time from booking b
inner join clients c on c.client_id=b.client_id
inner join airport a on a.airport_code=b.airport_code
inner join ticket t on t.ticket_id=b.ticket_id
where c.client_id=37;
drop table ticket;
-- Booking
CREATE TABLE BOOKING(
client_id INT,
airport_code VARCHAR(3),
ticket_id int,
flight_no INT,
admin_id VARCHAR(64),
fares FLOAT,




CONSTRAINT FK_CLIENTID FOREIGN KEY (client_id) REFERENCES CLIENTS(client_id),
CONSTRAINT FK_AIRPORTCODE_B FOREIGN KEY (airport_code) REFERENCES Airport(airport_code),
CONSTRAINT FK_TicketID FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id),
CONSTRAINT FK_FLIGHTNO FOREIGN KEY (flight_no) REFERENCES FLIGHT(flight_no),
CONSTRAINT FK_ADMINID FOREIGN KEY (admin_id) REFERENCES ADMIN_TABLE(username)

);
-- delimiter //
-- CREATE FUNCTION countBookings()  
-- RETURNS INT
-- BEGIN
-- RETURN (select count(client_id) from bookings)
-- END;
-- delimiter;

select count(client_id) as countt,sum(fares) as summ from booking;
update booking set client_id=37,flight_no=41,fares=1000 where client_id is null and flight_no is null and fares is null;
alter table booking drop column admin_id;
select * from booking;
drop table booking;
delete from booking where ticket_id=67;

create view bookings as select client_id,airport_code,ticket_id,flight_no,fares from booking;
-- Admin
create table Admin_Table
(username varchar(64) primary key,
pass varchar(10));-- limit to 10 characters only

insert into Admin_Table values('Ahmad','fast123');
insert into Admin_Table values('Faheem','notfast123');
insert into Admin_Table values('Mohsin','yesfast123');

create table FlightBooking(
	fb_id int primary key auto_increment,
	departure varchar(30) NOT NULL,
    arrival varchar(30) NOT NULL,
    departureDate varchar(30) NOT NULL,
    returnDate varchar(30) NOT NULL,
    class varchar(15) NOT NULL,
    price varchar(20) NOT NULL
    
);

alter table FlightBooking add flight_no int;
delete from FlightBooking where fb_id=65;
update FlightBooking set flight_no=40 where fb_id=45;
select * from FlightBooking;
delete from FlightBooking where fb_id=47;

create table TempSeatGen(
gen_id int primary key auto_increment,
nm varchar(3)
);

insert into TempSeatGen (nm) values
('A01'),
('D01'),
('E21'),
('F21'),
('G31'),
('H01'),
('I01'),
('J01'),
('K01');

select * from tempseatgen;
select nm from tempseatgen order by rand() limit 1;

select * from customer_review;
insert into customer_review values(38,'Hello');

-- triggers
DROP TRIGGER IF EXISTS `airport_management`.`Ticket_AFTER_INSERT`;
DELIMITER $$
USE `airport_management`$$
CREATE DEFINER = CURRENT_USER TRIGGER `airport_management`.`Ticket_AFTER_INSERT` AFTER INSERT ON `Ticket` FOR EACH ROW
BEGIN
	update airport_management.ticket set seat_no= (select nm from airport_management.tempseatgen order by rand() limit 1) where seat_no is null;
END$$
DELIMITER ;



delimiter //
create trigger fill_booking 
after INSERT 
on  Ticket
for each row 
begin
insert into booking (airport_code,ticket_id) values(new.airport_code,new.ticket_id);
end; //
