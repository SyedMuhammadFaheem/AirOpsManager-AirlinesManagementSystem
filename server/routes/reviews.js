const express = require('express');
const db = require('../db/pool');
const { verifyAdmin, verifyCustomer } = require('../middleware/auth');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT client_id, review FROM customer_review', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query(
    'SELECT client_id, review FROM customer_review WHERE client_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

router.get('/getreview', (req, res) => {
  // Public — displayed on the home/reviews page
  db.query(
    'SELECT c.fname, c.lname, cr.review FROM customer_review cr INNER JOIN clients c ON c.client_id = cr.client_id',
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      res.json(results);
    }
  );
});

router.post('/addreview/:id', verifyCustomer, (req, res) => {
  const clientId = req.user.client_id;
  const { review } = req.body;

  if (!review || review.trim().length === 0) {
    return res.status(400).json({ message: 'Review cannot be empty' });
  }
  if (String(clientId) !== String(req.params.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  db.query('INSERT INTO customer_review VALUES (?, ?)', [clientId, review.trim()], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'You have already submitted a review.' });
      return res.status(500).json({ message: 'Could not submit review' });
    }
    res.status(201).json({ success: true });
  });
});

module.exports = router;
