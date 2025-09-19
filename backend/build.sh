#!/bin/bash
set -e

echo "Installing backend dependencies..."
npm install

echo "Building frontend..."
cd ../frontend
npm install
npm run build

echo "Build complete!"
