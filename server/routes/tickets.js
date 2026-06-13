const express = require('express');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');
const { validateTicketUpdate } = require('../middleware/validate');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT ticket_id, seat_no, departure_time, gate_no, airport_code FROM ticket', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query(
    'SELECT ticket_id, seat_no, departure_time, gate_no, airport_code FROM ticket WHERE ticket_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Ticket not found' });
      res.json(results[0]);
    }
  );
});

router.put('/update/:id', verifyAdmin, validateTicketUpdate, (req, res) => {
  const { ticket_id, seat_no, departure_time, gate_no, airport_code } = req.body;
  db.query(
    'UPDATE ticket SET ticket_id=?, seat_no=?, departure_time=?, gate_no=?, airport_code=? WHERE ticket_id=?',
    [ticket_id, seat_no, departure_time, gate_no, airport_code, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Could not update ticket' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Ticket not found' });
      res.json({ success: true });
    }
  );
});

module.exports = router;
