# Campsite Data Migration Guide

This guide will help you migrate your static campsite data from the frontend to your MongoDB database, making all campsites (including user-submitted ones) appear together in your application.

## 🎯 What This Migration Does

- **Before**: Static campsites in `campsiteData.js` + User campsites in MongoDB (separate)
- **After**: All campsites unified in MongoDB database
- **Result**: User-submitted campsites now appear alongside existing ones

## 📋 Prerequisites

1. MongoDB server running
2. Backend server configured with database connection
3. Environment variables set up (MONGODB_URI)

## 🚀 Migration Steps

### Step 1: Choose Your Migration

Navigate to your backend directory and choose one of these options:

**Option A: Quick Migration (7 sample campsites)**
```bash
cd backend
npm run migrate
```

**Option B: Full Migration (25 comprehensive campsites)**
```bash
cd backend
npm run migrate:full
```

The full migration includes:
- 🇺🇸 **USA**: 5 National Parks (Yosemite, Yellowstone, Zion, Grand Canyon, Great Smoky Mountains)
- 🇪🇺 **Europe**: 5 Premium campsites (Switzerland, France, Italy, Slovenia, Spain)  
- 🇮🇳 **India**: 5 Diverse locations (Kerala backwaters, Himalayan treks, spiritual retreats)

This will:
- Connect to your MongoDB database
- Insert comprehensive campsite data
- Show regional breakdown and confirmation

### Step 2: Verify Migration

Check your database to confirm campsites were added:

```bash
# If using MongoDB Compass, connect and check the 'campsites' collection
# Or use MongoDB shell:
mongosh
use woodsandwild
db.campsites.count()
db.campsites.find().limit(3)
```

### Step 3: Test the Frontend

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. Start your frontend:
   ```bash
   cd ../frontend
   npm start
   ```

3. Visit `/campsites` page - you should now see:
   - Loading spinner while fetching data
   - Campsites loaded from database
   - User-submitted campsites mixed with migrated ones

## 🔧 Troubleshooting

### Migration Script Issues

**Error: "Cannot connect to MongoDB"**
- Check if MongoDB is running
- Verify MONGODB_URI in your environment variables
- Default connection: `mongodb://localhost:27017/woodsandwild`

**Error: "Campsites already exist"**
- The script prevents duplicate migrations
- To force re-migration, clear existing data first:
  ```javascript
  // Add this line to migrate.js before insertion:
  await Campsite.deleteMany({});
  ```

### Frontend Issues

**Error: "Failed to load campsites"**
- Check if backend server is running
- Verify API endpoint `/api/campsites` is accessible
- Check browser console for detailed error messages

**Campsites not showing**
- Verify migration completed successfully
- Check network tab in browser dev tools
- Ensure API returns data: `GET http://localhost:5000/api/campsites`

## 📊 What's Changed

### Files Modified:
- ✅ `backend/scripts/migrate.js` - Migration script
- ✅ `frontend/src/pages/CampsitesPage.js` - Now fetches from API
- ✅ `backend/package.json` - Added migrate script

### New Features:
- 🔄 Loading states while fetching campsites
- ❌ Error handling for API failures
- 🔄 Retry functionality
- 📱 Unified data source for all campsites

## 🎉 Success Indicators

✅ Migration script runs without errors
✅ Database contains campsite documents
✅ Frontend loads campsites from API
✅ User-submitted campsites appear in main list
✅ Search and filters work with API data

## 🧹 Optional Cleanup

After confirming everything works, you can optionally:

1. Remove static data file:
   ```bash
   # Move or delete the old static data
   mv frontend/src/pages/campsiteData.js frontend/src/pages/campsiteData.js.backup
   ```

2. Remove unused imports in other components that might reference the old static data

## 🔄 Adding More Static Data

To add more of your original 30 campsites to the migration:

1. Edit `backend/scripts/migrate.js`
2. Add more campsite objects to the `sampleCampsites` array
3. Run `npm run migrate` again (after clearing existing data if needed)

## 📞 Need Help?

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your MongoDB connection
3. Ensure all dependencies are installed
4. Test API endpoints manually using a tool like Postman

---

**🎯 Goal Achieved**: Your campsite data is now unified in MongoDB, and user-submitted campsites will appear alongside the migrated ones!
