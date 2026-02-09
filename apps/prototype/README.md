# Hydration Prototype (Static)

This folder contains a simplified HTML/CSS prototype of the main navigation flows:
- Overview
- Trade
- Liquidity
- Wallet
- Staking
- Borrow
- Stats (recently added)

## How to view
1. From this folder, run a local server (recommended to avoid browser file restrictions):
   - `python -m http.server 5174`
   - or `npx http-server -p 5174`
2. Open `http://localhost:5174` and use the sidebar links.

You can also run the prototype from the repo root:
- `yarn proto`

## Storybook (components)
The UI component library still lives in `packages/ui`.
- Run `yarn workspace @galacticcouncil/ui dev`
- Storybook will be at `http://localhost:6006`

The prototype uses the same fonts and token-based colors so it stays visually aligned with the real UI library.
