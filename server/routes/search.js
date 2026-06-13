const express = require('express');
const db = require('../db/pool');
const { verifyCustomer } = require('../middleware/auth');
const { validateBookTicket } = require('../middleware/validate');

const router = express.Router();

// Store flight search criteria for the session (customer-scoped via JWT)
router.post('/BookTicket', verifyCustomer, validateBookTicket, (req, res) => {
  const { departure, arrival, departureDate, returnDate, class: flightClass, price } = req.body;
  db.query(
    'INSERT INTO FlightBooking (departure, arrival, departureDate, returnDate, class, price) VALUES (?, ?, ?, ?, ?, ?)',
    [departure, arrival, departureDate, returnDate, flightClass, price],
    (err) => {
      if (err) return res.status(500).json({ message: 'Could not save search' });
      res.status(201).json({ success: true });
    }
  );
});

router.get('/SearchFlights', verifyCustomer, (req, res) => {
  db.query(
    'SELECT fb_id, departure, arrival, departureDate, returnDate, class, price FROM FlightBooking',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

// Bug fix: fares is now sent as a plain integer from the client, no string slicing
router.post('/AvailableFlights', verifyCustomer, (req, res) => {
  const { departureDate, returnDate, fares } = req.body;
  if (!departureDate || !returnDate || fares === undefined) {
    return res.status(400).json({ message: 'departureDate, returnDate and fares are required' });
  }
  const faresInt = parseInt(fares, 10);
  if (isNaN(faresInt)) return res.status(400).json({ message: 'fares must be a number' });

  db.query(
    `SELECT f.flight_no, s.schedule_id, f.airplane_id, a.max_seats, s.departure_time,
            s.arrival_time, fs.status, f.fares
     FROM Flight f
     INNER JOIN schedule s ON s.schedule_id = f.schedule_id
     INNER JOIN FlightStatus fs ON fs.flightStatus_id = f.flightStatus_id
     INNER JOIN airplane a ON a.airplane_id = f.airplane_id
     WHERE s.departure_time LIKE ? AND s.arrival_time LIKE ? AND f.fares = ?`,
    [departureDate + '%', returnDate + '%', faresInt],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

router.delete('/removeSearch', verifyCustomer, (req, res) => {
  // Scoped: only clears FlightBooking rows that have no flight_no assigned yet (search-only rows)
  db.query('DELETE FROM FlightBooking WHERE flight_no IS NULL', (err) => {
    if (err) return res.status(500).json({ message: 'Could not clear search' });
    res.json({ success: true });
  });
});

router.post('/UpdateFlightBooking', verifyCustomer, (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'id is required' });
  db.query(
    'UPDATE FlightBooking SET flight_no=(SELECT f.flight_no FROM Flight f INNER JOIN schedule s ON s.schedule_id=f.schedule_id WHERE s.schedule_id=?) WHERE flight_no IS NULL',
    [id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json({ success: true });
    }
  );
});

router.get('/invoice/:id', verifyCustomer, (req, res) => {
  const clientId = req.user.client_id;
  if (String(clientId) !== String(req.params.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  db.query(
    'SELECT fname, lname FROM clients WHERE client_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Client not found' });
      res.json(results[0]);
    }
  );
});

router.get('/invoicefares', verifyCustomer, (req, res) => {
  db.query('SELECT flight_no, departure, price FROM FlightBooking', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.post('/invoiceconfirm', verifyCustomer, (req, res) => {
  const { id, departure } = req.body;
  if (!id || !departure) return res.status(400).json({ message: 'id and departure are required' });

  db.query(
    `INSERT INTO ticket (seat_no, departure_time, gate_no, airport_code)
     SELECT t.nm, s.departure_time, a.gate_no, a.airport_code
     FROM schedule s, tempseatgen t, airport a
     WHERE s.schedule_id = ? AND a.airport_name = ?
     ORDER BY RAND() LIMIT 1`,
    [id, departure],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json({ success: true, insertId: result.insertId });
    }
  );
});

router.post('/invoiceconfirmAgain', verifyCustomer, (req, res) => {
  const client_id = req.user.client_id;
  const { flight_no, fares } = req.body;
  if (!flight_no || fares === undefined) {
    return res.status(400).json({ message: 'flight_no and fares are required' });
  }
  db.query(
    'UPDATE booking SET client_id=?, flight_no=?, fares=? WHERE client_id IS NULL AND flight_no IS NULL AND fares IS NULL',
    [client_id, String(flight_no), fares],
    (err) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json({ success: true });
    }
  );
});

router.get('/CustomerPanel/:id', verifyCustomer, (req, res) => {
  const clientId = req.user.client_id;
  if (String(clientId) !== String(req.params.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  db.query('SELECT fname FROM clients WHERE client_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(404).json({ message: 'Client not found' });
    res.json(results[0]);
  });
});

module.exports = router;
