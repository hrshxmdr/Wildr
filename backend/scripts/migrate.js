const mongoose = require('mongoose');
const Campsite = require('../models/Campsite');

// Comprehensive campsite data from your original static file
const sampleCampsites = [
  {
    name: "Yosemite National Park",
    location: "California, USA",
    coordinates: [37.8651, -119.5383],
    description: "Iconic views, diverse wildlife, rock climbing, and waterfalls. Known for its granite cliffs, giant sequoia groves, and breathtaking vistas, Yosemite is a bucket-list destination for nature lovers.",
    images: [
      "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/3889853/pexels-photo-3889853.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking", "Electric Hookups", "Dump Station"],
    tags: ["National Park", "Hiking", "Scenic Views", "Family Friendly", "Rock Climbing"]
  },
  {
    name: "Yellowstone National Park",
    location: "Wyoming, USA", 
    coordinates: [44.4280, -110.5885],
    description: "Geysers, hot springs, and abundant wildlife. Famous for Old Faithful and the Grand Prismatic Spring, Yellowstone offers a unique geothermal experience combined with breathtaking landscapes.",
    images: [
      "https://images.pexels.com/photos/800910/pexels-photo-800910.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/236622/pexels-photo-236622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/377713/pexels-photo-377713.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking", "Electric Hookups", "Dump Station"],
    tags: ["National Park", "Geysers", "Wildlife", "Family Friendly", "Hot Springs"]
  },
  {
    name: "Zion National Park",
    location: "Utah, USA",
    coordinates: [37.2982, -113.0263],
    description: "Dramatic canyons, challenging hikes, and scenic vistas. Zion is celebrated for its steep red cliffs and forest trails along the Virgin River, including the famous Narrows hike.",
    images: [
      "https://images.pexels.com/photos/1684931/pexels-photo-1684931.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/1586141/pexels-photo-1586141.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking", "Electric Hookups", "Dump Station"],
    tags: ["National Park", "Canyons", "Hiking", "Adventure", "Red Rocks"]
  },
  {
    name: "Rishikesh",
    location: "Uttarakhand, India",
    coordinates: [30.0869, 78.2676],
    description: "River camping, adventure activities, and yoga retreats. Known as the Yoga Capital of the World, Rishikesh offers riverside camping, adventure sports like rafting, and spiritual retreats.",
    images: [
      "https://images.pexels.com/photos/791810/pexels-photo-791810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "River", "BBQ", "Hiking"],
    tags: ["River", "Adventure", "Yoga", "Spiritual", "White Water Rafting"]
  },
  {
    name: "Kumarakom Backwaters",
    location: "Kerala, India",
    coordinates: [9.6177, 76.4274],
    description: "Backwater views, houseboat stays, and lush greenery. Experience the tranquil backwaters of Kerala with houseboat camping on Vembanad Lake, surrounded by lush paddy fields.",
    images: [
      "https://images.pexels.com/photos/159497/river-boat-travel-tour-159497.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/1499981/pexels-photo-1499981.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Beach", "BBQ", "Hiking"],
    tags: ["Backwaters", "Houseboat", "Peaceful", "Nature", "Kerala"]
  },
  {
    name: "Camping Jungfrau",
    location: "Switzerland",
    coordinates: [46.5769, 7.9905],
    description: "Stunning mountain views, proximity to Jungfrau region. Nestled in the Lauterbrunnen valley, this campsite offers dramatic views of the Swiss Alps and access to iconic peaks.",
    images: [
      "https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["Mountains", "Swiss Alps", "Scenic Views", "Europe", "Adventure"]
  },
  {
    name: "Grand Canyon National Park",
    location: "Arizona, USA",
    coordinates: [36.1069, -112.1129],
    description: "Stunning canyon views, hiking, and rafting. The world-famous Grand Canyon offers incredible layered bands of red rock, hiking trails, and rafting experiences along the Colorado River.",
    images: [
      "https://images.pexels.com/photos/272474/pexels-photo-272474.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1",
      "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
    ],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking", "Electric Hookups", "Dump Station"],
    tags: ["National Park", "Canyon", "Hiking", "Scenic Views", "Colorado River"]
  }
];

async function migrate() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woodsandwild');
    console.log('✅ Connected to MongoDB');

    // Check existing campsites
    const count = await Campsite.countDocuments();
    console.log(`📊 Found ${count} existing campsites`);

    // Insert sample data
    const result = await Campsite.insertMany(sampleCampsites);
    console.log(`🎉 Successfully added ${result.length} campsites!`);

    // Show total count
    const newCount = await Campsite.countDocuments();
    console.log(`📈 Total campsites in database: ${newCount}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrate();
