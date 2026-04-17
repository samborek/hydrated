/**
 * Hollar chart color palette — sourced from charts.colors.hollar design tokens.
 * These mirror the values in packages/ui/src/theme/tokens/dark.json
 * so they can be used without runtime theme lookups.
 */

export const hollarColors = {
  supply: {
    mm: "#b3cf92",
    hsm: "#bfff98",
    mmFill: "rgba(179, 207, 146, 0.3)",
    hsmFill: "rgba(191, 255, 152, 0.15)",
  },
  collateral: {
    mm: ["#b3cf92", "#6fc272", "#74c742", "#45ac1f", "#bfff98", "#e7ece1"],
    hsm: ["#b3cf92", "#6fc272", "#74c742", "#bfff98"],
  },
  buckets: {
    mm: "#b3cf92",
    hsm: "#6fc272",
  },
} as const
