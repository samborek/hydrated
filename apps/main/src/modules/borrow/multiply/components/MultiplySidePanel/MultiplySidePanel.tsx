import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import { Box, Button, Flex, Stack, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"

import { FC, useMemo, useState } from "react"
import { toast } from "sonner"
import { ArrowUp, ArrowDown } from "lucide-react"

import { useMultiplySimulationStore } from "@/modules/borrow/multiply/states/useMultiplySimulationStore"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"

import {
  SMultiplyFormContainer,
  SMultiplySectionSeparator,
} from "./MultiplySidePanel.styled"
import { MultiplySidePanelAssetInput } from "./MultiplySidePanelAssetInput"
import { MultiplySidePanelLeverage } from "./MultiplySidePanelLeverage"
import { MultiplySidePanelSummary } from "./MultiplySidePanelSummary"

export type MultiplySidePanelProps = {
  collateralAsset: ComputedReserveData
  debtAsset: ComputedReserveData
  initialCollateralAmount?: string
  initialLeverage?: number
  initialStrategy?: "bull" | "bear"
  onAction?: (data: {
    collateralAmount: string
    leverage: number
    strategy: "bull" | "bear"
  }) => void
  actionLabel?: string
  isEditing?: boolean
}

export const MultiplySidePanel: FC<MultiplySidePanelProps> = ({
  collateralAsset,
  debtAsset,
  initialCollateralAmount = "",
  initialLeverage = 2.0,
  initialStrategy = "bull",
  onAction,
  actionLabel,
  isEditing: _isEditing = false,
}) => {
  const { themeProps: theme } = useTheme()
  const [leverage, setLeverage] = useState(initialLeverage)
  const [collateralAmount, setCollateralAmount] = useState(
    initialCollateralAmount,
  )
  const [strategy, setStrategy] = useState<"bull" | "bear">(initialStrategy)

  // Placeholder balance values - wallet integration will be added later
  // Note: useWalletData hook causes big.js errors with incomplete asset data
  const walletBalance = "0"
  const maxSupply = "0"

  // Get position store for adding positions
  const { addPosition } = useMultiplySimulationStore()

  // Calculate all trading values
  const calculations = useMemo(() => {
    const collateralValue = Number(collateralAmount || 0)
    const buyingPower = collateralValue * leverage

    // Get asset prices (fallback to mock values)
    const collateralPrice = Number(collateralAsset?.priceInUSD) || 1000
    const debtPrice = Number(debtAsset?.priceInUSD) || 1

    // Calculate debt amount (what we borrow)
    const borrowedValueUsd = (buyingPower - collateralValue) * collateralPrice
    const debtAmount = borrowedValueUsd / debtPrice

    // Calculate USD values
    const collateralUsd = collateralValue * collateralPrice
    const buyingPowerUsd = buyingPower * collateralPrice

    // APY calculations
    const supplyApy = Number(collateralAsset?.supplyAPY) || 0.12
    const borrowApy = Number(debtAsset?.variableBorrowAPY) || 0.05
    const netApy = Math.max(0, (supplyApy + (supplyApy - borrowApy) * (leverage - 1)) * 100)

    // Profit estimation (for display - simplified)
    const estimatedProfitUsd = (buyingPowerUsd * (netApy / 100)) / 12 // Monthly estimate

    // Fees (0.1% of buying power)
    const totalFees = buyingPowerUsd * 0.001

    return {
      collateralValue,
      buyingPower,
      buyingPowerUsd,
      debtAmount,
      debtAmountUsd: borrowedValueUsd,
      collateralUsd,
      collateralPrice,
      supplyApy,
      borrowApy,
      netApy,
      estimatedProfitUsd,
      totalFees,
    }
  }, [collateralAmount, leverage, collateralAsset, debtAsset])

  const handleOpenPosition = () => {
    if (!collateralAmount || Number(collateralAmount) <= 0) {
      toast.error("Please enter a collateral amount")
      return
    }

    if (onAction) {
      onAction({
        collateralAmount,
        leverage,
        strategy,
      })
      return
    }

    // Add position to the simulation store
    addPosition({
      collateralAsset: {
        id: getReserveAssetId(collateralAsset),
        symbol: collateralAsset?.symbol || "PRIME",
      },
      debtAsset: {
        id: getReserveAssetId(debtAsset),
        symbol:
          debtAsset?.symbol === "HOLLAR" || debtAsset?.symbol === "CASH"
            ? "HUSD"
            : debtAsset?.symbol || "USDC",
      },
      leverage,
      collateralAmount,
      debtAmount: calculations.debtAmount.toFixed(2),
      netApy: calculations.netApy,
      strategy,
      entryPrice: calculations.collateralPrice.toString(),
      // Mock liquidation price logic for simulation
      liquidationPrice: (
        calculations.collateralPrice *
        (1 - 1 / leverage + 0.05)
      ).toString(),
    })

    toast.success(
      `Position opened: ${calculations.buyingPower.toFixed(2)} ${collateralAsset?.symbol} @ ${leverage}x`,
      {
        description: `Net APY: ${calculations.netApy.toFixed(2)}%`,
      },
    )

    // Reset form
    setCollateralAmount("")
  }

  // Variables removed

  return (
    <SMultiplyFormContainer>
      <Stack
        gap={getTokenPx("containers.paddings.primary")(theme as never)}
        sx={{
          pt: 0,
          pb: getTokenPx("scales.paddings.xl")(theme as never),
          maxWidth: ["100%", 420],
          minWidth: [0, 350],
          width: "100%",
        }}
      >
        {/* Input */}
        <MultiplySidePanelAssetInput
          value={collateralAmount}
          onChange={setCollateralAmount}
          asset={collateralAsset}
          balance={walletBalance}
          maxBalance={maxSupply}
        />

        <SMultiplySectionSeparator />

        {/* Leverage */}
        <MultiplySidePanelLeverage
          value={leverage}
          onChange={setLeverage}
          min={1.1}
          max={5}
        />

        <SMultiplySectionSeparator />

        {collateralAsset?.symbol === "EURC" && (
          <>
            <Flex gap={getTokenPx("scales.paddings.s")(theme as never)} width="100%">
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setStrategy("bull")}
                sx={{
                  flex: 1,
                  bg: strategy === "bull" ? theme.accents.success.emphasis : theme.surfaces.containers.high.primary,
                  color: strategy === "bull" ? theme.accents.success.onEmphasis : theme.text.high,
                  border: `1px solid ${strategy === "bull" ? "transparent" : theme.details.borders}`,
                  "&:hover": {
                    bg: strategy === "bull" ? `${theme.accents.success.primary} !important` : `${theme.surfaces.containers.high.hover} !important`,
                  }
                }}
              >
                <ArrowUp size={16} strokeWidth={2} style={{ marginRight: 6 }} />
                Bull (Long)
              </Button>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setStrategy("bear")}
                sx={{
                  flex: 1,
                  bg: strategy === "bear" ? theme.accents.danger.emphasis : theme.surfaces.containers.high.primary,
                  color: strategy === "bear" ? theme.accents.danger.onPrimary : theme.text.high,
                  border: `1px solid ${strategy === "bear" ? "transparent" : theme.details.borders}`,
                  "&:hover": {
                    bg: strategy === "bear" ? `${theme.accents.danger.secondary} !important` : `${theme.surfaces.containers.high.hover} !important`,
                  }
                }}
              >
                <ArrowDown size={16} strokeWidth={2} style={{ marginRight: 6 }} />
                Bear (Short)
              </Button>
            </Flex>

            <SMultiplySectionSeparator />
          </>
        )}



        <Box
          sx={{
            bg: theme.buttons.secondary.outline.fill,
            border: `1px solid ${theme.buttons.secondary.outline.outline}`,
            borderRadius: getTokenPx("scales.cornerRadius.m")(theme as never),
            px: getTokenPx("scales.paddings.m")(theme as never),
            py: getTokenPx("scales.paddings.l")(theme as never),
          }}
        >
          <Flex justify="space-between" align="start">
            <Stack gap={0}>
              <Text fs="p3" fw={500} color={theme.text.high} align="left">
                Leverage
              </Text>
              <Text fs="p5" color={theme.text.medium} fw={400}>
                {leverage}x Leverage
              </Text>
            </Stack>
            <Stack gap={2} align="flex-end">
              <Text fs="p2" fw={600} color={theme.text.high}>
                {calculations.buyingPower > 0
                  ? calculations.buyingPower.toFixed(2)
                  : "0.00"}{" "}
                {collateralAsset?.symbol || "PRIME"}
              </Text>
              <Flex gap={2} align="center">
                <Text fs="p6" color={theme.text.high}>
                  ≈ $
                  {calculations.buyingPowerUsd > 0
                    ? calculations.buyingPowerUsd.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                    : "0.00"}
                </Text>
                {calculations.estimatedProfitUsd > 0 && (
                  <Text fs="p6" fw={600} color={theme.accents.success.emphasis}>
                    (+${calculations.estimatedProfitUsd.toFixed(2)}/mo)
                  </Text>
                )}
              </Flex>
            </Stack>
          </Flex>
        </Box>

        {/* Summary - Now with dynamic values */}
        <MultiplySidePanelSummary
          collateralAsset={collateralAsset}
          debtAsset={debtAsset}
          leverage={leverage}
          netApy={calculations.netApy}
          buyingPower={calculations.buyingPower}
          debtAmount={calculations.debtAmount}
          collateralPrice={calculations.collateralPrice}
        />

        <SMultiplySectionSeparator />

        {/* Open Position Button */}
        <Button
          size="large"
          onClick={handleOpenPosition}
          disabled={!collateralAmount || Number(collateralAmount) <= 0}
          sx={{
            width: "100%",
            bg: theme.buttons.primary.high.rest,
            color: theme.buttons.primary.high.onButton,
            borderRadius: "32px",
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        >
          {actionLabel || (collateralAmount && Number(collateralAmount) > 0
            ? `Open ${leverage}x Position`
            : "Enter amount to continue")}
        </Button>
      </Stack>
    </SMultiplyFormContainer>
  )
}
