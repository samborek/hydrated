#!/bin/bash

# Test Cloudflare Tunnel with your dev server

echo "🚀 Testing Cloudflare Tunnel..."
echo ""

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared not found. Please install it first:"
    echo "   Run: ./install-cloudflared.sh"
    echo "   Or visit: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
    exit 1
fi

echo "✅ cloudflared found: $(cloudflared --version | head -n 1)"
echo ""

# Check if dev server is running
if ! lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Dev server not running on port 5173"
    echo "   Starting dev server in background..."
    echo ""
    yarn dev > /dev/null 2>&1 &
    DEV_PID=$!
    echo "   Dev server started (PID: $DEV_PID)"
    echo "   Waiting 5 seconds for server to start..."
    sleep 5
else
    echo "✅ Dev server already running on port 5173"
    DEV_PID=""
fi

echo ""
echo "🌐 Starting Cloudflare Tunnel..."
echo "   This will create a public URL for your local dev server"
echo "   Press Ctrl+C to stop"
echo ""

# Start tunnel
cloudflared tunnel --url http://localhost:5173

# Cleanup
if [ ! -z "$DEV_PID" ]; then
    echo ""
    echo "Stopping dev server..."
    kill $DEV_PID 2>/dev/null
fi
