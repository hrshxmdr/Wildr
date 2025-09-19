const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    campsite: { type: mongoose.Schema.Types.ObjectId, ref: 'Campsite', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, default: 1 },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
