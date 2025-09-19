const mongoose = require('mongoose');
const Campsite = require('../models/Campsite');

// Static campsite data (first 5 for testing)
const campsiteData = [
  {
    id: 1,
    name: 'Yosemite National Park',
    description: 'Iconic views, diverse wildlife, rock climbing, and waterfalls. Known for its granite cliffs, giant sequoia groves, and breathtaking vistas, Yosemite is a bucket-list destination for nature lovers.',
    location: 'California, USA',
    coordinates: [37.8651, -119.5383],
    images: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
      'https://images.pexels.com/photos/3889853/pexels-photo-3889853.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
      'https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1'
    ],
    tags: ['Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station']
  },
  {
    id: 2,
    name: 'Yellowstone National Park',
    description: 'Geysers, hot springs, and abundant wildlife. Famous for Old Faithful and the Grand Prismatic Spring, Yellowstone offers a unique geothermal experience combined with breathtaking landscapes.',
    location: 'Wyoming, USA',
    coordinates: [44.4280, -110.5885],
    images: [
      'https://images.pexels.com/photos/800910/pexels-photo-800910.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
      'https://images.pexels.com/photos/236622/pexels-photo-236622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
      'https://images.pexels.com/photos/377713/pexels-photo-377713.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1'
    ],
    tags: ['Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station']
  }
  // Add more campsites here...
];

async function migrateCampsites() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woodsandwild');
    console.log('Connected to MongoDB');

    // Clear existing campsites (optional - remove this line if you want to keep existing data)
    // await Campsite.deleteMany({});
    // console.log('Cleared existing campsites');

    // Transform and insert data
    const transformedData = campsiteData.map(campsite => ({
      name: campsite.name,
      location: campsite.location,
      coordinates: campsite.coordinates,
      images: campsite.images,
      description: campsite.description,
      facilities: campsite.tags || [], // Using tags as facilities
      tags: campsite.tags || [],
      ratingAvg: 0,
      ratingCount: 0
    }));

    // Insert campsites
    const result = await Campsite.insertMany(transformedData);
    console.log(`Successfully migrated ${result.length} campsites`);

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateCampsites();
