// Placeholder hook for Hollar peg prices
// ❗️ Needs real indexer/oracle endpoint — using mock data until available

import { useQuery } from "@tanstack/react-query"
import { USDT_ASSET_ID, SUSDE_ASSET_ID, SUSDS_ASSET_ID } from "@galacticcouncil/utils"

export type PegPriceEntry = {
  id: string
  label: string
  assetId: string
  color: string
  price: number
  priceStr: string
  change24h: number
}

// Mock peg prices — replace with real oracle/indexer call when available
const MOCK_PEG_PRICES: PegPriceEntry[] = [
  { id: "aUSDT", label: "HOLLAR/aUSDT", assetId: USDT_ASSET_ID, color: "#26A17B", price: 1.0001, priceStr: "$1.0001", change24h: 0.01 },
  { id: "aUSDC", label: "HOLLAR/aUSDC", assetId: "22",           color: "#2775CA", price: 1.0005, priceStr: "$1.0005", change24h: 0.05 },
  { id: "sUSDe", label: "HOLLAR/sUSDe", assetId: SUSDE_ASSET_ID, color: "#8B5CF6", price: 0.9998, priceStr: "$0.9998", change24h: -0.02 },
  { id: "sUSDS", label: "HOLLAR/sUSDS", assetId: SUSDS_ASSET_ID, color: "#F4B731", price: 1.0012, priceStr: "$1.0012", change24h: 0.12 },
]

// Placeholder fetcher — swap out for real endpoint
const fetchHollarPegPrices = async (): Promise<PegPriceEntry[]> => {
  // TODO: fetch from indexer once endpoint is available
  // const res = await fetch("https://api.hydration.net/hollar/peg-prices")
  // const json = await res.json()
  // return json.map(...)
  return MOCK_PEG_PRICES
}

export const useHollarPegPrices = () => {
  return useQuery({
    queryKey: ["hollarPegPrices"],
    queryFn: fetchHollarPegPrices,
    staleTime: 60_000,
    placeholderData: MOCK_PEG_PRICES,
  })
}
