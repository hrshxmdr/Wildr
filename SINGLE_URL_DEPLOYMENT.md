# 🚀 Single URL Deployment Guide

## Overview
Your entire Woods & Wild application will run on **ONE URL** - the backend serves both API and React frontend.

## Render Configuration

### **Deploy as Single Web Service:**

1. **Go to [Render.com](https://render.com)**
2. **New + → Web Service**
3. **Connect Repository**: `Wildr`
4. **Configure**:
   ```
   Name: wildr
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

5. **Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=production
   ```

6. **Click "Create Web Service"**

## Result

✅ **Single URL**: `https://wildr.onrender.com`
- Frontend: `https://wildr.onrender.com` (React app)
- API: `https://wildr.onrender.com/api/*` (Backend routes)

## How It Works

1. **Backend serves React build** in production
2. **API routes** handle `/api/*` requests
3. **All other routes** serve React app (SPA routing)
4. **No CORS issues** - same domain for everything

## Local Development

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm start
```

## Deployment Process

1. **Push to GitHub**
2. **Render automatically**:
   - Installs backend dependencies
   - Builds React frontend
   - Serves everything from one URL

**That's it! One URL, one service, everything together! 🎉**
