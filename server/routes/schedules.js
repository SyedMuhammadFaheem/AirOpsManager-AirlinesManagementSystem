const express = require('express');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');
const { validateSchedule } = require('../middleware/validate');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT schedule_id, departure_time, arrival_time, duration_time FROM schedule', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query(
    'SELECT schedule_id, departure_time, arrival_time, duration_time FROM schedule WHERE schedule_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Schedule not found' });
      res.json(results[0]);
    }
  );
});

router.post('/post', verifyAdmin, validateSchedule, (req, res) => {
  const { schedule_id, departure_time, arrival_time, duration_time } = req.body;
  db.query(
    'INSERT INTO schedule VALUES (?, ?, ?, ?)',
    [schedule_id, departure_time, arrival_time, duration_time || null],
    (err) => {
      if (err) return res.status(500).json({ message: 'Could not create schedule' });
      res.status(201).json({ success: true });
    }
  );
});

router.put('/update/:id', verifyAdmin, validateSchedule, (req, res) => {
  const { schedule_id, departure_time, arrival_time, duration_time } = req.body;
  db.query(
    'UPDATE schedule SET schedule_id=?, departure_time=?, arrival_time=?, duration_time=? WHERE schedule_id=?',
    [schedule_id, departure_time, arrival_time, duration_time || null, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Could not update schedule' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Schedule not found' });
      res.json({ success: true });
    }
  );
});

router.delete('/remove/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM schedule WHERE schedule_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Could not delete schedule' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ success: true });
  });
});

module.exports = router;
