import {
  useBorrowAssetsData,
  useSupplyAssetsData,
} from "@galacticcouncil/money-market/hooks"
import {
  Box,
  Grid,
  Paper,
} from "@galacticcouncil/ui/components"
import { FC, useMemo } from "react"
import { getTokenPx } from "@galacticcouncil/ui/utils"

import { useAssets } from "@/providers/assetsProvider"

import { MultiplyActions } from "./components/MultiplyActions"
import { MultiplyStrategyOverview } from "./components/MultiplyStrategyOverview"
import { MultiplyStrategyHeader } from "./components/MultiplyStrategyHeader"

export type MultiplyDetailPageProps = {
  strategyId: string
}

export const MultiplyDetailPage: FC<MultiplyDetailPageProps> = ({
  strategyId,
}) => {
  const { tokens } = useAssets()
  const { data: supplyAssets } = useSupplyAssetsData({ showAll: true })
  const { data: borrowAssets } = useBorrowAssetsData()

  // Parse strategyId (format: CollateralSymbol-DebtSymbol-Index)
  const [collateralSymbol, debtSymbol] = strategyId?.split("-") || [
    "DOT",
    "USDC",
  ]

  const assets = useMemo(() => {
    // Fallback or empty arrays
    const sAssets = supplyAssets?.length ? supplyAssets : []
    const bAssets = borrowAssets?.length ? borrowAssets : []

    let collateral = sAssets.find((a) => a.symbol === collateralSymbol) as any
    if (!collateral) {
      const token = tokens.find((t) => t.symbol === collateralSymbol)
      collateral = {
        ...token,
        symbol: collateralSymbol,
        totalLiquidity: "0",
        totalDebt: "0",
        supplyCap: "0",
        borrowCap: "0",
        debtCeiling: "0",
        availableLiquidityUSD: 0,
        baseLTVasCollateral: "0",
        reserveLiquidationThreshold: "0",
        totalLiquidityUSD: "0",
        isolationModeTotalDebt: "0",
        isolationModeTotalDebtUSD: "0",
        eModeCategoryId: 0,
        borrowingEnabled: false,
        isIsolated: false,
      }
    }

    let debt = bAssets.find((a) => a.symbol === debtSymbol) as any
    if (!debt) {
      const token = tokens.find((t) => t.symbol === debtSymbol)
      debt = {
        ...token,
        symbol: debtSymbol,
        totalLiquidity: "0",
        totalDebt: "0",
        supplyCap: "0",
        borrowCap: "0",
        debtCeiling: "0",
        availableLiquidityUSD: 0,
        baseLTVasCollateral: "0",
        reserveLiquidationThreshold: "0",
        totalLiquidityUSD: "0",
        isolationModeTotalDebt: "0",
        isolationModeTotalDebtUSD: "0",
        eModeCategoryId: 0,
        borrowingEnabled: false,
        isIsolated: false,
      }
    }

    return { collateral, debt }
  }, [collateralSymbol, debtSymbol, supplyAssets, borrowAssets, tokens])

  return (
    <Box id="multiply-strategy-detail-page">
      <MultiplyStrategyHeader
        collateralAsset={assets.collateral}
        debtAsset={assets.debt}
      />
      <Grid
        columnTemplate={["1fr", null, `1fr 380px`]}
        gap={getTokenPx("containers.paddings.primary")}
        alignItems="start"
      >
        {/* Left Panel - Overview */}
        <MultiplyStrategyOverview
          collateralAsset={assets.collateral}
          debtAsset={assets.debt}
        />

        {/* Right Panel - Actions */}
        <Paper p={getTokenPx("containers.paddings.primary")} sx={{ mt: 0 }}>
          <MultiplyActions
            collateralAsset={assets.collateral}
            debtAsset={assets.debt}
          />
        </Paper>
      </Grid>
    </Box>
  )
}
