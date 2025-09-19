#!/bin/bash
# Render build script for single URL deployment

echo "🏗️  Building Woods & Wild..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Build frontend
echo "📦 Building frontend..."
cd ../frontend
npm install
npm run build

echo "✅ Build complete!"
