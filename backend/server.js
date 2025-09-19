const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
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

// CORS configuration for single URL deployment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? true // Same origin in production
    : 'http://localhost:3000', // Local development
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

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });

