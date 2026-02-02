import {
  ComputedReserveData,
} from "@galacticcouncil/money-market/hooks"
import {
  Box,
  Flex,
  Grid,
  Paper,
  Separator,
  Stack,
  Text,
  ValueStats,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { Zap } from "lucide-react"
import { FC } from "react"
import { getTokenPx } from "@galacticcouncil/ui/utils"

import { AssetLogo } from "@/components/AssetLogo"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"

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

const OverviewCard = ({
  title,
  value,
  subValue,
  icon,
  isHeadline,
}: {
  title: string
  value: string
  subValue?: any
  icon?: any
  isHeadline?: boolean
}) => {
  const { themeProps: theme } = useTheme()
  return (
    <Paper
      p={getTokenPx("scales.paddings.l")}
      sx={{
        background: theme.surfaces.containers.high.primary,
        border: `1px solid ${theme.details.borders}`,
        minHeight: 100,
      }}
    >
      <ValueStats
        label={title}
        value={value}
        size="large"
        wrap
        customValue={
          icon ? (
            <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
              <Text
                fs="h5"
                fw={isHeadline ? 700 : 600}
                color={isHeadline ? theme.details.values.positive : undefined}
                style={isHeadline ? { fontFamily: "Gazpacho" } : undefined}
              >
                {value}
              </Text>
              <Box sx={{ color: theme.colors.azureBlue[400] }}>{icon}</Box>
            </Flex>
          ) : undefined
        }
        customBottomLabel={subValue}
        style={{ height: "100%", justifyContent: "space-between" }}
      />
    </Paper>
  )
}

const DetailRow = ({ label, value }: { label: string; value: any }) => {
  return (
    <ValueStats
      label={label}
      customValue={value}
      size="medium"
      sx={{ py: getTokenPx("scales.paddings.m") }}
    />
  )
}

export const MultiplyStrategyOverview: FC<MultiplyStrategyOverviewProps> = ({
  collateralAsset,
  debtAsset,
}) => {
  const { themeProps: theme } = useTheme()

  if (!collateralAsset || !debtAsset) return null

  return (
    <Stack id="multiply-strategy-overview" gap={getTokenPx("scales.paddings.xl")}>
      {/* Performance Chart */}
      <Paper
        p={getTokenPx("scales.paddings.xl")}
        sx={{ background: theme.surfaces.containers.high.primary }}
      >
        <Flex justify="space-between" mb={getTokenPx("scales.paddings.xl")}>
          <Text fs="p2" fw={600}>
            Strategy Performance
          </Text>
          <Flex gap={getTokenPx("scales.paddings.base")}>
            <Text
              fs="h5"
              fw={700}
              color={theme.details.values.positive}
              style={{ fontFamily: "Gazpacho" }}
            >
              +24.50%
            </Text>
            <Text
              fs="p4"
              color={theme.text.medium}
              style={{
                alignSelf: "flex-end",
                paddingBottom: `${theme.scales.paddings.s}px`,
              }}
            >
              Past 30d
            </Text>
          </Flex>
        </Flex>

        <NetApyChart />
      </Paper>

      {/* Looping Overview */}
      <Paper p={getTokenPx("scales.paddings.xl")}>
        <Text fs="p1" fw={600} mb={getTokenPx("scales.paddings.xl")}>
          Looping Overview
        </Text>

        <Grid
          columns={[1, 3]}
          gap={getTokenPx("scales.paddings.l")}
          mb={getTokenPx("scales.paddings.xxxl")}
        >
          <OverviewCard
            title="Liquidity Available"
            value={formatUSD(debtAsset.availableLiquidityUSD || 0)}
          />
          <OverviewCard title="Max Leverage" value="5.0x" />
          <OverviewCard
            title="Max Net APY"
            value="23.03%"
            icon={<Zap size={16} fill="currentColor" />}
            isHeadline
          />
        </Grid>

        <Separator mb={getTokenPx("scales.paddings.base")} />

        <Grid columns={[1, 2]} gap={getTokenPx("containers.paddings.primary")}>
          <Box>
            <DetailRow
              label="Collateral Asset"
              value={
                <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
                  <AssetLogo id={getReserveAssetId(collateralAsset)} size="large" />
                  <Text fw={600}>{collateralAsset.symbol}</Text>
                </Flex>
              }
            />
            <DetailRow
              label="Debt Asset"
              value={
                <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
                  <AssetLogo id={getReserveAssetId(debtAsset)} size="large" />
                  <Text fw={600}>{debtAsset.symbol}</Text>
                </Flex>
              }
            />
            <DetailRow
              label="Average Leverage Taken"
              value={<Text fw={600}>5.69x</Text>}
            />
          </Box>
          <Box>
            <DetailRow
              label="Max LTV"
              value={
                <Text fw={600}>
                  {(Number(collateralAsset.baseLTVasCollateral) / 100).toFixed(
                    2,
                  )}
                  %
                </Text>
              }
            />
            <DetailRow
              label="Liquidation LTV"
              value={
                <Text fw={600}>
                  {(
                    Number(collateralAsset.reserveLiquidationThreshold) / 100
                  ).toFixed(2)}
                  %
                </Text>
              }
            />
          </Box>
        </Grid>
      </Paper>
    </Stack>
  )
}
