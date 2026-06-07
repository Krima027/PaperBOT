#!/bin/bash
# Render build script — builds React, then FastAPI serves everything

set -e  # stop on any error

echo "=== Installing frontend dependencies ==="
cd frontend/body
npm install

echo "=== Building React frontend (no VITE_API_URL = relative URLs) ==="
# Do NOT pass VITE_API_URL — that makes all API calls relative (/upload, /summary, etc.)
npx vite build

echo "=== Frontend built successfully ==="
cd ../..

echo "=== Installing Python dependencies ==="
pip install -r backend/requirements.txt

echo "=== Build complete ==="
