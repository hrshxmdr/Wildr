#!/bin/bash
# Single URL deployment build script

echo "🏗️  Building Woods & Wild for single URL deployment..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🔨 Building React frontend..."
npm run build

echo "✅ Build complete! Frontend built and ready to be served by backend."
echo "🚀 Deploy the backend folder to Render as a Web Service."
