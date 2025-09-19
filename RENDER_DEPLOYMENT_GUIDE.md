# 🚀 Woods & Wild - Render Deployment Guide

## Prerequisites
1. ✅ GitHub account with your code pushed
2. ✅ Render.com account (free tier available)
3. ✅ MongoDB Atlas account for production database

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user:
   - Database Access → Add New Database User
   - Username: `woodsandwild`
   - Password: Generate a secure password
4. Configure Network Access:
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
5. Get connection string:
   - Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 2: Deploy Backend to Render

1. **Login to Render** → New + → Web Service
2. **Connect Repository**: Select your GitHub repo
3. **Configure Backend Service**:
   - **Name**: `woodsandwild-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables** (Add these in Render dashboard):
   ```
   MONGODB_URI=mongodb+srv://woodsandwild:YOUR_PASSWORD@cluster.mongodb.net/woodsandwild
   JWT_SECRET=your_super_secure_jwt_secret_here_make_it_long_and_random
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://woodsandwild.onrender.com
   ```

5. **Click "Create Web Service"**

## Step 3: Deploy Frontend to Render

1. **In Render** → New + → Static Site
2. **Connect Repository**: Same GitHub repo
3. **Configure Frontend**:
   - **Name**: `woodsandwild`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://woodsandwild-backend.onrender.com/api
   GENERATE_SOURCEMAP=false
   ```

5. **Click "Create Static Site"**

## Step 4: Update URLs (After Deployment)

Once deployed, update the URLs in your code:

1. **Backend CORS** (`backend/server.js`):
   - Replace `'https://woodsandwild.onrender.com'` with your actual frontend URL

2. **Frontend API** (`frontend/src/api.js`):
   - Replace `'https://woodsandwild-backend.onrender.com/api'` with your actual backend URL

## Step 5: Run Migration

After backend is deployed:

1. Go to your backend service in Render
2. Open the Shell tab
3. Run: `npm run migrate:full`

## Step 6: Test Your Deployment

1. ✅ Visit your frontend URL
2. ✅ Test user registration/login
3. ✅ Test viewing campsites (should show your migrated data)
4. ✅ Test adding new campsites
5. ✅ Check browser console for errors

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check that frontend URL is in backend CORS configuration
   - Ensure credentials are properly configured

2. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check that IP addresses are whitelisted
   - Ensure database user has proper permissions

3. **Environment Variables**:
   - Double-check all environment variables in Render dashboard
   - Ensure no typos in variable names

4. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Check for any missing files

### Useful Commands:

```bash
# Test backend locally with production env
NODE_ENV=production npm start

# Test frontend build locally
npm run build
npx serve -s build

# Check backend health
curl https://your-backend-url.onrender.com/api/health
```

## Next Steps

1. **Custom Domain**: Set up custom domain in Render settings
2. **SSL Certificate**: Render provides free SSL certificates
3. **Monitoring**: Set up monitoring and alerts
4. **Auto-Deploy**: Enable auto-deploy on Git push

## Support

If you encounter issues:
1. Check Render build logs
2. Check browser console for errors
3. Verify all environment variables
4. Test API endpoints individually

Your Woods & Wild app should now be live! 🎉
