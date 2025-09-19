# Real-Time Weather Setup Guide

This application now includes real-time weather information for each campsite! Here's how to set it up:

## 🌤️ Features Added

- **Real-time current weather** for each campsite location
- **5-day weather forecast** with detailed conditions
- **Weather icons** showing current conditions
- **Detailed weather metrics** including temperature, humidity, wind speed, and visibility
- **Automatic fallback** to mock data if API is unavailable

## 🔧 Setup Instructions

### 1. Get a Free Weather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### 2. Configure Your Environment

1. In the `woods-wild-frontend` folder, create a `.env` file
2. Add your API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
   ```
3. Save the file

### 3. Restart Your Application

```bash
npm start
```

## 🗺️ How It Works

- Each campsite now has precise latitude/longitude coordinates
- Weather data is fetched from OpenWeatherMap API using these coordinates
- If no API key is provided, the app gracefully falls back to mock weather data
- Weather updates automatically when you visit different campsite pages

## 📍 Supported Locations

The app now includes real coordinates for major campsites including:

### USA National Parks
- Yosemite National Park, California
- Yellowstone National Park, Wyoming  
- Zion National Park, Utah
- Grand Canyon National Park, Arizona
- Great Smoky Mountains National Park, Tennessee/North Carolina
- Olympic National Park, Washington

### European Campsites
- Camping Jungfrau, Switzerland
- Various locations in France, Italy, Croatia, Slovenia, and Spain

### Indian Destinations
- Kumarakom Backwaters, Kerala
- Rishikesh, Uttarakhand
- And many more beautiful locations across India

## 🔄 Fallback System

Don't worry if you don't have an API key yet! The app includes:
- Automatic fallback to realistic mock weather data
- Error handling for API failures
- Graceful degradation if coordinates are missing

## 🎯 Next Steps

To get the most accurate weather data:
1. Set up your API key as described above
2. The free tier includes 1,000 API calls per day
3. Weather data updates each time you visit a campsite page

Enjoy planning your camping adventures with real-time weather information! 🏕️
