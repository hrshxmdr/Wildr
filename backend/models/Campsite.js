const mongoose = require('mongoose');

const campsiteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    coordinates: { type: [Number], index: '2dsphere' }, // [lat, lon]
    images: [{ type: String }],
    description: { type: String },
    facilities: [{ type: String }],
    tags: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campsite', campsiteSchema);
