const mongoose = require('mongoose');
const Campsite = require('../models/Campsite');

// Function to extract image URLs from the complex image structure
function extractImageUrls(images) {
  if (!images) return [];
  return images.map(img => {
    if (typeof img === 'string') return img;
    if (typeof img === 'object' && img.url) return img.url;
    return null;
  }).filter(Boolean);
}

async function migrateCampsites() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/woodsandwild';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if campsites already exist
    const existingCount = await Campsite.countDocuments();
    console.log(`Found ${existingCount} existing campsites in database`);

    if (existingCount > 0) {
      console.log('Database already contains campsites. Skipping migration.');
      console.log('To force migration, delete existing campsites first.');
      process.exit(0);
    }

    // Static campsite data (copied from frontend)
    const campsiteData = require('./campsiteData.json');
    
    console.log(`Preparing to migrate ${campsiteData.length} campsites...`);

    // Transform data to match database schema
    const transformedData = campsiteData.map(campsite => {
      const imageUrls = extractImageUrls(campsite.images);
      
      return {
        name: campsite.name,
        location: campsite.location,
        coordinates: campsite.coordinates,
        images: imageUrls,
        description: campsite.description,
        facilities: campsite.tags || [], // Using tags as facilities
        tags: campsite.tags || [],
        ratingAvg: 0,
        ratingCount: 0,
        // No owner field - these are system/default campsites
      };
    });

    // Insert all campsites
    const result = await Campsite.insertMany(transformedData);
    console.log(`✅ Successfully migrated ${result.length} campsites to MongoDB!`);

    // Display summary
    console.log('\n📊 Migration Summary:');
    console.log(`- Total campsites migrated: ${result.length}`);
    console.log('- All campsites now available via API');
    console.log('- Ready to update frontend to use API data');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateCampsites();
}

module.exports = { migrateCampsites };
