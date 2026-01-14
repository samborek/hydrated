import styled from "@emotion/styled"
import { Button, Flex, Text, ToggleGroup, ToggleGroupItem } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ChartTooltipContent } from "./StatsChartTooltip"

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
`


// Generate mock fees data with realistic relative distributions
const generateFeesData = (timeRange: TimeRange) => {
  const data = []
  const now = new Date()

  // Determine number of data points and granularity
  const isWeekly = timeRange === '1Y' || timeRange === 'ALL'
  const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '1Y' ? 52 : 365
  const step = isWeekly ? 7 : 1

  let lastAssetFee = 2.5 // Start mid-range
  let lastProtocolFee = 0.15
  let lastWithdrawalFee = 0.5

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - (i * step))

    const multiplier = isWeekly ? 7 : 1 // Weekly data is ~7x daily
    const volatility = () => 0.7 + Math.random() * 0.6 // Random fluctuation 0.7x - 1.3x

    // Random walk for rates to look like natural fluctuation
    // Clamp values to the ranges specified in the screenshot
    lastAssetFee = Math.max(0.15, Math.min(5.00, lastAssetFee + (Math.random() - 0.5) * 0.5))
    lastProtocolFee = Math.max(0.05, Math.min(0.25, lastProtocolFee + (Math.random() - 0.5) * 0.05))
    lastWithdrawalFee = Math.max(0.01, Math.min(1.00, lastWithdrawalFee + (Math.random() - 0.5) * 0.1))

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      // Revenue Data (Absolute $)
      networkFees: (Math.random() * 50 + 20) * multiplier * volatility(),
      tradingFees: (Math.random() * 4000 + 2000) * multiplier * volatility(),
      liquidityFees: (Math.random() * 200 + 50) * multiplier * volatility(),
      supplyBorrowFees: (Math.random() * 800 + 400) * multiplier * volatility(),
      hollarFees: (Math.random() * 600 + 300) * multiplier * volatility(),
      // Rate Data (%)
      rateTrading: lastAssetFee,      // Maps to Omnipool Asset Fee
      rateNetwork: lastProtocolFee,   // Maps to Protocol Fee
      rateLiquidity: lastWithdrawalFee, // Maps to Withdrawal Fee
      rateSupplyBorrow: 8.0 + volatility(), // Mock Interest Rate ~8-9%
      rateHollar: 12.0 + volatility(),      // Mock Hollar Rate ~12-13%
    })
  }

  return data
}

const COLORS = {
  networkFees: '#8B5CF6',
  tradingFees: '#3B82F6',
  liquidityFees: '#22C55E',
  supplyBorrowFees: '#F59E0B',
  hollarFees: '#EC4899',
  // Rate Colors (Aligned with Revenue Groups)
  rateNetwork: '#8B5CF6', // Purple
  rateTrading: '#3B82F6', // Blue
  rateLiquidity: '#22C55E', // Green
  rateSupplyBorrow: '#F59E0B', // Orange
  rateHollar: '#EC4899', // Pink
}

const LABELS = {
  networkFees: 'Network Fees',
  tradingFees: 'Trading Fees',
  liquidityFees: 'Liquidity/Withdraw Fees',
  supplyBorrowFees: 'Supply & Borrow Fees',
  hollarFees: 'Hollar Fees',
  // Rate Labels (Identical to Revenue)
  rateNetwork: 'Network Fees',
  rateTrading: 'Trading Fees',
  rateLiquidity: 'Liquidity/Withdraw Fees',
  rateSupplyBorrow: 'Supply & Borrow Fees',
  rateHollar: 'Hollar Fees',
}

type TimeRange = '1W' | '1M' | '1Y' | 'ALL'
type ViewMode = 'fees' | 'revenue'

// Display all 5 categories to match Revenue tab
const RATE_KEYS = ['rateTrading', 'rateNetwork', 'rateLiquidity', 'rateSupplyBorrow', 'rateHollar'] as const

export const FeesOverviewChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>('1M')
  const [viewMode, setViewMode] = useState<ViewMode>('revenue')

  const chartData = useMemo(() => generateFeesData(timeRange), [timeRange])

  // Calculate total revenue
  const totalRevenue = useMemo(() => chartData.reduce((acc, day) =>
    acc +
    (day.networkFees * 1.0) +
    (day.tradingFees * 0.2) +
    (day.liquidityFees * 0.0) +
    (day.supplyBorrowFees * 0.2) +
    (day.hollarFees * 1.0),
    0
  ), [chartData])

  const currentTradingFee = chartData[chartData.length - 1]?.rateTrading

  return (
    <SChartContainer>
      <SChartHeader>
        <div>
          <Text fs={14} color={theme.text.medium}>
            {viewMode === 'revenue' ? 'Protocol Revenue' : 'Fee Rate Fluctuation'}
          </Text>
          <Text fs={32} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>
            {viewMode === 'revenue'
              ? `$${(totalRevenue / 1000).toFixed(1)}K`
              : `${currentTradingFee?.toFixed(2)}%`
            }
          </Text>
          <Text fs={12} color={theme.text.low}>
            {timeRange === '1W' ? 'Last 7 days' :
              timeRange === '1M' ? 'Last 30 days' :
                timeRange === '1Y' ? 'Last year' : 'All time'}
          </Text>
        </div>
        <SControlsGroup>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(v) => v && setViewMode(v as ViewMode)}
          >
            <ToggleGroupItem value="revenue">Revenue</ToggleGroupItem>
            <ToggleGroupItem value="fees">Fees %</ToggleGroupItem>
          </ToggleGroup>
          <Flex gap={6}>
            {(['1W', '1M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                size="small"
                variant={timeRange === range ? 'secondary' : 'tertiary'}
                outline={timeRange !== range}
                onClick={() => setTimeRange(range)}
                sx={{ px: 12, minWidth: 42 }}
              >
                {range}
              </Button>
            ))}
          </Flex>
        </SControlsGroup>
      </SChartHeader>


      <ResponsiveContainer width="100%" height={320}>
        {viewMode === 'revenue' ? (
          // REVENUE MODE: Stacked Bar Chart with absolute $ values
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
            <XAxis
              dataKey="date"
              tick={{ fill: theme.text.low, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.text.low, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload as any}
                  label={label}
                  valueFormatter={(v) => `$${v.toFixed(2)}`}
                  nameFormatter={(name) => LABELS[name as keyof typeof LABELS] || name}
                />
              )}
              cursor={{ fill: theme.surfaces.containers.high.hover }}
            />
            <Legend
              verticalAlign="bottom"
              align="left"
              wrapperStyle={{ paddingTop: '20px' }}
              content={({ payload }: any) => (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: entry.color,
                          borderRadius: '4px'
                        }}
                      />
                      <span style={{ color: theme.text.low, fontSize: '12px' }}>
                        {LABELS[entry.value as keyof typeof LABELS] || entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Bar dataKey="networkFees" stackId="a" fill={COLORS.networkFees} name="networkFees" />
            <Bar dataKey="tradingFees" stackId="a" fill={COLORS.tradingFees} name="tradingFees" />
            <Bar dataKey="liquidityFees" stackId="a" fill={COLORS.liquidityFees} name="liquidityFees" />
            <Bar dataKey="supplyBorrowFees" stackId="a" fill={COLORS.supplyBorrowFees} name="supplyBorrowFees" />
            <Bar dataKey="hollarFees" stackId="a" fill={COLORS.hollarFees} name="hollarFees" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          // FEES MODE: Area Chart showing % fluctuation of rates with gradient fill
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRateTrading" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.rateTrading} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.rateTrading} stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradRateNetwork" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.rateNetwork} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.rateNetwork} stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradRateLiquidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.rateLiquidity} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.rateLiquidity} stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradRateSupplyBorrow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.rateSupplyBorrow} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.rateSupplyBorrow} stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradRateHollar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.rateHollar} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.rateHollar} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
            <XAxis
              dataKey="date"
              tick={{ fill: theme.text.low, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.text.low, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              domain={[0, 'auto']} // Let it auto-scale for larger interest rates
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload as any}
                  label={label}
                  valueFormatter={(v) => `${v.toFixed(2)}%`}
                  nameFormatter={(name) => LABELS[name as keyof typeof LABELS] || name}
                />
              )}
            />
            <Legend
              verticalAlign="bottom"
              align="left"
              wrapperStyle={{ paddingTop: '20px' }}
              content={({ payload }: any) => (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: entry.color,
                          borderRadius: '4px'
                        }}
                      />
                      <span style={{ color: theme.text.low, fontSize: '12px' }}>
                        {LABELS[entry.value as keyof typeof LABELS] || entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            {RATE_KEYS.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[key]}
                fill={`url(#grad${key.charAt(0).toUpperCase() + key.slice(1)})`}
                strokeWidth={2}
                name={key}
              />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </SChartContainer>
  )
}
