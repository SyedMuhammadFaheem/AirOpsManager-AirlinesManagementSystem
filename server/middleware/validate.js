const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateAdminLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

const validateCustomerLogin = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

const validateSignup = [
  body('fname').trim().notEmpty().isLength({ max: 25 }).withMessage('First name is required (max 25 chars)'),
  body('lname').trim().notEmpty().isLength({ max: 25 }).withMessage('Last name is required (max 25 chars)'),
  body('phone').trim().notEmpty().isLength({ max: 14 }).withMessage('Valid phone is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('passport').trim().notEmpty().isLength({ max: 40 }).withMessage('Passport is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  handleValidation,
];

const validateClient = [
  body('fname').trim().notEmpty().isLength({ max: 25 }),
  body('lname').trim().notEmpty().isLength({ max: 25 }),
  body('phone').trim().notEmpty().isLength({ max: 14 }),
  body('email').trim().isEmail(),
  body('passport').trim().notEmpty().isLength({ max: 40 }),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidation,
];

const validateAirplane = [
  body('airplane_id').isInt({ min: 1 }).withMessage('Airplane ID must be a positive integer'),
  body('max_seats').isInt({ min: 1 }).withMessage('Max seats must be a positive integer'),
  handleValidation,
];

const validateSchedule = [
  body('schedule_id').isInt({ min: 1 }),
  body('departure_time').trim().notEmpty(),
  body('arrival_time').trim().notEmpty(),
  handleValidation,
];

const validateFlight = [
  body('flight_no').isInt({ min: 1 }),
  body('schedule_id').isInt({ min: 1 }),
  body('flightStatus_id').isInt({ min: 1 }),
  body('airplane_id').isInt({ min: 1 }),
  body('fares').isInt({ min: 0 }).withMessage('Fares must be a non-negative integer'),
  handleValidation,
];

const validateBookTicket = [
  body('departure').trim().notEmpty(),
  body('arrival').trim().notEmpty(),
  body('departureDate').trim().notEmpty(),
  body('returnDate').trim().notEmpty(),
  body('class').trim().isIn(['Economy', 'Business']),
  body('price').trim().notEmpty(),
  handleValidation,
];

const validateTicketUpdate = [
  body('seat_no').trim().notEmpty().isLength({ max: 3 }),
  body('departure_time').trim().notEmpty(),
  body('gate_no').isInt({ min: 1 }),
  body('airport_code').trim().isLength({ min: 3, max: 3 }),
  handleValidation,
];

module.exports = {
  validateAdminLogin,
  validateCustomerLogin,
  validateSignup,
  validateClient,
  validateAirplane,
  validateSchedule,
  validateFlight,
  validateBookTicket,
  validateTicketUpdate,
};
