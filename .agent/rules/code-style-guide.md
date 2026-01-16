---
trigger: always_on
---

## Component Reusability

Before creating any new styled components or UI elements:

1. **Check UI Library First** - Look for existing components in `@galacticcouncil/ui/components`:
   - `Button`, `Text`, `Flex`, `Box`, [DataTable](cci:1://file:///Users/samborek/Documents/AntigravityTests/hydration-ui/packages/ui/src/components/DataTable/DataTable.tsx:90:0-332:1), [Chip](cci:1://file:///Users/samborek/Documents/AntigravityTests/hydration-ui/packages/ui/src/components/Chip/Chip.tsx:10:0-10:66), etc.
   - Use Storybook (`packages/ui`) as the reference for available components and their variants

2. **Check Theme Tokens** - Never hardcode colors or spacing:
   - Backgrounds: `theme.surfaces.containers.*`
   - Borders: `theme.details.borders`, `theme.details.separators`
   - Paddings: `theme.containers.paddings.*`
   - Text colors: `theme.text.*`

3. **Check Similar Pages** - Look at similar pages for established patterns (e.g. Liquidity, Wallet):
   - Check if an element (like an asset list item with icon and name) already exists in other modules.
   - Use `AssetLabel`, `AssetLogo` and other composed components instead of rebuilding them.

4. **Check Existing Patterns** - Look at similar pages for established patterns:
   - Wallet, Liquidity, Borrow modules are good references
   - Copy styled component patterns from existing modules

5. **Use Storybook** - Run Storybook to see all available components:
   ```bash
   cd packages/ui && yarn storybook

Overall when implementing precisely compare the styling, parameters, focus on details when comparing - this should apply when we have Figma Design provided or available component in library

Don't deploy each update to GitgHub, only upon request

