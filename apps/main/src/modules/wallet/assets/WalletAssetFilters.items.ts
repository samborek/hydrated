import { TabItem } from "@/components/TabMenu"
import i18n from "@/i18n"

export type ChainKey = "all" | "hydration" | "ethereum" | "solana" | "base"

export const CHAIN_COLORS: Record<ChainKey, string> = {
  all: "transparent",
  hydration: "#FC408C",
  ethereum: "#627EEA",
  solana: "#FFFFFF",
  base: "#0052FF",
}

export const walletChainFiltersItems = [
  {
    to: "/wallet/assets",
    search: { chain: "all" as const },
    title: i18n.t("all"),
    resetScroll: false,
  },
  {
    to: "/wallet/assets",
    search: { chain: "hydration" as const },
    title: "Hydration",
    resetScroll: false,
  },
  {
    to: "/wallet/assets",
    search: { chain: "ethereum" as const },
    title: "Ethereum",
    resetScroll: false,
  },
  {
    to: "/wallet/assets",
    search: { chain: "solana" as const },
    title: "Solana",
    resetScroll: false,
  },
  {
    to: "/wallet/assets",
    search: { chain: "base" as const },
    title: "Base",
    resetScroll: false,
  },
] satisfies Array<TabItem>

export const walletAssetFiltersItems = [
  {
    to: "/wallet/assets",
    search: { category: "all" },
    title: i18n.t("all"),
    resetScroll: false,
  },
  {
    to: "/wallet/assets",
    search: { category: "assets" },
    title: i18n.t("assets"),
    resetScroll: false,
  },
  {
    to: "/wallet/assets",
    search: { category: "liquidity" },
    title: i18n.t("liquidity"),
    resetScroll: false,
  },
] as const satisfies Array<TabItem>
