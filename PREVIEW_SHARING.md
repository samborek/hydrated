# Preview Local Builds with Shareable Links

## Quick Solutions

### 1. **Cloudflare Tunnel** (Recommended - Free, No Install)
```bash
# Install cloudflared
brew install cloudflared  # macOS
# or download from https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Run tunnel (replace 5173 with your dev server port)
cloudflared tunnel --url http://localhost:5173

# For production preview build
yarn build
cd apps/main
yarn preview  # Usually runs on port 4173
cloudflared tunnel --url http://localhost:4173
```

### 2. **ngrok** (Popular, Free tier available)
```bash
# Install
brew install ngrok  # macOS
# or download from https://ngrok.com/download

# Sign up and get auth token from https://dashboard.ngrok.com/get-started/your-authtoken
ngrok config add-authtoken YOUR_TOKEN

# For dev server (port 5173)
ngrok http 5173

# For preview build (port 4173)
yarn build && yarn preview
ngrok http 4173
```

### 3. **localtunnel** (Simple, Free)
```bash
# Install
npm install -g localtunnel

# Run tunnel
lt --port 5173 --subdomain your-custom-name

# For preview
yarn build && yarn preview
lt --port 4173
```

### 4. **Vite Preview with Custom Host** (For local network)
```bash
# Update vite.config.ts to allow external access
# Then run:
yarn preview --host 0.0.0.0

# Access from other devices on same network:
# http://YOUR_LOCAL_IP:4173
```

## Recommended Setup Script

Add to `package.json`:
```json
{
  "scripts": {
    "preview:tunnel": "yarn build && yarn preview & cloudflared tunnel --url http://localhost:4173",
    "dev:tunnel": "yarn dev & cloudflared tunnel --url http://localhost:5173"
  }
}
```

## For Production Builds

```bash
# Build production bundle
yarn build

# Preview production build locally
cd apps/main
yarn preview  # Runs on http://localhost:4173

# Then tunnel it
cloudflared tunnel --url http://localhost:4173
```

## WebSocket Support

Most tunneling services (Cloudflare, ngrok) support WebSocket connections automatically. Your Vite dev server's HMR (Hot Module Replacement) will work through the tunnel.

## Notes

- **Cloudflare Tunnel**: Best for quick sharing, no signup needed for basic use
- **ngrok**: More features, requires account for custom domains
- **localtunnel**: Simplest, but less reliable
- All services provide HTTPS URLs automatically
