const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    campsite: { type: mongoose.Schema.Types.ObjectId, ref: 'Campsite', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { 
      type: String, 
      required: true,
      maxlength: [300, 'Review comment cannot exceed 300 characters (approximately 50 words)'],
      trim: true
    },
  },
  { timestamps: true }
);

// Add index for efficient queries
reviewSchema.index({ campsite: 1, createdAt: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });

// Prevent duplicate reviews from same user for same campsite
reviewSchema.index({ user: 1, campsite: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
