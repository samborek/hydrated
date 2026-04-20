# Hydration Token System

## Architecture

Tokens flow: `packages/tokens/tokens.json` (Tokens Studio source) → Style Dictionary build (`packages/ui/style-dictionary/build.mjs`) → generated `packages/ui/src/theme/tokens/{dark,light}.json` → assembled in `packages/ui/src/theme/themes.ts`.

**Never manually edit the generated JSON files** — they are overwritten on every `pnpm --filter=@galacticcouncil/ui run build` (or `pnpm theme`).

## Theme Construction (`themes.ts`)

All semantic color groups from the JSON are merged into `theme.colors` via `buildColors()` so Theme UI's `sx` system can resolve them:

```ts
const SEMANTIC_COLOR_KEYS = ["text", "icons", "surfaces", "details", "buttons",
  "textButtons", "accents", "controls", "info", "border", "charts", "chart",
  "containers", "inputs", "elements", "misc", "uiControls", "card",
  "containerPrimary", "alarmRed"]

function buildColors(json) {
  const semantic = Object.fromEntries(SEMANTIC_COLOR_KEYS.map(k => [k, json[k]]).filter(([,v]) => v))
  return { ...json.colors, ...semantic }
}
```

`ThemeColor` type is derived from `ReturnType<typeof buildColors>` so it reflects all available tokens.

## Two Valid Patterns for Color Tokens

### 1. sx string (Theme UI resolves from `theme.colors`)
```tsx
<Text color="text.medium" />
<Box bg="surfaces.containers.high.primary" />
```
Works because `buildColors()` maps semantic groups into `theme.colors`.

### 2. `getToken()` — theme function (preferred on Trade/Swap pages)
```tsx
import { getToken } from "@galacticcouncil/ui/utils"

<Text color={getToken("text.high")} />
// Also works in styled-components:
color: ${getToken("text.medium")};
```
`getToken(path)` returns `(theme) => get(theme, path)` — reads from top-level theme keys (e.g. `theme.text.high`). This bypasses Theme UI's colors scale and reads the token directly.

**Use `getToken()` for consistency with Trade/Swap pages.**

## Available Text Tokens

| Token | Dark value | Light value | Use for |
|---|---|---|---|
| `text.high` | white | `#232226` | Primary / heading text |
| `text.medium` | ~72% gray | ~48% gray | Secondary / muted text |
| `text.low` | ~53% gray | ~57% gray | Tertiary / placeholder text |
| `text.onTint` | ~72% gray | semi-transparent dark | Text on tinted surfaces |
| `text.contrast` | `#030816` | white | Text on inverted backgrounds |

## Invalid Tokens (do not use)

- ❌ `text.primary` — does not exist. Use `text.high`
- ❌ `neutral.gray.400` — does not exist. Use `text.medium`
- ❌ `neutral.gray.300` — does not exist. Use `text.medium`

## Styled-Components / Emotion Access

Tokens outside of `colors` (e.g. `surfaces`, `details`, `scales`) are also on the top-level theme object and work directly in styled-components:

```ts
const SCard = styled.div`
  background: ${({ theme }) => theme.surfaces.containers.high.primary};
  border: 1px solid ${({ theme }) => theme.details.borders};
  gap: ${({ theme }) => theme.scales.paddings.xl}px;
`
```

## Spacing Tokens (`scales.paddings`)

| Token | Value |
|---|---|
| `scales.paddings.s` | 8px |
| `scales.paddings.m` | 12px |
| `scales.paddings.l` | 16px |
| `scales.paddings.xl` | 20px |
| `scales.paddings.xxl` | 28px |
| `scales.paddings.xxxl` | 32px |

Use `getTokenPx("scales.paddings.xl")` for numeric px values in `sx` props (`pt`, `pb`, etc.).

## Rebuilding Tokens

```bash
pnpm --filter=@galacticcouncil/ui run build
# or just the theme step:
pnpm --filter=@galacticcouncil/ui run theme
```
