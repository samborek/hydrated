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
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useState } from "react"

import { AssetLogo } from "@/components/AssetLogo"
import { getTokenPx } from "@galacticcouncil/ui/utils"

export type MultiplyActionsProps = {
  collateralAsset: any
  debtAsset: any
}

export const MultiplyActions: FC<MultiplyActionsProps> = ({
  collateralAsset,
  debtAsset,
}) => {
  const { themeProps: theme } = useTheme()
  const [leverage, setLeverage] = useState(1.1)
  const [collateralAmount, setCollateralAmount] = useState("")

  // Mock calculations
  const buyingPower = Number(collateralAmount || 0) * leverage
  const debtAmount = (buyingPower - Number(collateralAmount || 0)) * 0.5 // Mock exchange rate

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
            collateralAsset?.id ? <AssetLogo id={collateralAsset.id} /> : null
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
              +14.20%
            </Text>
          }
          size="medium"
        />
        <ValueStats label="Liquidation Price" value="$4.20" size="medium" />
      </Stack>

      {/* Action Button */}
      <Button size="large" sx={{ width: "100%" }}>
        Open Position
      </Button>
    </Stack>
  )
}
