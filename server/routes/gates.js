const express = require('express');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT gate_no FROM gates', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query('SELECT gate_no FROM gates WHERE gate_no = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(404).json({ message: 'Gate not found' });
    res.json(results[0]);
  });
});

module.exports = router;
