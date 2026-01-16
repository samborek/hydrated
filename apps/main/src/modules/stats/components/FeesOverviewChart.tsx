import styled from "@emotion/styled"

import { Button, Flex, Text, ToggleGroup, ToggleGroupItem, ValueStats, SectionHeader } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components"
import { SelectDropdown } from "./SelectDropdown"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useState, useMemo, useEffect, useRef } from "react"
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

} from "recharts"
import { SChartTooltipContainer } from "./StatsChartTooltip"

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
  
  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 16px;
  }
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    width: 100%;
    justify-content: flex-end;
    align-self: auto;
  }
`

const SDesktopOnly = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`

const SMobileOnly = styled.div`
  @media (min-width: 577px) {
    display: none;
  }
  
  /* Ensure dropdown doesn't overflow or break layout */
  flex-shrink: 0;
`

const SHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Match SectionHeader usual spacing */
  margin-bottom: 20px;
`

const SChartFooter = styled.div`
  display: none;
  
  @media (max-width: 576px) {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 16px;
    align-items: center;
  }
`
const SAlignedValueStats = styled(ValueStats)`
  align-items: flex-start;
`

const SFullWidthToggleGroup = styled(ToggleGroup)`
  width: 100%;
`


const SLegendContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    /* Optional: Add fade effect or padding */
  }
`



// --- Animated Value Component ---
const AnimatedValue = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const startTime = useRef<number | null>(null)
  const startValue = useRef(value)
  const endValue = useRef(value)
  const duration = 300 // ms

  useEffect(() => {
    startValue.current = displayValue
    endValue.current = value
    startTime.current = null

    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = timestamp - startTime.current
      const percentage = Math.min(progress / duration, 1) // 0 to 1

      // Ease out cubic
      const ease = 1 - Math.pow(1 - percentage, 3)

      const current = startValue.current + (endValue.current - startValue.current) * ease

      setDisplayValue(current)

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [value])

  return <>{`$${(displayValue / 1000).toFixed(1)}K`}</>
}


