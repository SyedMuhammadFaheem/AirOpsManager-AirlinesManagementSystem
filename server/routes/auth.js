const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/pool');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateAdminLogin, validateCustomerLogin, validateSignup } = require('../middleware/validate');

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 8 * 60 * 60 * 1000, // 8 hours
};

router.post('/login', authLimiter, validateAdminLogin, (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT username, password FROM admin WHERE username = ?',
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, results[0].password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.cookie('admin_token', token, COOKIE_OPTIONS);
      res.json({ success: true });
    }
  );
});

router.post('/customerlogin', authLimiter, validateCustomerLogin, (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT client_id, fname, lname, email, password FROM clients WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, results[0].password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });

      const { password: _pw, ...safeUser } = results[0];
      const token = jwt.sign({ client_id: safeUser.client_id, role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '8h' });
      res.cookie('customer_token', token, COOKIE_OPTIONS);
      res.json({ success: true, user: safeUser });
    }
  );
});

router.post('/signup', validateSignup, async (req, res) => {
  const { fname, mname, lname, phone, email, passport, password } = req.body;

  db.query('SELECT client_id FROM clients WHERE email = ?', [email], async (err, existing) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (existing.length > 0) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO clients (fname, mname, lname, phone, email, passport, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fname, mname || null, lname, phone, email, passport, hash],
      (insertErr) => {
        if (insertErr) return res.status(500).json({ message: 'Could not create account' });
        res.status(201).json({ success: true });
      }
    );
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.clearCookie('customer_token');
  res.json({ success: true });
});

router.get('/me', (req, res) => {
  const adminToken = req.cookies.admin_token;
  const customerToken = req.cookies.customer_token;
  try {
    if (adminToken) {
      const payload = jwt.verify(adminToken, process.env.JWT_SECRET);
      return res.json({ role: 'admin', username: payload.username });
    }
    if (customerToken) {
      const payload = jwt.verify(customerToken, process.env.JWT_SECRET);
      return res.json({ role: 'customer', client_id: payload.client_id });
    }
    res.status(401).json({ message: 'Not authenticated' });
  } catch {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
