const express = require('express');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');
const { validateFlight } = require('../middleware/validate');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT flight_no, schedule_id, flightStatus_id, airplane_id, fares FROM flight', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query(
    'SELECT flight_no, schedule_id, flightStatus_id, airplane_id, fares FROM flight WHERE flight_no = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Flight not found' });
      res.json(results[0]);
    }
  );
});

router.post('/post', verifyAdmin, validateFlight, (req, res) => {
  const { flight_no, schedule_id, flightStatus_id, airplane_id, fares } = req.body;
  db.query(
    'INSERT INTO flight (flight_no, schedule_id, flightStatus_id, airplane_id, fares) VALUES (?, ?, ?, ?, ?)',
    [flight_no, schedule_id, flightStatus_id, airplane_id, fares],
    (err) => {
      if (err) return res.status(500).json({ message: 'Could not create flight' });
      res.status(201).json({ success: true });
    }
  );
});

router.delete('/remove/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM flight WHERE flight_no = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Could not delete flight' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Flight not found' });
    res.json({ success: true });
  });
});

module.exports = router;
