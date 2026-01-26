#!/bin/bash

# Install Cloudflare Tunnel (cloudflared)
# For macOS

echo "Installing Cloudflare Tunnel..."

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "This script is for macOS. For other systems, visit: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
    exit 1
fi

# Try Homebrew first
if command -v brew &> /dev/null; then
    echo "Installing via Homebrew..."
    brew install cloudflared
else
    echo "Homebrew not found. Installing manually..."
    
    # Detect architecture
    ARCH=$(uname -m)
    if [ "$ARCH" = "arm64" ]; then
        ARCH_TYPE="arm64"
    else
        ARCH_TYPE="amd64"
    fi
    
    # Download latest release
    echo "Downloading cloudflared for darwin-$ARCH_TYPE..."
    curl -L "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-$ARCH_TYPE" -o /usr/local/bin/cloudflared
    
    # Make executable
    chmod +x /usr/local/bin/cloudflared
    
    echo "Installed to /usr/local/bin/cloudflared"
fi

# Verify installation
if command -v cloudflared &> /dev/null; then
    echo "✅ cloudflared installed successfully!"
    cloudflared --version
    echo ""
    echo "You can now use:"
    echo "  yarn dev:tunnel     - For dev server"
    echo "  yarn preview:tunnel - For production preview"
else
    echo "❌ Installation failed. Please install manually:"
    echo "Visit: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/"
fi
