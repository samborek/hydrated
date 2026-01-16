import {
  AssetInput,
  Box,
  Button,
  Flex,
  Separator,
  Slider,
  Stack,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useState } from "react"

import { AssetLogo } from "@/components/AssetLogo"

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
    <Stack gap={20}>
      {/* Header */}
      <Flex justify="space-between" align="center">
        <Text fs={18} fw={600}>
          Multiply Actions
        </Text>
      </Flex>

      {/* Inputs */}
      <Box>
        <Text fs={13} color={theme.text.medium} mb={8}>
          Deposit Collateral
        </Text>
        <AssetInput
          value={collateralAmount}
          onChange={setCollateralAmount}
          symbol={collateralAsset?.symbol}
          selectedAssetIcon={
            collateralAsset?.id ? <AssetLogo id={collateralAsset.id} /> : null
          }
          onAsssetBtnClick={() => {}}
          maxBalance="12.50"
          label="Deposit"
        />
      </Box>

      {/* Leverage Slider */}
      <Box>
        <Flex justify="space-between" mb={12}>
          <Text fs={13} color={theme.text.medium}>
            Adjust Leverage
          </Text>
          <Text fs={13} fw={600} color={theme.colors.azureBlue[400]}>
            {leverage.toFixed(2)}x
          </Text>
        </Flex>
        <Box px={10}>
          <Slider
            min={1.1}
            max={5}
            step={0.1}
            value={leverage}
            onChange={setLeverage}
          />
        </Box>
        <Flex justify="space-between" mt={8}>
          <Text fs={11} color={theme.text.low}>
            1.1x
          </Text>
          <Text fs={11} color={theme.text.low}>
            5x
          </Text>
        </Flex>
      </Box>

      <Separator />

      {/* Simulation Stats */}
      <Stack gap={12}>
        <Flex justify="space-between">
          <Text fs={13} color={theme.text.medium}>
            Buying Power
          </Text>
          <Text fs={13} fw={600}>
            {buyingPower.toFixed(2)} {collateralAsset?.symbol}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fs={13} color={theme.text.medium}>
            Debt Generated
          </Text>
          <Text fs={13} fw={600}>
            {debtAmount.toFixed(2)} {debtAsset?.symbol}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fs={13} color={theme.text.medium}>
            Net APY
          </Text>
          <Text fs={13} fw={600} color={theme.details.values.positive}>
            +14.2%
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fs={13} color={theme.text.medium}>
            Liquidation Price
          </Text>
          <Text fs={13} fw={600}>
            $4.20
          </Text>
        </Flex>
      </Stack>

      {/* Action Button */}
      <Button size="large" sx={{ width: "100%" }}>
        Open Position
      </Button>
    </Stack>
  )
}