// Generate mock fees data with realistic relative distributions
const generateFeesData = (timeRange: TimeRange) => {
  const data = []
  const now = new Date()

  // Determine number of data points and granularity
  const isWeekly = timeRange === '1Y' || timeRange === 'ALL'
  const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '1Y' ? 52 : 104
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
type GroupBy = 'product' | 'destination'

const DESTINATION_LABELS: Record<string, string> = {
  treasury: 'Treasury',
  lps: 'LPs',
  burned: 'Burned',
  stakers: 'Stakers',
  users: 'Users',
}

const productKeys = ['networkFees', 'tradingFees', 'liquidityFees', 'supplyBorrowFees', 'hollarFees']
const destinationKeys = ['treasury', 'lps', 'burned', 'stakers', 'users']

// Display all 5 categories to match Revenue tab
const RATE_KEYS = ['rateTrading', 'rateNetwork', 'rateLiquidity', 'rateSupplyBorrow', 'rateHollar'] as const

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null

  // Calculate sum
  const sum = payload.reduce((acc: number, entry: any) => acc + (Number(entry.value) || 0), 0)

  // Reverse payload order to match the stacked bars (visually top to bottom in tooltip = top to bottom in stack)
  // Actually, Recharts stacks bottom-up. So the top item in chart is the last item in keys/payload.
  // User wants hierarchy "same as colors in bar... naturally from top to bottom".
  // If Bar stacks A (bottom), B, C... E (top). 
  // User wants tooltip to show E (top), D, ... A (bottom).
  // So we reverse the payload.
  const reversedPayload = [...payload].reverse()

  return (
    <SChartTooltipContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Text fs={12} fw={600} color="text.high">
          {label}
        </Text>
        <Text fs={12} fw={600} color="text.high">
          ${sum.toFixed(2)}
        </Text>
      </div>

      {reversedPayload.map((entry: any) => (
        <Flex key={entry.dataKey} gap={8} align="center">
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: entry.color,
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <Flex justify="space-between" gap={16} sx={{ flex: 1, minWidth: 100 }}>
            <Text
              fs={10}
              fw={500}
              color="text.medium"
              css={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}
            >
              {DESTINATION_LABELS[entry.name as keyof typeof DESTINATION_LABELS] || LABELS[entry.name as keyof typeof LABELS] || entry.name}
            </Text>
            <Text fs={12} fw={500} color="text.high">
              ${Number(entry.value).toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      ))}
    </SChartTooltipContainer>
  )
}

export const FeesOverviewChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>('1M')
  const [viewMode, setViewMode] = useState<ViewMode>('revenue')
  const [activeData, setActiveData] = useState<any | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [groupBy, setGroupBy] = useState<GroupBy>('product')

  const COLORS: Record<string, string> = {
    networkFees: '#8B5CF6',
    tradingFees: theme.text.tint.secondary,
    liquidityFees: '#22C55E',
    supplyBorrowFees: '#F59E0B',
    hollarFees: '#EC4899',
    // Rate Colors
    rateNetwork: '#8B5CF6',
    rateTrading: theme.text.tint.secondary,
    rateLiquidity: '#22C55E',
    rateSupplyBorrow: '#F59E0B',
    rateHollar: '#EC4899',
    // Destination Colors
    treasury: '#F59E0B',
    lps: '#22C55E',
    burned: '#EF4444',
    stakers: '#8B5CF6',
    users: theme.text.tint.secondary,
  }

  const chartData = useMemo(() => generateFeesData(timeRange), [timeRange])

  // Transform data for Destination view
  const destinationData = useMemo(() => {
    return chartData.map(day => ({
      ...day,
      treasury: day.networkFees + day.hollarFees + day.supplyBorrowFees * 0.5,
      lps: day.liquidityFees + day.tradingFees * 0.5,
      burned: day.supplyBorrowFees * 0.5,
      stakers: day.tradingFees * 0.35,
      users: day.tradingFees * 0.15,
    }))
  }, [chartData])

  // Set default active data to last data point
  useEffect(() => {
    const data = groupBy === 'destination' ? destinationData : chartData
    setActiveData(data[data.length - 1])
  }, [chartData, destinationData, groupBy])

  // Calculate hovered total revenue from activeData
  const hoveredValues = useMemo(() => {
    if (!activeData) return { total: null }

    // Calculate sum based on current view/keys
    const keys = groupBy === 'product' ? productKeys : destinationKeys
    const sum = keys.reduce((acc, key) => acc + (Number(activeData[key]) || 0), 0)
    return { total: sum }
  }, [activeData, groupBy])



  const seriesKeys = useMemo(() => {
    if (viewMode === 'fees') return RATE_KEYS as unknown as string[]
    return groupBy === 'product' ? productKeys : destinationKeys
  }, [viewMode, groupBy])

  const hiddenSeries = useMemo(() =>
    activeFilter === 'all'
      ? []
      : seriesKeys.filter(key => key !== activeFilter)
    , [activeFilter, seriesKeys])

  // Calculate total revenue
  const totalRevenue = useMemo(() => chartData.reduce((acc, day) =>
    acc +
    (day.networkFees * 1.0) +
    (day.tradingFees * 1.0) +
    (day.liquidityFees * 1.0) +
    (day.supplyBorrowFees * 1.0) +
    (day.hollarFees * 1.0),
    0
  ), [chartData])

  const currentTradingFee = chartData[chartData.length - 1]?.rateTrading

  const headerTitle = viewMode === 'revenue'
    ? (hoveredValues.total ? 'Daily Revenue' : 'Protocol Revenue')
    : 'Fee Rate Fluctuation'

  return (
    <SChartContainer>
      <SHeaderWrapper>
        <SectionHeader style={{ marginBottom: 0 }}>{headerTitle}</SectionHeader>
        {viewMode === 'revenue' && (
          <SMobileOnly>
            <SelectDropdown
              value={groupBy}
              items={[
                { key: 'product', label: 'By Product' },
                { key: 'destination', label: 'By Destination' }
              ]}
              onValueChange={(v: string) => v && setGroupBy(v as GroupBy)}
            />
          </SMobileOnly>
        )}
      </SHeaderWrapper>
      <SChartHeader>
        <div>
          <SAlignedValueStats
            customValue={
              <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif', lineHeight: 1 }}>
                {viewMode === 'revenue'
                  ? <AnimatedValue value={hoveredValues.total ?? totalRevenue} />
                  : `${currentTradingFee?.toFixed(2)}%`
                }
              </Text>
            }
            bottomLabel={timeRange === '1W' ? 'Last 7 days' :
              timeRange === '1M' ? 'Last 30 days' :
                timeRange === '1Y' ? 'Last year' : 'All time'}
            wrap={true}
            size="medium"
          />
        </div>
        <SControlsGroup>
          <SDesktopOnly>
            <ToggleGroup
              size="small"
              type="single"
              value={viewMode}
              onValueChange={(v: string) => v && setViewMode(v as ViewMode)}
            >
              <ToggleGroupItem value="revenue">Revenue</ToggleGroupItem>
              <ToggleGroupItem value="fees">Fees %</ToggleGroupItem>
            </ToggleGroup>
          </SDesktopOnly>
          {viewMode === 'revenue' && (
            <SDesktopOnly>
              <ToggleGroup
                size="small"
                type="single"
                value={groupBy}
                onValueChange={(v: string) => v && setGroupBy(v as GroupBy)}
              >
                <ToggleGroupItem value="product">By Product</ToggleGroupItem>
                <ToggleGroupItem value="destination">By Destination</ToggleGroupItem>
              </ToggleGroup>
            </SDesktopOnly>
          )}
          <SDesktopOnly>
            <TimeRangeToggle
              value={timeRange}
              items={['1W', '1M', '1Y', 'ALL']}
              onValueChange={(v: string) => setTimeRange(v as TimeRange)}
            />
          </SDesktopOnly>
        </SControlsGroup>
      </SChartHeader>

      <ResponsiveContainer width="100%" height={320}>
        {viewMode === 'revenue' ? (
          // REVENUE MODE: Stacked Bar Chart with absolute $ values
          <BarChart
            data={groupBy === 'destination' ? destinationData : chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state.activePayload && state.activePayload[0]) {
                setActiveData(state.activePayload[0].payload)
              }
            }}
            onMouseLeave={() => {
              // Reset to last data point
              const data = groupBy === 'destination' ? destinationData : chartData
              setActiveData(data[data.length - 1])
            }}
          >
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
              width={45}
            />
            <Tooltip
              content={CustomTooltipContent}
              cursor={{ fill: theme.surfaces.containers.high.hover }}
            />
            {seriesKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={COLORS[key]}
                name={key}
                hide={hiddenSeries.includes(key)}
                radius={index === seriesKeys.length - 1 ? [4, 4, 0, 0] : undefined}
              />
            ))}
          </BarChart>
        ) : (
          // FEES MODE: Area Chart showing % fluctuation of rates with gradient fill
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state.activePayload && state.activePayload[0]) {
                setActiveData(state.activePayload[0].payload)
              }
            }}
            onMouseLeave={() => {
              // Reset to last data point
              const data = groupBy === 'destination' ? destinationData : chartData
              setActiveData(data[data.length - 1])
            }}
          >
            {/* ... gradients ... */}
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
              domain={[0, 'auto']} // Let it auto-scale for larger interest rates
              width={45}
            />
            {/* Reuse customized tooltip or standard one? User only asked for Revenue logic. Use standard for Fees for now or reused? 
                User said "Also for Revenue, can we...". I'll assume standard for now for Fees, but maybe apply same style.
                Actually, let's keep the standard one for Fees mode to avoid breaking it, unless requested.
            */}
            <Tooltip
              content={({ payload, label }) => (
                <SChartTooltipContainer className="chart-tooltip">
                  <Text fs={12} fw={600} color="text.high" style={{ marginBottom: 4 }}>
                    {label}
                  </Text>
                  {payload?.map((entry: any) => (
                    <Flex key={entry.dataKey} gap={8} align="center">
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: entry.color,
                          borderRadius: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Flex justify="space-between" gap={16} sx={{ flex: 1, minWidth: 100 }}>
                        <Text
                          fs={10}
                          fw={500}
                          color="text.medium"
                          css={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}
                        >
                          {LABELS[entry.name as keyof typeof LABELS] || entry.name}
                        </Text>
                        <Text fs={12} fw={500} color="text.high">
                          {Number(entry.value).toFixed(2)}%
                        </Text>
                      </Flex>
                    </Flex>
                  ))}
                </SChartTooltipContainer>
              )}
            />
            {/* ... Legend and Areas ... */}
            {RATE_KEYS.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[key]}
                fill={`url(#grad${key.charAt(0).toUpperCase() + key.slice(1)})`}
                strokeWidth={2}
                name={key}
                hide={hiddenSeries.includes(key)}
              />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>

      <SLegendContainer className="no-scrollbar">
        {/* Toggle Buttons: mimic TimeRangeToggle logic (Exclusive selection) */}
        {['all', ...seriesKeys].map((key) => {
          const isActive = activeFilter === key
          const isAll = key === 'all'

          return (
            <Button
              key={key}
              size="small"
              variant={isActive ? "secondary" : "restSubtle"}
              outline={!isActive}
              onClick={() => setActiveFilter(key)}
              sx={{
                gap: 8,
                height: 30,
                px: 12,
                minWidth: 30,
                borderRadius: 32, // Pill shape like TimeRangeToggle
                flexShrink: 0, // Prevent shrinking in scroll container
              }}
            >
              {!isAll && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: isActive ? 'currentColor' : COLORS[key], // Use currentColor if active (likely white), else series color
                    borderRadius: '50%',
                  }}
                />
              )}
              <Text fs={11} fw={500} color="text.high">
                {isAll ? "All" : (DESTINATION_LABELS[key as keyof typeof DESTINATION_LABELS] || LABELS[key as keyof typeof LABELS] || key)}
              </Text>
              {!isAll && activeData && (
                <Text fs={11} fw={500} color="text.medium">
                  {viewMode === 'revenue'
                    ? `$${(activeData[key] ?? 0).toFixed(0)}` // Compact number for mobile
                    : `${(activeData[key] ?? 0).toFixed(1)}%`
                  }
                </Text>
              )}
            </Button>
          )
        })}
      </SLegendContainer>

      <SChartFooter>
        <div style={{ flex: 1 }}>
          <SFullWidthToggleGroup type="single" value={viewMode} onValueChange={(val: string) => val && setViewMode(val as 'revenue' | 'fees')}>
            <ToggleGroupItem value="revenue">Revenue</ToggleGroupItem>
            <ToggleGroupItem value="fees">Fees %</ToggleGroupItem>
          </SFullWidthToggleGroup>
        </div>

        <div style={{ flex: 1 }}>
          <SelectDropdown
            value={timeRange}
            items={['1W', '1M', '1Y', 'ALL'].map(range => ({ key: range, label: range }))}
            onValueChange={(val: string) => setTimeRange(val as TimeRange)}
          />
        </div>
      </SChartFooter>
    </SChartContainer >
  )
}
