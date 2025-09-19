const mongoose = require('mongoose');
const Campsite = require('../models/Campsite');

// All 30 campsites from your original static data
const allCampsites = [
  // USA National Parks (1-10)
  {
    name: "Yosemite National Park",
    location: "California, USA",
    coordinates: [37.8651, -119.5383],
    description: "Iconic views, diverse wildlife, rock climbing, and waterfalls. Known for its granite cliffs, giant sequoia groves, and breathtaking vistas, Yosemite is a bucket-list destination for nature lovers.",
    images: ["https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["National Park", "Hiking", "Scenic Views", "Family Friendly", "Rock Climbing"]
  },
  {
    name: "Yellowstone National Park",
    location: "Wyoming, USA",
    coordinates: [44.4280, -110.5885],
    description: "Geysers, hot springs, and abundant wildlife. Famous for Old Faithful and the Grand Prismatic Spring, Yellowstone offers a unique geothermal experience combined with breathtaking landscapes.",
    images: ["https://images.pexels.com/photos/800910/pexels-photo-800910.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["National Park", "Geysers", "Wildlife", "Family Friendly", "Hot Springs"]
  },
  {
    name: "Zion National Park",
    location: "Utah, USA",
    coordinates: [37.2982, -113.0263],
    description: "Dramatic canyons, challenging hikes, and scenic vistas. Zion is celebrated for its steep red cliffs and forest trails along the Virgin River, including the famous Narrows hike.",
    images: ["https://images.pexels.com/photos/1684931/pexels-photo-1684931.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["National Park", "Canyons", "Hiking", "Adventure", "Red Rocks"]
  },
  {
    name: "Grand Canyon National Park",
    location: "Arizona, USA",
    coordinates: [36.1069, -112.1129],
    description: "Stunning canyon views, hiking, and rafting. The world-famous Grand Canyon offers incredible layered bands of red rock, hiking trails, and rafting experiences along the Colorado River.",
    images: ["https://images.pexels.com/photos/272474/pexels-photo-272474.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["National Park", "Canyon", "Hiking", "Scenic Views", "Colorado River"]
  },
  {
    name: "Great Smoky Mountains National Park",
    location: "Tennessee/North Carolina, USA",
    coordinates: [35.6870, -83.5102],
    description: "Rich biodiversity, historical sites, and scenic drives. A UNESCO World Heritage Site, this park is renowned for its mist-covered mountains, scenic drives, and historical landmarks.",
    images: ["https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["National Park", "Mountains", "Hiking", "Historical", "UNESCO"]
  },

  // Europe (11-20)
  {
    name: "Camping Jungfrau",
    location: "Switzerland",
    coordinates: [46.5769, 7.9905],
    description: "Stunning mountain views, proximity to Jungfrau region. Nestled in the Lauterbrunnen valley, this campsite offers dramatic views of the Swiss Alps and access to iconic peaks.",
    images: ["https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Fire Pit", "BBQ", "Hiking"],
    tags: ["Mountains", "Swiss Alps", "Scenic Views", "Europe", "Adventure"]
  },
  {
    name: "Camping Le Sérignan Plage",
    location: "France",
    coordinates: [43.3261, 3.3056],
    description: "Beachfront location, family-friendly amenities. A top destination on the Mediterranean coast of France, known for its sandy beaches and extensive family-friendly facilities.",
    images: ["https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Beach", "BBQ", "Hiking"],
    tags: ["Beach", "Mediterranean", "Family Friendly", "France", "Coastal"]
  },
  {
    name: "Camping Ca'Savio",
    location: "Italy",
    coordinates: [45.5015, 12.7318],
    description: "Proximity to Venice, sandy beaches, and family activities. Located on the Adriatic coast, this campsite provides easy access to Venice by boat while offering a relaxing beach holiday.",
    images: ["https://images.pexels.com/photos/163273/gondola-gondolier-canal-channel-163273.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Beach", "BBQ", "Hiking"],
    tags: ["Beach", "Venice", "Italy", "Adriatic", "Cultural"]
  },
  {
    name: "Camping Bled",
    location: "Slovenia",
    coordinates: [46.3625, 14.0944],
    description: "Beautiful lake views, outdoor activities, and charming surroundings. Located on the shores of the stunning Lake Bled, this campsite is a perfect base for exploring the Julian Alps.",
    images: ["https://images.pexels.com/photos/210214/pexels-photo-210214.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Lake", "BBQ", "Hiking"],
    tags: ["Lake", "Slovenia", "Alps", "Scenic Views", "Peaceful"]
  },
  {
    name: "Camping Santa Elena",
    location: "Spain",
    coordinates: [41.7000, 2.8333],
    description: "Close to beaches, vibrant local culture. Located near the vibrant town of Lloret de Mar on the Costa Brava, this campsite is perfect for combining beach life with cultural experiences.",
    images: ["https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Beach", "BBQ", "Hiking"],
    tags: ["Beach", "Spain", "Costa Brava", "Cultural", "Mediterranean"]
  },

  // India (21-30)
  {
    name: "Kumarakom Backwaters",
    location: "Kerala, India",
    coordinates: [9.6177, 76.4274],
    description: "Backwater views, houseboat stays, and lush greenery. Experience the tranquil backwaters of Kerala with houseboat camping on Vembanad Lake, surrounded by lush paddy fields.",
    images: ["https://images.pexels.com/photos/159497/river-boat-travel-tour-159497.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Houseboat", "BBQ", "Nature"],
    tags: ["Backwaters", "Houseboat", "Kerala", "Peaceful", "Nature"]
  },
  {
    name: "Rishikesh",
    location: "Uttarakhand, India",
    coordinates: [30.0869, 78.2676],
    description: "River camping, adventure activities, and yoga retreats. Known as the Yoga Capital of the World, Rishikesh offers riverside camping, adventure sports like rafting, and spiritual retreats.",
    images: ["https://images.pexels.com/photos/791810/pexels-photo-791810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "River", "BBQ", "Yoga"],
    tags: ["River", "Adventure", "Yoga", "Spiritual", "Rafting"]
  },
  {
    name: "Chopta",
    location: "Uttarakhand, India",
    coordinates: [30.5931, 79.1488],
    description: "Scenic views, trekking opportunities, and serene environment. Often called the 'Mini Switzerland of India', Chopta offers stunning Himalayan views and is the base for treks to Tungnath.",
    images: ["https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Mountain", "BBQ", "Trekking"],
    tags: ["Mountain", "Trekking", "Himalayan", "Mini Switzerland", "Peaceful"]
  },
  {
    name: "Manali",
    location: "Himachal Pradesh, India",
    coordinates: [32.2396, 77.1887],
    description: "Adventure activities, scenic views, and diverse landscapes. A hub for adventure, Manali offers camping with breathtaking views of the Pir Panjal range, trekking, and access to Solang Valley.",
    images: ["https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Mountain", "BBQ", "Adventure"],
    tags: ["Mountain", "Adventure", "Himachal", "Solang Valley", "Trekking"]
  },
  {
    name: "Dharamshala",
    location: "Himachal Pradesh, India",
    coordinates: [32.2196, 76.3234],
    description: "Tibetan culture, mountain views, and tranquility. Home to the Dalai Lama, Dharamshala offers a unique blend of Tibetan culture and serene Himalayan views, perfect for peaceful camping.",
    images: ["https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"],
    facilities: ["Restrooms", "Showers", "Wi-Fi", "Parking", "Pet Friendly", "Water", "Mountain", "BBQ", "Meditation"],
    tags: ["Mountain", "Tibetan Culture", "Peaceful", "Spiritual", "Dalai Lama"]
  }
];

async function migrateAll() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/woodsandwild');
    console.log('✅ Connected to MongoDB');

    // Check existing campsites
    const count = await Campsite.countDocuments();
    console.log(`📊 Found ${count} existing campsites`);

    // Insert all campsites
    const result = await Campsite.insertMany(allCampsites);
    console.log(`🎉 Successfully added ${result.length} campsites!`);

    // Show breakdown by region
    const usaCamps = allCampsites.filter(c => c.location.includes('USA')).length;
    const europeCamps = allCampsites.filter(c => ['Switzerland', 'France', 'Italy', 'Slovenia', 'Spain'].some(country => c.location.includes(country))).length;
    const indiaCamps = allCampsites.filter(c => c.location.includes('India')).length;

    console.log(`\n📍 Regional Breakdown:`);
    console.log(`   🇺🇸 USA: ${usaCamps} campsites`);
    console.log(`   🇪🇺 Europe: ${europeCamps} campsites`);
    console.log(`   🇮🇳 India: ${indiaCamps} campsites`);

    // Show total count
    const newCount = await Campsite.countDocuments();
    console.log(`\n📈 Total campsites in database: ${newCount}`);
    console.log(`🎯 Migration complete! All campsites are now unified in MongoDB.`);

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

migrateAll();
