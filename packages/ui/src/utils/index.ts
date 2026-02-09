import { css, SerializedStyles, Theme as EmotionTheme } from "@emotion/react"
import { SxProp } from "@theme-ui/core"
import { get, Theme as ThemeUI, ThemeUICSSObject } from "@theme-ui/css"

import { ThemeToken } from "@/theme"

// Base font size for rem calculations (browser default)
export const REM_BASE = 16

export const px = (n: number | string) => (typeof n === "number" ? n + "px" : n)

export const pxToRem = (px: number): string => `${px / REM_BASE}rem`

// Helper for template literals in styled components: ${toRem(theme.scales.paddings.m)}
export const toRem = (value: number | string): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value
  return `${(numValue / REM_BASE).toFixed(4).replace(/\.?0+$/, "")}rem`
}

declare const __brand: unique symbol
export type Branded<T> = true & { [__brand]: T }

export type MinusPx = Branded<"MinusPx">

export const minusPx = true as MinusPx

export const getToken =
  (token: ThemeToken | ThemeToken[]) =>
    (theme: ThemeUI): any =>
      Array.isArray(token) ? token.map((t) => get(theme, t)) : get(theme, token)

// Returns token value in pixels (use for borders, shadows, fixed sizes)
export const getTokenPx =
  (token: ThemeToken | ThemeToken[], minus?: MinusPx) => (theme: ThemeUI) =>
    Array.isArray(token)
      ? token.map((t) => `${minus ? "-" : ""}${get(theme, t)}px`)
      : `${minus ? "-" : ""}${get(theme, token)}px`

export const getMinusTokenPx = (token: ThemeToken | ThemeToken[]) =>
  getTokenPx(token, minusPx)

// Returns token value in rem (use for spacing, padding, margins, font-sizes)
// This allows the UI to scale based on user's browser font-size preference
export const getTokenRem =
  (token: ThemeToken | ThemeToken[], minus?: MinusPx) => (theme: ThemeUI) => {
    const convert = (value: number) =>
      `${minus ? "-" : ""}${(value / REM_BASE).toFixed(4).replace(/\.?0+$/, "")}rem`
    return Array.isArray(token)
      ? token.map((t) => convert(Number(get(theme, t))))
      : convert(Number(get(theme, token)))
  }

export const getMinusTokenRem = (token: ThemeToken | ThemeToken[]) =>
  getTokenRem(token, minusPx)

export function createStyles<T extends SerializedStyles>(
  callback: (theme: EmotionTheme) => T,
) {
  return () =>
    ({ theme }: { theme: EmotionTheme }) =>
      callback(theme)
}

type ExtractString<T> = T extends string ? T : never

export function createVariants<TKey = string>(
  callback: (
    theme: EmotionTheme,
  ) => Record<ExtractString<TKey>, SerializedStyles>,
) {
  return (key: ExtractString<TKey>) =>
    ({ theme }: { theme: EmotionTheme }) =>
      callback(theme)[key]
}

export { css, type SxProp }
export { default as styled } from "@emotion/styled"

// Container Query utilities
export * from "../styles/container"
