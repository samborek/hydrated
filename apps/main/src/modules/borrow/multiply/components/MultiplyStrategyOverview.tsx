import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import {
  AssetLogo as BaseAssetLogo,
  Box,
  Flex,
  Paper,
  Separator,
  Stack,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { Zap } from "lucide-react"
import { FC } from "react"

import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"

import { NetApyChart } from "./NetApyChart"

export type MultiplyStrategyOverviewProps = {
  collateralAsset: ComputedReserveData
  debtAsset: ComputedReserveData
}

const formatUSD = (val: string | number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(val))
}

const AssetRow = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      py={getTokenPx("containers.paddings.tertiary")}
    >
      <Text fs="p3" color="text.medium">
        {label}
      </Text>
      {value}
    </Flex>
  )
}

const StrategyInfo = () => {
  const { themeProps: theme } = useTheme()
  return (
    <Paper p={getTokenPx("containers.paddings.primary")}>
      <Text fs="p1" fw={600} mb={getTokenPx("containers.paddings.primary")}>
        About Prime
      </Text>
      <Stack gap={getTokenPx("containers.paddings.secondary")}>
        <Text fs="p3" color={theme.text.medium} lh="170%">
          PRIME Multiply is a simple leveraged yield product that gives you
          increased exposure to PRIME yields, while retaining 100% PRIME
          exposure. This can enable users to earn higher PRIME yields than they
          would by simply holding PRIME. PRIME is a yield-bearing token
          developed in partnership with Hastra, Figure and Provenance.
        </Text>
        <Box>
          <Text fs="p3" fw={600} mb={getTokenPx("containers.paddings.quart")}>
            How It Works
          </Text>
          <Text fs="p3" color={theme.text.medium} lh="170%">
            The yield is generated through Figure’s Democratized Prime lending
            protocol, where lenders earn yield by lending against pools of
            tokenized Home Equity Lines of Credit (HELOCs).
          </Text>
        </Box>
      </Stack>
    </Paper>
  )
}

export const MultiplyStrategyOverview: FC<MultiplyStrategyOverviewProps> = ({
  collateralAsset,
  debtAsset,
}) => {
  const { themeProps: theme } = useTheme()

  if (!collateralAsset || !debtAsset) return null

  const overviewStats = [
    {
      label: "Liquidity Available",
      value: formatUSD(debtAsset.availableLiquidityUSD || 0),
      size: "large" as const,
    },
    { label: "Max Leverage", value: "5.0x", size: "large" as const },
    {
      label: "Max Net APY",
      value: "23.03%",
      size: "large" as const,
      customValue: (
        <Flex align="center" gap={getTokenPx("containers.paddings.quart")}>
          <Text
            fs="h5"
            fw={700}
            color={theme.details.values.positive}
            style={{ fontFamily: "Gazpacho" }}
          >
            23.03%
          </Text>
          <Box sx={{ color: theme.colors.azureBlue[400] }}>
            <Zap size={16} fill="currentColor" />
          </Box>
        </Flex>
      ),
    },
  ]

  return (
    <Stack
      id="multiply-strategy-overview"
      gap={getTokenPx("containers.paddings.primary")}
    >
      {/* Looping Overview */}
      <Paper p={getTokenPx("containers.paddings.primary")}>
        <Text fs="p1" fw={600} mb={getTokenPx("containers.paddings.primary")}>
          Looping Overview
        </Text>

        <StatsHeader stats={overviewStats} />

        <Separator mb={getTokenPx("containers.paddings.primary")} />

        {/* Asset Details Table */}
        <Flex
          gap={getTokenPx("containers.paddings.primary")}
          direction={["column", "row"]}
          align={["stretch", "start"]}
        >
          {/* Left Column - Asset Info */}
          <Box flex={1}>
            <AssetRow
              label="Collateral Asset"
              value={
                <Flex
                  align="center"
                  gap={getTokenPx("containers.paddings.quart")}
                >
                  <Text fw={600} fs="p3">
                    {collateralAsset.symbol}
                  </Text>
                  {collateralAsset.symbol === "PRIME" ? (
                    <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
                  ) : (
                    <AssetLogo
                      id={getReserveAssetId(collateralAsset)}
                      size="medium"
                    />
                  )}
                </Flex>
              }
            />
            <Separator />
            <AssetRow
              label="Debt Asset"
              value={
                <Flex
                  align="center"
                  gap={getTokenPx("containers.paddings.quart")}
                >
                  <Text fw={600} fs="p3">
                    {debtAsset.symbol === "CASH" ? "HUSD" : debtAsset.symbol}
                  </Text>
                  {debtAsset.symbol === "HUSD" ||
                    debtAsset.symbol === "CASH" ? (
                    <AssetLogo id={HOLLAR_ASSET_ID} size="medium" />
                  ) : (
                    <AssetLogo
                      id={getReserveAssetId(debtAsset)}
                      size="medium"
                    />
                  )}
                </Flex>
              }
            />
            <Separator />
            <AssetRow
              label="Average Leverage Taken"
              value={
                <Text fw={600} fs="p3">
                  3.21x
                </Text>
              }
            />
          </Box>

          {/* Right Column - LTV Info */}
          <Flex direction="column" flex={1} gap={0}>
            <AssetRow
              label="Max LTV"
              value={
                <Text fw={600} fs="p3">
                  {(Number(collateralAsset.baseLTVasCollateral) / 100).toFixed(
                    2,
                  )}
                  %
                </Text>
              }
            />
            <Separator />
            <AssetRow
              label="Liquidation LTV"
              value={
                <Text fw={600} fs="p3">
                  {(
                    Number(collateralAsset.reserveLiquidationThreshold) / 100
                  ).toFixed(2)}
                  %
                </Text>
              }
            />
            <Separator />
          </Flex>
        </Flex>
      </Paper>

      {/* Strategy Info */}
      <StrategyInfo />

      {/* Performance Chart */}
      <NetApyChart />
    </Stack>
  )
}
