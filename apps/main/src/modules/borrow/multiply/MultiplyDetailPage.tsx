import {
  useBorrowAssetsData,
  useSupplyAssetsData,
} from "@galacticcouncil/money-market/hooks"
import { Box, Button, Flex, Grid, Paper, Stack } from "@galacticcouncil/ui/components"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { FC, useEffect, useMemo, useState } from "react"

import { MultiplyPositionsTile } from "@/modules/borrow/multiply/components/MultiplyPositionsTile"
import { MultiplyReserveInfo } from "@/modules/borrow/multiply/components/MultiplyReserveInfo"
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        supplyCapUSD: "0",
        borrowCap: "0",
        borrowCapUSD: "0",
        debtCeiling: "0",
        availableLiquidityUSD: 0,
        baseLTVasCollateral: "0",
        reserveLiquidationThreshold: "0",
        totalLiquidityUSD: "0",
        totalDebtUSD: "0",
        isolationModeTotalDebt: "0",
        isolationModeTotalDebtUSD: "0",
        eModeCategoryId: 0,
        borrowingEnabled: false,
        isIsolated: false,
        baseStableBorrowRate: "0",
        baseVariableBorrowRate: "0",
        optimalUsageRatio: "0",
        stableRateSlope1: "0",
        stableRateSlope2: "0",
        borrowUsageRatio: "0",
        variableRateSlope1: "0",
        variableRateSlope2: "0",
        stableBorrowRateEnabled: false,
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
        supplyCapUSD: "0",
        borrowCap: "0",
        borrowCapUSD: "0",
        debtCeiling: "0",
        availableLiquidityUSD: 0,
        baseLTVasCollateral: "0",
        reserveLiquidationThreshold: "0",
        totalLiquidityUSD: "0",
        totalDebtUSD: "0",
        isolationModeTotalDebt: "0",
        isolationModeTotalDebtUSD: "0",
        eModeCategoryId: 0,
        borrowingEnabled: false,
        isIsolated: false,
        baseStableBorrowRate: "0",
        baseVariableBorrowRate: "0",
        optimalUsageRatio: "0",
        stableRateSlope1: "0",
        stableRateSlope2: "0",
        borrowUsageRatio: "0",
        variableRateSlope1: "0",
        variableRateSlope2: "0",
        stableBorrowRateEnabled: false,
      }
    }

    return { collateral, debt }
  }, [collateralSymbol, debtSymbol, supplyAssets, borrowAssets, tokens])

  const [activeTab, setActiveTab] = useState<"details" | "info">("details")

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
        {/* Left Panel - Tabs + Positions + Content */}
        <Stack gap={getTokenPx("containers.paddings.primary")}>
          <Flex gap={12}>
            <Button
              variant={activeTab === "details" ? "secondary" : "transparent"}
              size="medium"
              onClick={() => setActiveTab("details")}
            >
              Loop details
            </Button>
            <Button
              variant={activeTab === "info" ? "secondary" : "transparent"}
              size="medium"
              onClick={() => setActiveTab("info")}
            >
              Borrow/supply data
            </Button>
          </Flex>

          {activeTab === "details" ? (
            <>
              <Box>
                <MultiplyPositionsTile />
              </Box>
              <MultiplyStrategyOverview
                collateralAsset={assets.collateral}
                debtAsset={assets.debt}
              />
            </>
          ) : (
            <Paper p={getTokenPx("containers.paddings.primary")}>
              <MultiplyReserveInfo
                collateralAsset={assets.collateral}
                debtAsset={assets.debt}
              />
            </Paper>
          )}
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
