const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/db');
const passport = require('passport');
require('./config/passport');

// Routes
const authRoutes = require('./routes/authRoutes');
const campingSpotRoutes = require('./routes/campingSpotRoutes'); // legacy (mysql) keep for now
const campsiteRoutes = require('./routes/campsiteRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();

const app = express();

// CORS configuration for production and development
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://wildr.onrender.com', // Your frontend URL on Render
    'http://localhost:3000' // For local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/camping-spots', campingSpotRoutes); // legacy
app.use('/api/campsites', campsiteRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });

