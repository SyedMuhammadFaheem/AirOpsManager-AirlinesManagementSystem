const express = require('express');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');
const { validateAirplane } = require('../middleware/validate');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT airplane_id, max_seats FROM airplane', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query('SELECT airplane_id, max_seats FROM airplane WHERE airplane_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(404).json({ message: 'Airplane not found' });
    res.json(results[0]);
  });
});

router.post('/post', verifyAdmin, validateAirplane, (req, res) => {
  const { airplane_id, max_seats } = req.body;
  db.query('INSERT INTO airplane VALUES (?, ?)', [airplane_id, max_seats], (err) => {
    if (err) return res.status(500).json({ message: 'Could not create airplane' });
    res.status(201).json({ success: true });
  });
});

router.put('/update/:id', verifyAdmin, validateAirplane, (req, res) => {
  const { airplane_id, max_seats } = req.body;
  db.query(
    'UPDATE airplane SET airplane_id=?, max_seats=? WHERE airplane_id=?',
    [airplane_id, max_seats, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Could not update airplane' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Airplane not found' });
      res.json({ success: true });
    }
  );
});

router.delete('/remove/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM airplane WHERE airplane_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Could not delete airplane' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Airplane not found' });
    res.json({ success: true });
  });
});

module.exports = router;
