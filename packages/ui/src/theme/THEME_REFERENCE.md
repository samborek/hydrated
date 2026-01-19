# Theme Token Reference

Quick reference guide for commonly used theme tokens to avoid repeated grepping.

## Spacing & Padding

### `theme.scales.paddings.*`
- `xxxl`: 32px - Large horizontal padding (e.g., modal content)
- `xxl`: 28px
- `xl`: 20px - Standard large spacing (e.g., button gaps)
- `l`: 16px - Standard medium spacing
- `m`: 12px - Standard small spacing (e.g., card gaps)
- `base`: 8px - Base spacing unit
- `s`: 4px - Small spacing
- `xs`: 2px - Extra small spacing

### `theme.containers.paddings.*`
- `primary`: 20px - Primary container padding
- `secondary`: 16px - Secondary container padding
- `tertiary`: 8px - Tertiary container padding
- `quart`: 4px - Quarter padding

### `theme.modals.paddings.*`
- `primary`: 20px - Primary modal padding
- `secondary`: 16px - Secondary modal padding
- `tertiary`: 12px - Tertiary modal padding
- `quart`: 8px - Quarter modal padding
- `quint`: 4px - Fifth modal padding
- `senary`: 2px - Sixth modal padding
- `mobileContent`: 0px - Mobile content padding

### `theme.modals.cornerRadius.*`
- `containersPrimary`: 16px
- `drawers`: 16px
- `internalPrimary`: 8px
- `buttonsPrimary`: 32px
- `16px`: 16px

### `theme.inputs.paddings.*`
- `primary`: 8px
- `secondary`: 12px
- `internal`: 4px
- `tertiary`: 8px

## Border Radius

### `theme.scales.cornerRadius.*`
- `xxl`: 32px - Large rounded corners (e.g., buttons)
- `xl`: 16px - Extra large (e.g., modal top corners)
- `l`: 12px - Large
- `m`: 8px - Medium
- `base`: 4px - Base radius
- `none`: 0px

### `theme.containers.cornerRadius.*`
- `buttonsPrimary`: Used for button border radius

## Colors

### Text Colors (`theme.text.*`)
- `high`: `rgb(100% 100% 100%)` - White, primary text
- `medium`: `rgb(71.529% 72.471% 74.353%)` - Medium gray text
- `low`: `rgb(52.549% 54.118% 57.255%)` - Low contrast gray text
- `onTint`: `rgb(71.529% 72.471% 74.353%)`
- `lowest`: `rgb(100% 100% 100%)`
- `contrast`: `#030816` - Dark contrast color
- `tint.primary`: `#dfb1f3` - Purple tint
- `tint.secondary`: `#b3d7fa` - Blue tint
- `tint.tertiary`: `#53a4f3` - Light blue tint

### Icon Colors (`theme.icons.*`)
- `onSurface`: `rgb(52.549% 54.118% 57.255%)` - Default icon color
- `onSurfaceHover`: `rgb(66.784% 67.883% 70.079%)` - Hover state
- `onContainer`: `rgb(71.529% 72.471% 74.353%)`
- `soft`: `rgb(85.098% 92.157% 99.02% / 0.2)` - Soft/transparent
- `primary`: `rgb(100% 100% 100%)` - White icons
- `contrast`: `#030816` - Dark icons
- `big`: `rgb(9.7647% 19.294% 28.588%)`

### Details & Separators (`theme.details.*`)
- `separators`: `rgb(14.588% 17.412% 23.059% / 0.6)` - Divider lines
- `borders`: `rgb(14.588% 17.412% 23.059%)` - Border color
- `overlays`: `rgb(1.1765% 3.1373% 8.6275% / 0.4)` - Light overlay
- `overlayHigh`: `rgb(1.1765% 3.1373% 8.6275% / 0.8)` - Dark overlay (modal backdrop)
- `separatorsOnDim`: `rgb(33.569% 35.765% 40.157% / 0.1)` - Dim separators
- `skeleton`: `rgb(52.549% 54.118% 57.255% / 0.05)` - Skeleton loader
- `values.positive`: `#74c742` - Green for positive values
- `values.negative`: `rgb(100% 33.804% 30.98%)` - Red for negative values

