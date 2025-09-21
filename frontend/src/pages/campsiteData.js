const campsiteData = [
  // USA
  {
    id: 1,
    name: 'Yosemite National Park',
    description: 'Iconic views, diverse wildlife, rock climbing, and waterfalls. Known for its granite cliffs, giant sequoia groves, and breathtaking vistas, Yosemite is a bucket-list destination for nature lovers.',
    location: 'California, USA',
    coordinates: [37.8651, -119.5383],
    images: [
      {
        url: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Yosemite Valley with granite cliffs and meadows',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/3889853/pexels-photo-3889853.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Tunnel View of Yosemite Valley (Half Dome, El Capitan, Bridalveil Fall)',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2382868/pexels-photo-2382868.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Yosemite Falls in full flow',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=37.8651,-119.5383',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=37.8651&lon=-119.5383&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 2,
    name: 'Yellowstone National Park',
    description: 'Geysers, hot springs, and abundant wildlife. Famous for Old Faithful and the Grand Prismatic Spring, Yellowstone offers a unique geothermal experience combined with breathtaking landscapes.',
    location: 'Wyoming, USA',
    coordinates: [44.4280, -110.5885],
    images: [
      {
        url: 'https://images.pexels.com/photos/800910/pexels-photo-800910.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Grand Prismatic Spring from above',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/236622/pexels-photo-236622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Bison grazing in Yellowstone field',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/377713/pexels-photo-377713.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lower Falls of the Yellowstone River',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/800910/pexels-photo-800910.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=44.4280,-110.5885',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=44.4280&lon=-110.5885&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 3,
    name: 'Zion National Park',
    description: 'Dramatic canyons, challenging hikes, and scenic vistas. Zion is celebrated for its steep red cliffs and forest trails along the Virgin River, including the famous Narrows hike.',
    location: 'Utah, USA',
    coordinates: [37.2982, -113.0263],
    images: [
      {
        url: 'https://images.pexels.com/photos/1684931/pexels-photo-1684931.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: "View from Angel's Landing",
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1586141/pexels-photo-1586141.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'The Narrows slot canyon hike',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sandstone cliffs and the Virgin River',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1684931/pexels-photo-1684931.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=37.2982,-113.0263',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=37.2982&lon=-113.0263&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 4,
    name: 'Grand Canyon National Park',
    description: 'Stunning canyon views, hiking, and rafting. The world-famous Grand Canyon offers incredible layered bands of red rock, hiking trails, and rafting experiences along the Colorado River.',
    location: 'Arizona, USA',
    coordinates: [36.1069, -112.1129],
    images: [
      {
        url: 'https://images.pexels.com/photos/272474/pexels-photo-272474.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'View from the South Rim at sunset',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Horseshoe Bend overlook on the Colorado River',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Layers of red rock in the Grand Canyon',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/272474/pexels-photo-272474.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=36.1069,-112.1129',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=36.1069&lon=-112.1129&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 5,
    name: 'Great Smoky Mountains National Park',
    description: 'Rich biodiversity, historical sites, and scenic drives. A UNESCO World Heritage Site, this park is renowned for its mist-covered mountains, scenic drives, and historical landmarks.',
    location: 'Tennessee/North Carolina, USA',
    coordinates: [35.6870, -83.5102],
    images: [
      {
        url: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Smoky Mountains layered ridges at sunrise',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1796706/pexels-photo-1796706.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Cades Cove valley and historic fields',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Misty forest path in the Great Smoky Mountains',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=35.6870,-83.5102',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=35.6870&lon=-83.5102&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 6,
    name: 'Olympic National Park',
    description: 'Rainforests, mountains, and diverse ecosystems. Olympic features diverse ecosystems, including temperate rainforests, rugged mountains, and a wide variety of flora and fauna.',
    location: 'Washington, USA',
    coordinates: [47.8021, -123.6044],
    images: [
      {
        url: 'https://images.pexels.com/photos/1578997/pexels-photo-1578997.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Hoh Rain Forest mossy trail',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Hurricane Ridge alpine views',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/40896/pexels-photo-40896.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sea stacks at Ruby Beach',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1578997/pexels-photo-1578997.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=47.8021,-123.6044',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=47.8021&lon=-123.6044&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 7,
    name: 'Acadia National Park',
    description: 'Coastal views, rocky shores, and mountain trails. With its coastal views, rocky shores, and mountain trails, Acadia is a dream destination for seaside landscapes and forested hikes.',
    location: 'Maine, USA',
    coordinates: [44.3386, -68.2733],
    images: [
      {
        url: 'https://images.pexels.com/photos/1032654/pexels-photo-1032654.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Rocky coastline of Acadia National Park',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'View from Cadillac Mountain summit',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Jordan Pond with the Bubbles in background',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1032654/pexels-photo-1032654.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=44.3386,-68.2733',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=44.3386&lon=-68.2733&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 8,
    name: 'Grand Teton National Park',
    description: 'Majestic peaks, alpine lakes, and wildlife. This park is famous for the dramatic Teton Range, pristine lakes, and abundant wildlife viewing opportunities.',
    location: 'Wyoming, USA',
    coordinates: [43.7904, -110.6818],
    images: [
      {
        url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Grand Teton reflected in a lake at sunrise',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2188012/pexels-photo-2188012.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Oxbow Bend with mountain reflection',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/326240/pexels-photo-326240.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Fall colors in the park',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=43.7904,-110.6818',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=43.7904&lon=-110.6818&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 9,
    name: 'Rocky Mountain National Park',
    description: 'High-altitude trails, alpine lakes, and rugged peaks. This park spans the Continental Divide and is known for its stunning mountain environments, alpine tundra, and scenic Trail Ridge Road.',
    location: 'Colorado, USA',
    coordinates: [40.3428, -105.6836],
    images: [
      {
        url: 'https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Dream Lake with Hallett Peak',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Bear Lake shoreline and pines',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Elk in an alpine meadow',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=40.3428,-105.6836',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=40.3428&lon=-105.6836&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },
  {
    id: 10,
    name: 'Shenandoah National Park',
    description: 'Skyline Drive, waterfalls, and scenic views. Extending along the Blue Ridge Mountains, this park offers stunning vistas from Skyline Drive and numerous hiking trails to waterfalls.',
    location: 'Virginia, USA',
    coordinates: [38.5251, -78.3460],
    images: [
      {
        url: 'https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Skyline Drive overlooks and ridgelines',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/5439/earth-home-house-building.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Dark Hollow Falls cascade',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Blue Ridge Mountains in autumn',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/2832061/pexels-photo-2832061.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=38.5251,-78.3460',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=38.5251&lon=-78.3460&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking','Electric Hookups','Dump Station' ]
  },

  // Europe
  {
    id: 11,
    name: 'Camping Jungfrau',
    description: 'Stunning mountain views, proximity to Jungfrau region. Nestled in the Lauterbrunnen valley, this campsite offers dramatic views of the Swiss Alps and access to iconic peaks.',
    location: 'Switzerland',
    coordinates: [46.5769, 7.9905],
    images: [
      {
        url: 'https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Jungfrau massif from Kleine Scheidegg',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lauterbrunnen Valley near the campsite',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1660623/pexels-photo-1660623.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'View of the Swiss Alps',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=46.5769,7.9905',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=46.5769&lon=7.9905&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking' ]
  },
  {
    id: 12,
    name: 'Camping Le Sérignan Plage',
    description: 'Beachfront location, family-friendly amenities. A top destination on the Mediterranean coast of France, known for its sandy beaches and extensive family-friendly facilities.',
    location: 'France',
    coordinates: [43.3261, 3.3056],
    images: [
      {
        url: 'https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sérignan Plage beach on the Mediterranean',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sandy coastline in Occitanie',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Dunes and sea grass along the coast',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=43.3261,3.3056',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=43.3261&lon=3.3056&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking' ]
  },
  {
    id: 13,
    name: 'Camping Ca\'Savio',
    description: 'Proximity to Venice, sandy beaches, and family activities. Located on the Adriatic coast, this campsite provides easy access to Venice by boat while offering a relaxing beach holiday.',
    location: 'Italy',
    coordinates: [45.5015, 12.7318],
    images: [
      {
        url: 'https://images.pexels.com/photos/163273/gondola-gondolier-canal-channel-163273.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Gondolas in Venice (accessible by boat)',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Venice St. Mark’s Square',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Colorful houses of nearby Burano',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/163273/gondola-gondolier-canal-channel-163273.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=45.5015,12.7318',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=45.5015&lon=12.7318&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking' ]
  },
  {
    id: 14,
    name: 'Camping Les Ormes',
    description: 'Water park, golf, and varied activities. Located in a historic estate in Brittany, this resort offers a wide range of activities from a water park to horse riding and golf.',
    location: 'France',
    coordinates: [48.5284, -2.0043],
    images: [
      {
        url: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Historic ramparts of nearby Saint-Malo',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2361/nature-animal-tree-clouds.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Mont Saint-Michel (day trip from the region)',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Countryside landscapes in Ille-et-Vilaine',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=48.5284,-2.0043',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=48.5284&lon=-2.0043&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Fire Pit','BBQ','Hiking' ]
  },
  {
    id: 15,
    name: 'Camping Park Umag',
    description: 'Coastal location, water sports, and family-friendly. Situated on the Istrian coast, this large campsite offers direct access to the Adriatic Sea, pools, and numerous sports facilities.',
    location: 'Croatia',
    coordinates: [45.3460, 13.5094],
    images: [
      {
        url: 'https://images.pexels.com/photos/161483/croatia-road-sea-coast-161483.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Umag old town on the Adriatic',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Rocky Istrian coastline near Umag',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/39317/pexels-photo-39317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Adriatic sunset along the coast',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/161483/croatia-road-sea-coast-161483.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=45.3460,13.5094',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=45.3460&lon=13.5094&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 16,
    name: 'Camping Bled',
    description: 'Beautiful lake views, outdoor activities, and charming surroundings. Located on the shores of the stunning Lake Bled, this campsite is a perfect base for exploring the Julian Alps.',
    location: 'Slovenia',
    coordinates: [46.3625, 14.0944],
    images: [
      {
        url: 'https://images.pexels.com/photos/210214/pexels-photo-210214.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lake Bled and its island church',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1428616/pexels-photo-1428616.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Bled Castle overlooking Lake Bled',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/260592/pexels-photo-260592.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Traditional pletna boats on Lake Bled',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/210214/pexels-photo-210214.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=46.3625,14.0944',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=46.3625&lon=14.0944&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 17,
    name: 'Camping du Lac',
    description: 'Lakeside location, serene environment, and recreational activities. Located next to a peaceful lake in central France, this campsite offers a serene environment with opportunities for relaxation and water activities.',
    location: 'France',
    coordinates: [46.5000, 2.5833],
    images: [
      {
        url: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lakeside landscape near campsite',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1586252/pexels-photo-1586252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Countryside walking paths',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sunset over a tranquil lake',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=46.5000,2.5833',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=46.5000&lon=2.5833&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 18,
    name: 'Camping Lanterna',
    description: 'Beach access, extensive amenities, and natural surroundings. This coastal campsite offers direct beach access and a range of amenities, making it a favorite for a mix of relaxation and outdoor fun.',
    location: 'Croatia',
    coordinates: [45.1223, 13.5818],
    images: [
      {
        url: 'https://images.pexels.com/photos/3159957/pexels-photo-3159957.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Poreč old town near Lanterna',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Istrian peninsula coastline',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Pebble beach on the Adriatic',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/3159957/pexels-photo-3159957.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=45.1223,13.5818',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=45.1223&lon=13.5818&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 19,
    name: 'Camping Bella Italia',
    description: 'Lakeside setting, various recreational facilities. Situated by Lake Garda, this campsite offers a variety of recreational facilities for families and outdoor lovers, with stunning lake views.',
    location: 'Italy',
    coordinates: [45.5100, 10.6700],
    images: [
      {
        url: 'https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lake Garda views near campsite',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2224765/pexels-photo-2224765.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sirmione on Lake Garda',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/259468/pexels-photo-259468.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Desenzano del Garda harbor',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/592077/pexels-photo-592077.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=45.5100,10.6700',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=45.5100&lon=10.6700&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 20,
    name: 'Camping Santa Elena',
    description: 'Close to beaches, vibrant local culture. Located near the vibrant town of Lloret de Mar on the Costa Brava, this campsite is perfect for combining beach life with cultural experiences.',
    location: 'Spain',
    coordinates: [41.7000, 2.8333],
    images: [
      {
        url: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lloret de Mar beach (Costa Brava)',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Costa Brava rugged coastline',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Nearby Tossa de Mar castle and beach',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=41.7000,2.8333',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=41.7000&lon=2.8333&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },

  // India
  {
    id: 21,
    name: 'Kumarakom Backwaters',
    description: 'Backwater views, houseboat stays, and lush greenery. Experience the tranquil backwaters of Kerala with houseboat camping on Vembanad Lake, surrounded by lush paddy fields.',
    location: 'Kerala, India',
    coordinates: [9.6177, 76.4274],
    images: [
      {
        url: 'https://images.pexels.com/photos/159497/river-boat-travel-tour-159497.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Houseboat on Vembanad Lake',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/247851/pexels-photo-247851.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Vembanad backwaters at sunset',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1499981/pexels-photo-1499981.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Kumarakom backwater channels',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/159497/river-boat-travel-tour-159497.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=9.6177,76.4274',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=9.6177&lon=76.4274&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 22,
    name: 'Rishikesh',
    description: 'River camping, adventure activities, and yoga retreats. Known as the Yoga Capital of the World, Rishikesh offers riverside camping, adventure sports like rafting, and spiritual retreats.',
    location: 'Uttarakhand, India',
    coordinates: [30.0869, 78.2676],
    images: [
      {
        url: 'https://images.pexels.com/photos/791810/pexels-photo-791810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Lakshman Jhula suspension bridge',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Ganga river flowing through Rishikesh',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'White-water rafting near Rishikesh',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/791810/pexels-photo-791810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=30.0869,78.2676',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=30.0869&lon=78.2676&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','River','BBQ','Hiking' ]
  },
  {
    id: 23,
    name: 'Chopta',
    description: 'Scenic views, trekking opportunities, and serene environment. Often called the "Mini Switzerland of India", Chopta offers stunning Himalayan views and is the base for treks to Tungnath.',
    location: 'Uttarakhand, India',
    coordinates: [30.5931, 79.1488],
    images: [
      {
        url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Tungnath temple near Chopta',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Alpine meadows in Chopta',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'View from Chandrashila summit',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=30.5931,79.1488',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=30.5931&lon=79.1488&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Mountain','BBQ','Hiking' ]
  },
  {
    id: 24,
    name: 'Pondicherry',
    description: 'Beachfront camping, colonial charm, and relaxed ambiance. Pondicherry’s beachfront camping and French Quarter offer a unique blend of colonial history and relaxation by the sea.',
    location: 'Tamil Nadu, India',
    coordinates: [11.9416, 79.8083],
    images: [
      {
        url: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Promenade Beach in Pondicherry',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Colorful streets of the French Quarter',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sunrise over the Bay of Bengal',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=11.9416,79.8083',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=11.9416&lon=79.8083&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Beach','BBQ','Hiking' ]
  },
  {
    id: 25,
    name: 'Jaisalmer',
    description: 'Desert camping, cultural experiences, and sand dunes. In the heart of the Thar Desert, Jaisalmer offers desert camping, cultural performances, and camel safaris on majestic sand dunes.',
    location: 'Rajasthan, India',
    coordinates: [26.9157, 70.9083],
    images: [
      {
        url: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Sam Sand Dunes near Jaisalmer',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/3889870/pexels-photo-3889870.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Jaisalmer Fort (Sonar Quila)',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/162399/camel-ride-desert-safari-162399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Camel safari in the Thar Desert',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=26.9157,70.9083',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=26.9157&lon=70.9083&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Desert','BBQ','Hiking' ]
  },
  {
    id: 26,
    name: 'Munnar',
    description: 'Tea plantations, cool climate, and lush landscapes. Famous for its rolling hills covered in tea estates, Munnar is a refreshing hill station in the Western Ghats.',
    location: 'Kerala, India',
    coordinates: [10.0889, 77.0595],
    images: [
      {
        url: 'https://images.pexels.com/photos/1579240/pexels-photo-1579240.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Tea plantations in Munnar',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Munnar valley landscape',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Misty morning over the tea hills',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1579240/pexels-photo-1579240.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=10.0889,77.0595',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=10.0889&lon=77.0595&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Mountain','BBQ','Hiking' ]
  },
  {
    id: 27,
    name: 'Nainital',
    description: 'Lake views, hill station ambiance, and natural beauty. Famous for its pear-shaped Naini Lake, this hill station offers beautiful camping spots with stunning views of the surrounding Kumaon hills.',
    location: 'Uttarakhand, India',
    coordinates: [29.3919, 79.4542],
    images: [
      {
        url: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Naini Lake at evening',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'View of Nainital town from above',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Himalayan peaks visible from Nainital',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=29.3919,79.4542',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=29.3919&lon=79.4542&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Lake','BBQ','Hiking' ]
  },
  {
    id: 28,
    name: 'Manali',
    description: 'Adventure activities, scenic views, and diverse landscapes. A hub for adventure, Manali offers camping with breathtaking views of the Pir Panjal range, trekking, and access to Solang Valley.',
    location: 'Himachal Pradesh, India',
    coordinates: [32.2396, 77.1887],
    images: [
      {
        url: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Solang Valley near Manali',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Hadimba Devi Temple in Manali',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Beas River flowing through Manali',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=32.2396,77.1887',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=32.2396&lon=77.1887&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Mountain','BBQ','Hiking' ]
  },
  {
    id: 29,
    name: 'Hampi',
    description: 'Historical ruins, unique landscapes, and cultural experiences. Known for its UNESCO World Heritage ruins and unique boulder-strewn landscape, Hampi offers a cultural camping experience.',
    location: 'Karnataka, India',
    coordinates: [15.3350, 76.4600],
    images: [
      {
        url: 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Virupaksha Temple complex in Hampi',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Stone Chariot at Vittala Temple',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Granite boulder landscape of Hampi',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=15.3350,76.4600',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=15.3350&lon=76.4600&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Historic','BBQ','Hiking' ]
  },
  {
    id: 30,
    name: 'Dharamshala',
    description: 'Tibetan culture, mountain views, and tranquility. Home to the Dalai Lama, Dharamshala offers a unique blend of Tibetan culture and serene Himalayan views, perfect for peaceful camping.',
    location: 'Himachal Pradesh, India',
    coordinates: [32.2196, 76.3234],
    images: [
      {
        url: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'View of the Dhauladhar mountain range',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Triund trek views above Dharamshala',
        credit: 'Pexels'
      },
      {
        url: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
        caption: 'Namgyal Monastery in Dharamshala',
        credit: 'Pexels'
      }
    ],
    coverImage: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=32.2196,76.3234',
    weatherLink: 'https://openweathermap.org/weathermap?basemap=map&cities=true&lat=32.2196&lon=76.3234&zoom=8',
    tags: [ 'Restrooms','Showers','Wi-Fi','Parking','Pet Friendly','Water','Mountain','BBQ','Hiking' ]
  }
];

export default campsiteData;