const BACKING_ASSET_COLORS_BY_ID: Record<string, string> = {
  "5": "#E6007A",
  "10": "#26A17B",
  "11": "#F7931A",
  "15": "#6F4CF8",
  "22": "#2775CA",
  "1005": "#8B5CF6",
}

const BACKING_ASSET_COLORS_BY_SYMBOL: Record<string, string> = {
  DOT: "#E6007A",
  USDT: "#26A17B",
  USDC: "#2775CA",
  WBTC: "#F7931A",
  vDOT: "#6F4CF8",
  aUSDT: "#26A17B",
  aUSDC: "#2775CA",
  sUSDe: "#8B5CF6",
  sUSDS: "#F4B731",
  tBTC: "#FFAC33",
}

const BACKING_FALLBACK_COLORS = [
  "#38BDF8",
  "#F97316",
  "#A855F7",
  "#EF4444",
  "#0EA5E9",
  "#94A3B8",
]

type BackingAssetColorInput = {
  assetId?: string
  symbol?: string
  index?: number
}

export const getBackingAssetColor = ({
  assetId,
  symbol,
  index = 0,
}: BackingAssetColorInput): string => {
  if (assetId && BACKING_ASSET_COLORS_BY_ID[assetId]) {
    return BACKING_ASSET_COLORS_BY_ID[assetId]!
  }

  if (symbol && BACKING_ASSET_COLORS_BY_SYMBOL[symbol]) {
    return BACKING_ASSET_COLORS_BY_SYMBOL[symbol]!
  }

  return BACKING_FALLBACK_COLORS[index % BACKING_FALLBACK_COLORS.length]!
}