### Surfaces (`theme.surfaces.containers.*`)
- `high.primary`: `#0d1525` - High surface background
- `high.accent`: `#030816` - Accent background
- `high.hover`: `rgb(9.8431% 12.824% 18.784%)` - Hover state
- `low.primary`: `#240e32` - Low surface background
- `low.onPrimary`: `#dfb1f3` - Text on low surface
- `mid.primary`: `#030816` - Mid surface background
- `dim.dimOnBg`: `rgb(33.569% 35.765% 40.157% / 0.1)` - Dim overlay on background
- `dim.dimOnHigh`: `rgb(33.569% 35.765% 40.157% / 0.1)` - Dim overlay on high surface

### Buttons (`theme.buttons.*`)
- `primary.high.rest`: `#e53e76` - Primary button background (pink)
- `primary.high.onButton`: `rgb(100% 100% 100%)` - Primary button text (white)
- `primary.high.hover`: `rgb(92.863% 47.02% 62.392%)` - Primary button hover
- `primary.medium.rest`: `#b3d7fa` - Medium primary button
- `primary.medium.onButton`: `#0d1525` - Medium primary button text

## Typography

### Font Families
- `fontFamilies1.primary`: `"Gazpacho"` - Headline font
- `fontFamilies1.secondary`: `"Geist"` - Body font

### Font Sizes (via `fs` prop on Text component)
- `28`: Large headlines
- `14`: Medium text (titles, feature names)
- `12`: Small text (descriptions, subtext)

### Font Weights (via `fw` prop on Text component)
- `600`: Semibold (feature titles)
- `500`: Medium (card titles)
- `400`: Regular (body text)

### Line Heights
- `theme.lineHeight.s`: 15px - Small line height
- `theme.lineHeight.m`: 18px - Medium line height
- `theme.lineHeight.l`: 21px - Large line height
- `theme.lineHeight.xl`: 24px - Extra large
- `theme.lineHeight.2xl`: 30px - 2XL

## Common Patterns

### Card Styling
```typescript
border: 1px solid ${theme.details.separators}
border-radius: ${theme.scales.cornerRadius.m}px
padding: ${theme.containers.paddings.secondary}px
gap: ${theme.scales.paddings.m}px
```

### Feature Row Styling
```typescript
gap: ${theme.scales.paddings.m}px
padding: ${theme.containers.paddings.quart}px 0
```

### Icon Container (Circular)
```typescript
width: 20px
height: 20px
border-radius: 50%
border: 1px solid ${theme.details.separators}
```

### Button Styling
```typescript
borderRadius: 32 // theme.scales.cornerRadius.xxl
height: 50
flex: 1 // Equal width buttons
```

### Modal Content Padding
```typescript
padding: ${theme.containers.paddings.primary}px ${theme.scales.paddings.xxxl}px
```

## Usage Examples

### Text Component
```typescript
<Text
  fs={14}
  fw={500}
  color="text.high"
  style={{ fontFamily: "Gazpacho", lineHeight: "15px" }}
>
  Get BTC
</Text>
```

### Icon Component
```typescript
<Icon component={Coins} size={14} color="#9CA3AF" />
// Or use theme token:
<Icon component={Coins} size={14} color="icons.onSurface" />
```

### Styled Component
```typescript
const SCard = styled.div`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.details.separators};
  border-radius: ${({ theme }) => theme.scales.cornerRadius.m}px;
  padding: ${({ theme }) => theme.containers.paddings.secondary}px;
  gap: ${({ theme }) => theme.scales.paddings.m}px;
`
```

## Notes

- Always use theme tokens instead of hardcoded values
- Use `getTokenPx()` helper for converting token values to pixels when needed
- Prefer semantic tokens (`theme.containers.paddings.*`) over scale tokens when appropriate
- For spacing, prefer `theme.scales.paddings.*` over fixed pixel values
- Icon colors: Use `icons.onSurface` for default, or specific hex colors like `#9CA3AF` when needed
