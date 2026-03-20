import { useMemo } from "react"

import { useWalletBalancesSectionData } from "@/modules/wallet/assets/Balances/WalletBalances.data"
import { ChainKey } from "@/modules/wallet/assets/WalletAssetFilters.items"

export type ChainBalance = {
  chain: ChainKey
  balance: string
  isLoading: boolean
}

/**
 * Hook to get balance totals per chain.
 * Currently returns the total assets balance for "all" and placeholder values for individual chains.
 * TODO: Implement proper per-chain balance aggregation when chain-specific data is available.
 */
export const useChainBalances = (): Record<ChainKey, ChainBalance> => {
  const { assets, isAssetsLoading } = useWalletBalancesSectionData()

  return useMemo(() => {
    // For now, show total on "all" tab and distribute placeholder values
    // This should be replaced with actual per-chain aggregation
    const totalBalance = parseFloat(assets) || 0

    return {
      all: {
        chain: "all",
        balance: assets,
        isLoading: isAssetsLoading,
      },
      hydration: {
        chain: "hydration",
        // Placeholder: In production, aggregate assets where origin chain is Hydration
        balance: (totalBalance * 0.6).toString(),
        isLoading: isAssetsLoading,
      },
      ethereum: {
        chain: "ethereum",
        // Placeholder: In production, aggregate assets bridged from Ethereum
        balance: (totalBalance * 0.25).toString(),
        isLoading: isAssetsLoading,
      },
      solana: {
        chain: "solana",
        // Placeholder: In production, aggregate assets bridged from Solana
        balance: (totalBalance * 0.1).toString(),
        isLoading: isAssetsLoading,
      },
      base: {
        chain: "base",
        // Placeholder: In production, aggregate assets bridged from Base
        balance: (totalBalance * 0.05).toString(),
        isLoading: isAssetsLoading,
      },
    }
  }, [assets, isAssetsLoading])
}
