#!/bin/bash
# Quick frontend build script

echo "Building frontend for Render..."

# Go to frontend directory
cd frontend

# Install dependencies
npm install

# Build the React app
npm run build

echo "Frontend built successfully!"
echo "Build files are in frontend/build/"
