# How to Test Cloudflare Tunnel

## ✅ Installation Complete!

Cloudflare Tunnel (`cloudflared`) is now installed at:
- Location: `~/.local/bin/cloudflared`
- Version: `2025.11.1`
- Added to PATH: Yes (via `~/.zshrc`)

## 🧪 Testing Steps

### Option 1: Quick Test (Recommended)

1. **Start your dev server** (in one terminal):
   ```bash
   yarn dev
   ```
   Wait until you see: `Local: http://localhost:5173`

2. **Start the tunnel** (in another terminal):
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```

3. **You'll see output like:**
   ```
   +--------------------------------------------------------------------------------------------+
   |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable): |
   |  https://random-name-1234.trycloudflare.com                                               |
   +--------------------------------------------------------------------------------------------+
   ```

4. **Copy the URL** and open it in your browser or share it!

5. **Stop the tunnel**: Press `Ctrl+C`

### Option 2: Using the Convenience Scripts

**For Dev Server:**
```bash
# This will start dev server AND tunnel together
yarn dev:tunnel
```

**For Production Preview:**
```bash
# This will build, preview, AND tunnel together
yarn preview:tunnel
```

### Option 3: Manual Test Script

```bash
# Make script executable
chmod +x test-tunnel.sh

# Run test
./test-tunnel.sh
```

## 📝 What to Expect

- ✅ **HTTPS URL**: Cloudflare provides a secure HTTPS URL automatically
- ✅ **WebSocket Support**: Vite HMR (Hot Module Replacement) works through the tunnel
- ✅ **Public Access**: Anyone with the URL can access your local server
- ✅ **No Signup Required**: Works immediately, no account needed

## 🔍 Troubleshooting

**If `cloudflared` command not found:**
```bash
# Reload your shell or run:
export PATH="$HOME/.local/bin:$PATH"
```

**If port 5173 is already in use:**
```bash
# Check what's using it:
lsof -i :5173

# Or use a different port:
cloudflared tunnel --url http://localhost:3000
```

**If tunnel URL doesn't work:**
- Wait a few seconds (tunnel needs time to establish)
- Check that your dev server is running
- Try stopping and restarting the tunnel

## 🎯 Example Test

1. Start dev server: `yarn dev`
2. In another terminal: `cloudflared tunnel --url http://localhost:5173`
3. Copy the `https://*.trycloudflare.com` URL
4. Open it in your browser
5. Share the URL with team members to preview!

## 💡 Tips

- Each tunnel session gets a new random URL
- URLs work until you stop the tunnel (Ctrl+C)
- Perfect for quick demos and sharing with team/clients
- No need to commit or deploy - just share the link!
