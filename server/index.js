require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/clients'));
app.use('/airplane/api', require('./routes/airplanes'));
app.use('/schedule/api', require('./routes/schedules'));
app.use('/flight/api', require('./routes/flights'));
app.use('/flightStatus/api', require('./routes/flightStatus'));
app.use('/airport/api', require('./routes/airports'));
app.use('/gates/api', require('./routes/gates'));
app.use('/ticket/api', require('./routes/tickets'));
app.use('/booking', require('./routes/bookings'));
app.use('/reviews/api', require('./routes/reviews'));
app.use('/', require('./routes/search'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
