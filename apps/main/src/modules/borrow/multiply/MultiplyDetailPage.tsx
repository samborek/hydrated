import {
  useBorrowAssetsData,
  useSupplyAssetsData,
} from "@galacticcouncil/money-market/hooks"
import { Box, Grid, Stack } from "@galacticcouncil/ui/components"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { FC, useMemo } from "react"

import { MultiplyPositionsTile } from "@/modules/borrow/multiply/components/MultiplyPositionsTile"
import { MultiplySidePanel } from "@/modules/borrow/multiply/components/MultiplySidePanel/MultiplySidePanel"
import { MultiplyStrategyHeader } from "@/modules/borrow/multiply/components/MultiplyStrategyHeader"
import { MultiplyStrategyOverview } from "@/modules/borrow/multiply/components/MultiplyStrategyOverview"
import { useAssets } from "@/providers/assetsProvider"

export type MultiplyDetailPageProps = {
  strategyId: string
}

export const MultiplyDetailPage: FC<MultiplyDetailPageProps> = ({
  strategyId,
}) => {
  const { tokens } = useAssets()
  const { data: supplyAssets } = useSupplyAssetsData({ showAll: true })
  const { data: borrowAssets } = useBorrowAssetsData()

  /*
  const search = useSearch({
    from: "/borrow/multiply/$strategyId",
  })
  const tab = (search as any).tab as string | undefined
  */

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
    <Box id="looping-strategy-detail-page">
      <MultiplyStrategyHeader
        collateralAsset={assets.collateral}
        debtAsset={assets.debt}
      />

      <Grid
        columnTemplate={["1fr", null, `1fr 450px`]}
        gap={getTokenPx("containers.paddings.primary")}
        alignItems="start"
      >
        {/* Left Panel - Positions + Overview */}
        <Stack gap={getTokenPx("containers.paddings.primary")}>
          <MultiplyPositionsTile />
          <MultiplyStrategyOverview
            collateralAsset={assets.collateral}
            debtAsset={assets.debt}
          />
        </Stack>

        {/* Right Panel - Actions */}
        <MultiplySidePanel
          collateralAsset={assets.collateral}
          debtAsset={assets.debt}
        />
      </Grid>
    </Box>
  )
}
