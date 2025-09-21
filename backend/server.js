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

// Serve static files from React build (only if build exists)
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const buildPath = path.join(__dirname, '../frontend/build');
  
  // Check if build directory exists
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  } else {
    // Build doesn't exist - serve API only
    app.get('/', (req, res) => {
      res.json({ 
        message: 'Woods & Wild API is running!', 
        status: 'OK',
        note: 'Frontend build not found - API only mode'
      });
    });
  }
} else {
  // Development mode
  app.get('/', (req, res) => {
    res.json({ message: 'Woods & Wild API is running!', status: 'OK' });
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

