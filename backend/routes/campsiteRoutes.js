const express = require('express');
const Campsite = require('../models/Campsite');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/campsites?search=&limit=&skip=
router.get('/', async (req, res) => {
  try {
    const { search = '', limit = 50, skip = 0, tags = '', minRating } = req.query;
    const q = String(search || '').trim();
    const filter = {};
    if (q) {
      filter.$or = [
        { name: new RegExp(q, 'i') },
        { location: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
      ];
    }
    const tagList = String(tags || '').split(',').map(s=>s.trim()).filter(Boolean);
    if (tagList.length) {
      filter.tags = { $in: tagList };
    }
    if (minRating !== undefined) {
      const mr = Number(minRating);
      if (!Number.isNaN(mr)) filter.ratingAvg = { $gte: mr };
    }
    const lim = Math.min(Number(limit) || 50, 100);
    const sk = Number(skip) || 0;
    const total = await Campsite.countDocuments(filter);
    const camps = await Campsite.find(filter).sort({ createdAt: -1 }).skip(sk).limit(lim);
    res.set('X-Total-Count', String(total));
    res.json(camps);
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/campsites/:id
router.get('/:id', async (req, res) => {
  try {
    const camp = await Campsite.findById(req.params.id);
    if (!camp) return res.status(404).json({ error: 'Not found' });
    res.json(camp);
  } catch { res.status(404).json({ error: 'Not found' }); }
});

// POST /api/campsites (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name, location, lat, lon, images = [], description = '', facilities = [], tags = [] } = req.body;
    
    // Enhanced validation
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }
    
    if (!description || description.length < 50) {
      return res.status(400).json({ error: 'Description must be at least 50 characters long' });
    }
    
    if (!images || images.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }
    
    // Validate coordinates if provided
    const coordinates = (typeof lat === 'number' && typeof lon === 'number') ? [lat, lon] : undefined;
    if (coordinates) {
      if (lat < -90 || lat > 90) {
        return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
      }
      if (lon < -180 || lon > 180) {
        return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
      }
    }
    
    const camp = await Campsite.create({ 
      name: name.trim(), 
      location: location.trim(), 
      coordinates, 
      images: images.filter(img => img.trim()), 
      description: description.trim(), 
      facilities: facilities.filter(f => f.trim()), 
      tags: tags.filter(t => t.trim()), 
      owner: req.user._id 
    });
    
    res.status(201).json(camp);
  } catch (e) { 
    console.error('Error creating campsite:', e);
    res.status(500).json({ error: 'Server error while creating campsite' }); 
  }
});

// GET /api/campsites/my (protected) - Get user's own campsites
router.get('/my', auth, async (req, res) => {
  try {
    const camps = await Campsite.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(camps);
  } catch (e) { 
    console.error('Error fetching user campsites:', e);
    res.status(500).json({ error: 'Server error' }); 
  }
});

// PUT /api/campsites/:id (protected) - Update campsite (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const camp = await Campsite.findById(req.params.id);
    if (!camp) return res.status(404).json({ error: 'Campsite not found' });
    
    // Check if user is the owner
    if (camp.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this campsite' });
    }
    
    const { name, location, lat, lon, images = [], description = '', facilities = [], tags = [] } = req.body;
    
    // Same validation as POST
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }
    
    if (!description || description.length < 50) {
      return res.status(400).json({ error: 'Description must be at least 50 characters long' });
    }
    
    const coordinates = (typeof lat === 'number' && typeof lon === 'number') ? [lat, lon] : undefined;
    
    const updatedCamp = await Campsite.findByIdAndUpdate(
      req.params.id,
      { 
        name: name.trim(), 
        location: location.trim(), 
        coordinates, 
        images: images.filter(img => img.trim()), 
        description: description.trim(), 
        facilities: facilities.filter(f => f.trim()), 
        tags: tags.filter(t => t.trim())
      },
      { new: true }
    );
    
    res.json(updatedCamp);
  } catch (e) { 
    console.error('Error updating campsite:', e);
    res.status(500).json({ error: 'Server error' }); 
  }
});

// DELETE /api/campsites/:id (protected) - Delete campsite (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const camp = await Campsite.findById(req.params.id);
    if (!camp) return res.status(404).json({ error: 'Campsite not found' });
    
    // Check if user is the owner
    if (camp.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this campsite' });
    }
    
    await Campsite.findByIdAndDelete(req.params.id);
    res.json({ message: 'Campsite deleted successfully' });
  } catch (e) { 
    console.error('Error deleting campsite:', e);
    res.status(500).json({ error: 'Server error' }); 
  }
});

module.exports = router;
