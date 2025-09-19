const express = require('express');
const Review = require('../models/Review');
const Campsite = require('../models/Campsite');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/reviews?campsiteId= (public)
router.get('/', async (req, res) => {
  try {
    const { campsiteId, limit = 20, skip = 0 } = req.query;
    const filter = campsiteId ? { campsite: campsiteId } : {};
    const rows = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Math.min(Number(limit), 50))
      .populate('user', 'username')
      .populate('campsite', 'name location');
    res.json(rows);
  } catch (e) { 
    console.error('Error fetching reviews:', e);
    res.status(500).json({ message: 'Server error' }); 
  }
});

// POST /api/reviews { campsiteId, rating, comment }
router.post('/', auth, async (req, res) => {
  try {
    const { campsiteId, rating, comment } = req.body;
    
    // Enhanced validation
    if (!campsiteId || !rating || !comment) {
      return res.status(400).json({ message: 'Campsite ID, rating, and comment are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5 stars' });
    }
    
    if (comment.trim().length === 0) {
      return res.status(400).json({ message: 'Review comment cannot be empty' });
    }
    
    if (comment.length > 300) {
      return res.status(400).json({ message: 'Review comment cannot exceed 50 words (300 characters)' });
    }
    
    // Word count validation (approximately)
    const wordCount = comment.trim().split(/\s+/).length;
    if (wordCount > 50) {
      return res.status(400).json({ message: 'Review comment cannot exceed 50 words' });
    }
    
    const campsite = await Campsite.findById(campsiteId);
    if (!campsite) return res.status(404).json({ message: 'Campsite not found' });

    // Check if user already reviewed this campsite
    const existingReview = await Review.findOne({ user: req.user._id, campsite: campsiteId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this campsite' });
    }

    const review = await Review.create({ 
      user: req.user._id, 
      campsite: campsiteId, 
      rating: Number(rating), 
      comment: comment.trim() 
    });

    // Update aggregate rating on campsite
    const stats = await Review.aggregate([
      { $match: { campsite: campsite._id } },
      { $group: { _id: '$campsite', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    if (stats[0]) {
      campsite.ratingAvg = Math.round(stats[0].avg * 10) / 10; // Round to 1 decimal
      campsite.ratingCount = stats[0].count;
      await campsite.save();
    }

    // Populate user info for response
    await review.populate('user', 'username');
    
    res.status(201).json(review);
  } catch (e) { 
    console.error('Error creating review:', e);
    if (e.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this campsite' });
    }
    res.status(500).json({ message: 'Server error while creating review' }); 
  }
});

// GET /api/reviews/me (protected)
router.get('/me', auth, async (req, res) => {
  try {
    const rows = await Review.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('campsite', 'name location');
    res.json(rows);
  } catch (e) { 
    console.error('Error fetching user reviews:', e);
    res.status(500).json({ message: 'Server error' }); 
  }
});

// PUT /api/reviews/:id (protected) - Update review
router.put('/:id', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validation
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5 stars' });
    }
    
    if (comment.trim().length === 0) {
      return res.status(400).json({ message: 'Review comment cannot be empty' });
    }
    
    const wordCount = comment.trim().split(/\s+/).length;
    if (wordCount > 50) {
      return res.status(400).json({ message: 'Review comment cannot exceed 50 words' });
    }
    
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if user owns this review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }
    
    // Update review
    review.rating = Number(rating);
    review.comment = comment.trim();
    await review.save();
    
    // Recalculate campsite rating
    const campsite = await Campsite.findById(review.campsite);
    if (campsite) {
      const stats = await Review.aggregate([
        { $match: { campsite: campsite._id } },
        { $group: { _id: '$campsite', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
      ]);
      if (stats[0]) {
        campsite.ratingAvg = Math.round(stats[0].avg * 10) / 10;
        campsite.ratingCount = stats[0].count;
        await campsite.save();
      }
    }
    
    await review.populate('user', 'username');
    res.json(review);
  } catch (e) {
    console.error('Error updating review:', e);
    res.status(500).json({ message: 'Server error while updating review' });
  }
});

// DELETE /api/reviews/:id (protected) - Delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if user owns this review
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }
    
    const campsiteId = review.campsite;
    await Review.findByIdAndDelete(req.params.id);
    
    // Recalculate campsite rating
    const campsite = await Campsite.findById(campsiteId);
    if (campsite) {
      const stats = await Review.aggregate([
        { $match: { campsite: campsite._id } },
        { $group: { _id: '$campsite', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
      ]);
      if (stats[0]) {
        campsite.ratingAvg = Math.round(stats[0].avg * 10) / 10;
        campsite.ratingCount = stats[0].count;
      } else {
        campsite.ratingAvg = 0;
        campsite.ratingCount = 0;
      }
      await campsite.save();
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (e) {
    console.error('Error deleting review:', e);
    res.status(500).json({ message: 'Server error while deleting review' });
  }
});

module.exports = router;
