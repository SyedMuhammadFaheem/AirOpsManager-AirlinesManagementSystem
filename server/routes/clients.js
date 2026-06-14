const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/pool');
const { verifyAdmin } = require('../middleware/auth');
const { validateClient } = require('../middleware/validate');

const router = express.Router();

router.get('/get', verifyAdmin, (req, res) => {
  db.query('SELECT client_id, fname, mname, lname, phone, email, passport FROM clients', (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
});

router.get('/get/:id', verifyAdmin, (req, res) => {
  db.query(
    'SELECT client_id, fname, mname, lname, phone, email, passport FROM clients WHERE client_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(404).json({ message: 'Client not found' });
      res.json(results[0]);
    }
  );
});

router.post('/post', verifyAdmin, validateClient, async (req, res) => {
  const { fname, mname, lname, phone, email, passport, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO clients (fname, mname, lname, phone, email, passport, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fname, mname || null, lname, phone, email, passport, hash],
      (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Email already registered' });
          return res.status(500).json({ message: 'Could not create client' });
        }
        res.status(201).json({ success: true });
      }
    );
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update/:id', verifyAdmin, validateClient, (req, res) => {
  const { fname, mname, lname, phone, email, passport } = req.body;
  db.query(
    'UPDATE clients SET fname=?, mname=?, lname=?, phone=?, email=?, passport=? WHERE client_id=?',
    [fname, mname || null, lname, phone, email, passport, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Could not update client' });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Client not found' });
      res.json({ success: true });
    }
  );
});

router.delete('/remove/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM clients WHERE client_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Could not delete client' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Client not found' });
    res.json({ success: true });
  });
});

module.exports = router;
