#!/usr/bin/env bash
# Build script for Render deployment

echo "Installing dependencies..."
npm install

echo "Running migration (if needed)..."
# Uncomment the next line if you want to run migration on deployment
# npm run migrate:full

echo "Build completed successfully!"
