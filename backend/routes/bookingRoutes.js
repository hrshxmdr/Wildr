const express = require('express');
const Booking = require('../models/Booking');
const Campsite = require('../models/Campsite');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/bookings (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { campsiteId, checkIn, checkOut, guests = 1 } = req.body;
    if (!campsiteId || !checkIn || !checkOut) return res.status(400).json({ message: 'Missing fields' });
    const exists = await Campsite.findById(campsiteId);
    if (!exists) return res.status(404).json({ message: 'Campsite not found' });
    const booking = await Booking.create({
      user: req.user._id,
      campsite: campsiteId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: Number(guests) || 1,
      status: 'confirmed',
    });
    res.status(201).json(booking);
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

// GET /api/bookings/me (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const rows = await Booking.find({ user: req.user._id }).populate('campsite', 'name location');
    res.json(rows);
  } catch (e) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
