import {
  AssetCapsProvider,
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
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { Zap } from "lucide-react"
import { FC } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { AssetLogo } from "@/components/AssetLogo"
import { ReserveConfiguration } from "@/modules/borrow/reserve/ReserveConfiguration"

export type MultiplyStrategyOverviewProps = {
  collateralAsset: ComputedReserveData
  debtAsset: ComputedReserveData
}

// Mock data for chart
const generateChartData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i,
    value: 100 + Math.random() * 20 + i * 2,
  }))
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
}: {
  title: string
  value: string
  subValue?: any
  icon?: any
}) => {
  const { themeProps: theme } = useTheme()
  return (
    <Paper
      p={16}
      sx={{
        background: theme.surfaces.containers.high.primary,
        border: `1px solid ${theme.details.borders}`,
        minHeight: 100,
      }}
    >
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <Text fs={12} color={theme.text.medium}>
          {title}
        </Text>
        <Flex align="center" gap={8}>
          <Text fs={24} fw={600}>
            {value}
          </Text>
          {icon && (
            <Box sx={{ color: theme.colors.azureBlue[400] }}>{icon}</Box>
          )}
        </Flex>
        {subValue && subValue}
      </Stack>
    </Paper>
  )
}

const DetailRow = ({ label, value }: { label: string; value: any }) => {
  const { themeProps: theme } = useTheme()
  return (
    <Flex justify="space-between" align="center" py={12}>
      <Text fs={14} color={theme.text.medium}>
        {label}
      </Text>
      <Box>{value}</Box>
    </Flex>
  )
}

export const MultiplyStrategyOverview: FC<MultiplyStrategyOverviewProps> = ({
  collateralAsset,
  debtAsset,
}) => {
  const { themeProps: theme } = useTheme()
  const data = generateChartData()

  if (!collateralAsset || !debtAsset) return null

  return (
    <Stack gap={24}>
      {/* Header / Strategy Info */}
      <Flex justify="space-between" align="center">
        <Box>
          <Text fs={24} fw={600} font="primary" mb={4}>
            {collateralAsset.symbol} / {debtAsset.symbol} Loop
          </Text>
          <Text fs={14} color={theme.text.medium}>
            Supply {collateralAsset.symbol} and borrow {debtAsset.symbol} to
            amplify yield.
          </Text>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Text fs={12} color={theme.text.low} mb={2}>
            Total Value Locked
          </Text>
          <Text fs={18} fw={600}>
            $2.4M
          </Text>
        </Box>
      </Flex>

      {/* Performance Chart */}
      <Paper p={24} sx={{ background: theme.surfaces.containers.high.primary }}>
        <Flex justify="space-between" mb={20}>
          <Text fs={16} fw={600}>
            Strategy Performance
          </Text>
          <Flex gap={8}>
            <Text
              fs={24}
              fw={700}
              color={theme.details.values.positive}
              style={{ fontFamily: "Gazpacho" }}
            >
              +24.5%
            </Text>
            <Text
              fs={13}
              color={theme.text.medium}
              style={{ alignSelf: "flex-end", paddingBottom: 6 }}
            >
              Past 30d
            </Text>
          </Flex>
        </Flex>

        <div style={{ height: 300, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.colors.azureBlue[500]}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.colors.azureBlue[500]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis hide domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.surfaces.containers.high.hover,
                  borderColor: theme.details.borders,
                  borderRadius: 8,
                }}
                itemStyle={{ color: theme.text.high }}
                labelStyle={{ display: "none" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={theme.colors.azureBlue[500]}
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Paper>

      {/* Looping Overview */}
      <Paper p={24}>
        <Text fs={18} fw={600} mb={20}>
          Looping Overview
        </Text>

        <Grid columns={[1, 3]} gap={16} mb={30}>
          <OverviewCard
            title="Liquidity Available"
            value={formatUSD(debtAsset.availableLiquidityUSD || 0)}
          />
          <OverviewCard title="Max Leverage" value="5.0x" />
          <OverviewCard
            title="Max Net APY"
            value="23.03%"
            icon={<Zap size={16} fill="currentColor" />}
          />
        </Grid>

        <Separator mb={10} />

        <Grid columns={[1, 2]} gap={20}>
          <Box>
            <DetailRow
              label="Collateral Asset"
              value={
                <Flex align="center" gap={8}>
                  <AssetLogo id={collateralAsset.id} size="large" />
                  <Text fw={600}>{collateralAsset.symbol}</Text>
                </Flex>
              }
            />
            <DetailRow
              label="Debt Asset"
              value={
                <Flex align="center" gap={8}>
                  <AssetLogo id={debtAsset.id} size="large" />
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
                    1,
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
                  ).toFixed(1)}
                  %
                </Text>
              }
            />
          </Box>
        </Grid>
      </Paper>

      {/* Reserve Configurations */}
      <Stack gap={20}>
        {/* Collateral Asset Config (Supply Details) */}
        <Paper p={24}>
          <Stack gap={20}>
            <Flex align="center" gap={12}>
              <AssetLogo id={collateralAsset.id} size="large" />
              <Text fs={18} fw={600}>
                Reserve Status & Configuration ({collateralAsset.symbol})
              </Text>
            </Flex>
            <Separator />
            <AssetCapsProvider asset={collateralAsset}>
              <ReserveConfiguration reserve={collateralAsset} />
            </AssetCapsProvider>
          </Stack>
        </Paper>

        {/* Debt Asset Config (Borrow Details) */}
        <Paper p={24}>
          <Stack gap={20}>
            <Flex align="center" gap={12}>
              <AssetLogo id={debtAsset.id} size="large" />
              <Text fs={18} fw={600}>
                Reserve Status & Configuration ({debtAsset.symbol})
              </Text>
            </Flex>
            <Separator />
            <AssetCapsProvider asset={debtAsset}>
              <ReserveConfiguration reserve={debtAsset} />
            </AssetCapsProvider>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  )
}
