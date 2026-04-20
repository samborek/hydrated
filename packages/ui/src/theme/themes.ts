import { makeTheme } from "@theme-ui/css/utils"

import { animations } from "@/styles/animations"
import { easings } from "@/styles/easings"
import { BREAKPOINTS_VALUES } from "@/styles/media"
import { transitions } from "@/styles/transitions"
import { Join, Paths } from "@/types"

import darkJSON from "./tokens/dark.json"
import lightJSON from "./tokens/light.json"

// Convert px string to rem for scalable font sizes
const pxToRem = (pxValue: string): string => {
  const px = parseFloat(pxValue)
  return `${px / 16}rem`
}

const SEMANTIC_COLOR_KEYS = [
  "text",
  "icons",
  "secondaryColors",
  "surfaces",
  "details",
  "buttons",
  "textButtons",
  "accents",
  "controls",
  "info",
  "border",
  "charts",
  "chart",
  "containers",
  "inputs",
  "elements",
  "misc",
  "uiControls",
  "card",
  "containerPrimary",
  "alarmRed",
] as const

function buildColors(json: typeof lightJSON) {
  const semantic = Object.fromEntries(
    SEMANTIC_COLOR_KEYS.map((k) => [k, (json as Record<string, unknown>)[k]]).filter(
      ([, v]) => v !== undefined,
    ),
  )
  return { ...json.colors, ...semantic }
}

const base = makeTheme({
  breakpoints: BREAKPOINTS_VALUES,
  space: [],
  fonts: {},
  fontSizes: [],
  fontWeights: {},
  lineHeights: {},
  colors: {},
  transitions,
  animations,
  easings,
  radii: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16,
    xxl: 32,
    full: 9999,
  },
  zIndices: {
    header: 5,
    modal: 10,
    popover: 1000,
    tooltip: 9999,
  },
  typography: {
    text: {
      size: {
        // Paragraph sizes in rem for scaling
        p1: { fontSize: pxToRem(lightJSON.paragraphSize.p1) }, // 18px -> 1.125rem
        p2: { fontSize: pxToRem(lightJSON.paragraphSize.p2) }, // 16px -> 1rem
        p3: { fontSize: pxToRem(lightJSON.paragraphSize.p3) }, // 14px -> 0.875rem
        p4: { fontSize: pxToRem(lightJSON.paragraphSize.p4) }, // 13px -> 0.8125rem
        p5: { fontSize: pxToRem(lightJSON.paragraphSize.p5) }, // 12px -> 0.75rem
        p6: { fontSize: pxToRem(lightJSON.paragraphSize.p6) }, // 11px -> 0.6875rem
        // Headline sizes in rem for scaling
        h1: { fontSize: pxToRem(lightJSON.headlineSize.h1) },
        h2: { fontSize: pxToRem(lightJSON.headlineSize.h2) },
        h3: { fontSize: pxToRem(lightJSON.headlineSize.h3) },
        h4: { fontSize: pxToRem(lightJSON.headlineSize.h4) },
        h5: { fontSize: pxToRem(lightJSON.headlineSize.h5) },
        h6: { fontSize: pxToRem(lightJSON.headlineSize.h6) },
        h7: { fontSize: pxToRem(lightJSON.headlineSize.h7) },
      },
    },
  },
})

const light = {
  ...base,
  ...lightJSON,
  colors: buildColors(lightJSON),
} as unknown as ThemeProps

const dark = {
  ...base,
  ...darkJSON,
  colors: buildColors(darkJSON),
} as unknown as ThemeProps

export const themes = {
  light,
  dark,
}

export type ThemeBaseProps = Omit<typeof base, "buttons" | "text">
export type ThemeProps = ThemeBaseProps & typeof lightJSON
export type ThemeName = keyof typeof themes
export type ThemePreference = ThemeName | "system"
type MergedColors = ReturnType<typeof buildColors>
export type ThemeColor = Join<Paths<MergedColors>, ".">
export type ThemeToken = Join<Paths<ThemeProps>, ".">
export type ThemeFont = "mono" | keyof ThemeProps["fontFamilies1"]

