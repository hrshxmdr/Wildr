 
const express = require('express');
const { getAllCampingSpots, createCampingSpot } = require('../controllers/campingSpotController');

const router = express.Router();

router.get('/', getAllCampingSpots);
router.post('/', createCampingSpot);

module.exports = router;
