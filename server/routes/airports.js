const express = require('express');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/get', (req, res) => {
  // Public — needed for the BookTicket form dropdown
  db.query('SELECT airport_code, airport_name, city, gate_no FROM airport', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query(
    'SELECT airport_code, airport_name, city, gate_no FROM airport WHERE airport_code = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Airport not found' });
      res.json(results[0]);
    }
  );
});

module.exports = router;
