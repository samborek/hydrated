import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import {
  AssetInput,
  Box,
  Button,
  Flex,
  Separator,
  Slider,
  Stack,
  Text,
  ValueStats,
} from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { toast } from "sonner"

import { AssetLogo } from "@/components/AssetLogo"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"

import { useMultiplySimulationStore } from "../states/useMultiplySimulationStore"

export type MultiplyActionsProps = {
  collateralAsset: ComputedReserveData
  debtAsset: ComputedReserveData
}

export const MultiplyActions: FC<MultiplyActionsProps> = ({
  collateralAsset,
  debtAsset,
}) => {
  const { themeProps: theme } = useTheme()
  const [leverage, setLeverage] = useState(1.1)
  const [collateralAmount, setCollateralAmount] = useState("")

  const { addPosition } = useMultiplySimulationStore()

  // Mock calculations
  const buyingPower = Number(collateralAmount || 0) * leverage
  const debtAmount = (buyingPower - Number(collateralAmount || 0)) * 0.5 // Mock exchange rate

  const supplyApy = Number(collateralAsset?.supplyAPY) || 0.12
  const borrowApy = Number(debtAsset?.variableBorrowAPY) || 0.05
  const netApy = (supplyApy + (supplyApy - borrowApy) * (leverage - 1)) * 100

  const handleOpenPosition = () => {
    if (!collateralAmount || Number(collateralAmount) <= 0) {
      toast.error("Please enter a collateral amount")
      return
    }

    addPosition({
      collateralAsset: {
        id: getReserveAssetId(collateralAsset),
        symbol: collateralAsset.symbol,
      },
      debtAsset: {
        id: getReserveAssetId(debtAsset),
        symbol: debtAsset.symbol,
      },
      leverage,
      collateralAmount,
      debtAmount: debtAmount.toString(),
      netApy,
    })

    toast.success("Position simulated successfully!")
  }

  return (
    <Stack gap={getTokenPx("containers.paddings.primary")}>
      {/* Header */}
      <Flex justify="space-between" align="center">
        <Text fs="p1" fw={600}>
          Multiply Actions
        </Text>
      </Flex>

      {/* Inputs */}
      <Box>
        <Text fs="p4" color={theme.text.medium} mb={getTokenPx("scales.paddings.base")}>
          Deposit Collateral
        </Text>
        <AssetInput
          value={collateralAmount}
          onChange={setCollateralAmount}
          symbol={collateralAsset?.symbol}
          selectedAssetIcon={
            collateralAsset?.id ? (
              <AssetLogo id={getReserveAssetId(collateralAsset)} />
            ) : null
          }
          onAsssetBtnClick={() => { }}
          maxBalance="12.50"
          label="Deposit"
        />
      </Box>

      {/* Leverage Slider */}
      <Box>
        <Flex justify="space-between" mb={getTokenPx("scales.paddings.m")}>
          <Text fs="p4" color={theme.text.medium}>
            Adjust Leverage
          </Text>
          <Text fs="p4" fw={600} color={theme.colors.azureBlue[400]}>
            {leverage.toFixed(2)}x
          </Text>
        </Flex>
        <Box px={getTokenPx("scales.paddings.m")}>
          <Slider
            min={1.1}
            max={5}
            step={0.1}
            value={leverage}
            onChange={setLeverage}
          />
        </Box>
        <Flex justify="space-between" mt={getTokenPx("scales.paddings.base")}>
          <Text fs="p6" color={theme.text.low}>
            1.1x
          </Text>
          <Text fs="p6" color={theme.text.low}>
            5x
          </Text>
        </Flex>
      </Box>

      <Separator />

      {/* Simulation Stats */}
      <Stack gap={getTokenPx("scales.paddings.m")}>
        <ValueStats
          label="Buying Power"
          value={`${buyingPower.toFixed(2)} ${collateralAsset?.symbol}`}
          size="medium"
        />
        <ValueStats
          label="Debt Generated"
          value={`${debtAmount.toFixed(2)} ${debtAsset?.symbol}`}
          size="medium"
        />
        <ValueStats
          label="Net APY"
          customValue={
            <Text fs="p4" fw={600} color={theme.details.values.positive}>
              +{netApy.toFixed(2)}%
            </Text>
          }
          size="medium"
        />
        <ValueStats label="Liquidation Price" value="$4.20" size="medium" />
      </Stack>

      {/* Action Button */}
      <Button size="large" sx={{ width: "100%" }} onClick={handleOpenPosition}>
        Open Position
      </Button>
    </Stack>
  )
}
