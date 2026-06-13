const express = require('express');
const db = require('../db/pool');
const { verifyAdmin, verifyCustomer } = require('../middleware/auth');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query(
    'SELECT client_id, airport_code, ticket_id, flight_no, fares FROM booking',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

// Customer: show their own boarding pass
router.get('/showPass/:id', verifyCustomer, (req, res) => {
  const clientId = req.user.client_id;
  // Ensure the customer can only access their own pass
  if (String(clientId) !== String(req.params.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  db.query(
    `SELECT c.fname, c.lname, b.airport_code, b.flight_no, a.gate_no, t.seat_no, t.departure_time
     FROM booking b
     INNER JOIN clients c ON c.client_id = b.client_id
     INNER JOIN airport a ON a.airport_code = b.airport_code
     INNER JOIN ticket t ON t.ticket_id = b.ticket_id
     WHERE c.client_id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

router.get('/getstats', verifyAdmin, (req, res) => {
  db.query('SELECT COUNT(client_id) AS countt, SUM(fares) AS summ FROM booking', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results[0]);
  });
});

module.exports = router;
