import styled from "@emotion/styled"
import { Text, ToggleGroup, ToggleGroupItem } from "@galacticcouncil/ui/components"
import { SelectDropdown } from "./SelectDropdown"
import { TimeRangeToggle } from "@galacticcouncil/ui/components"
import { FC, useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { useTheme } from "@galacticcouncil/ui/theme"
import { ChartTooltipContent, chartCursorStyle } from "./StatsChartTooltip"

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
  gap: 16px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
    display: none;

    @media ${({ theme }) => (theme as any).mediaDevice?.desktop || '(min-width: 576px)'} {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`

const SFullWidthToggleGroup = styled(ToggleGroup)`
    width: 100%;
    display: flex;
    height: 40px;
    background: ${({ theme }) => theme.surfaces.themeBasePalette.surfaceHigh};
    padding: 4px;
    border-radius: ${({ theme }) => theme.containers.cornerRadius.buttonsPrimary}px;
    border: 1px solid ${({ theme }) => theme.buttons.outlineDark.onOutline};
`

const SToggleGroupItem = styled(ToggleGroupItem)`
    flex: 1;
    justify-content: center;
    text-align: center;
    
    // Override styling if needed to match mobile expectations? 
    // Assuming base ToggleGroupItem is flexible enough or handled by library.
    // If not, we might need more CSS.
    // But usually standard item works.
`

const SChartFooter = styled.div`
  display: none;
  
  @media (max-width: 576px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    flex-wrap: wrap;
  }
`




const SLegendRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    display: none;
  }
`

const SLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SLegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
`





// Generate mock data for the chart
const generateMockData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Simulate some variance with a general upward trend
    const baseOmnipool = 80 + Math.random() * 15 + (90 - i) * 0.05
    const baseStable = 50 + Math.random() * 10 + (90 - i) * 0.03
    const baseMM = 30 + Math.random() * 8 + (90 - i) * 0.02
    const baseXYK = 5 + Math.random() * 3

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      omnipool: baseOmnipool,
      stablePools: baseStable,
      moneyMarket: baseMM,
      xykPools: baseXYK,
    })
  }

  return data
}



type TimeRange = '1W' | '1M' | '3M'
type Filter = 'All' | 'Omnipool' | 'Stable' | 'XYK' | 'MM'

type Props = {
  title?: string
  value?: string
}

export const TVLCompositionChart: FC<Props> = ({
  title = "Total Value Locked",
  value = "$183.59M"
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('3M')
  const [filter, setFilter] = useState<Filter>('All')

  // Generate data once with useMemo to avoid regenerating on every render
  const chartData = useMemo(() => generateMockData(), [])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 90
    return chartData.slice(-days)
  }, [chartData, timeRange])

  const { themeProps: theme } = useTheme()

  const COLORS = {
    omnipool: theme.text.tint.secondary,
    stablePools: '#22C55E',
    moneyMarket: '#F59E0B',
    xykPools: '#A855F7',
  }

  return (
    <SChartContainer>
      <SChartHeader>
        <div>
          <Text fs={14} color="text.medium">{title}</Text>
          <Text fs={32} fw={700} color="secondaryColors.pink.coralPink" style={{ fontFamily: 'Gazpacho, sans-serif' }}>
            {value}
          </Text>
        </div>
        <SControlsGroup>
          <ToggleGroup
            size="small"
            type="single"
            value={filter}
            onValueChange={(v) => v && setFilter(v as Filter)}
          >
            {(['All', 'Omnipool', 'Stable', 'XYK', 'MM'] as Filter[]).map((f) => (
              <ToggleGroupItem
                key={f}
                value={f}
              >
                {f}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <TimeRangeToggle
            value={timeRange}
            items={['1W', '1M', '3M']}
            onValueChange={(v) => setTimeRange(v as TimeRange)}
            className="desktop-only"
          />
        </SControlsGroup>
      </SChartHeader>


      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradOmnipool" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.omnipool} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.omnipool} stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="gradStable" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.stablePools} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.stablePools} stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="gradMM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.moneyMarket} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.moneyMarket} stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="gradXYK" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.xykPools} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS.xykPools} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme.text.medium, fontSize: 11 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: theme.text.medium, fontSize: 11 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
            tickFormatter={(value) => `$${value}M`}
            width={45}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload as any}
                label={label}
                valueFormatter={(v) => `$${v.toFixed(2)}M`}
              />
            )}
            cursor={chartCursorStyle}
          />
          {(filter === 'All' || filter === 'Omnipool') && (
            <Area
              type="monotone"
              dataKey="omnipool"
              stackId="1"
              stroke={COLORS.omnipool}
              fill="url(#gradOmnipool)"
              name="Omnipool"
            />
          )}
          {(filter === 'All' || filter === 'Stable') && (
            <Area
              type="monotone"
              dataKey="stablePools"
              stackId="1"
              stroke={COLORS.stablePools}
              fill="url(#gradStable)"
              name="Stable Pools"
            />
          )}
          {(filter === 'All' || filter === 'MM') && (
            <Area
              type="monotone"
              dataKey="moneyMarket"
              stackId="1"
              stroke={COLORS.moneyMarket}
              fill="url(#gradMM)"
              name="Money Market"
            />
          )}
          {(filter === 'All' || filter === 'XYK') && (
            <Area
              type="monotone"
              dataKey="xykPools"
              stackId="1"
              stroke={COLORS.xykPools}
              fill="url(#gradXYK)"
              name="XYK Pools"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>

      <SLegendRow>
        <SLegendItem>
          <SLegendDot $color={COLORS.omnipool} />
          <Text fs={12} color="text.medium">Omnipool</Text>
        </SLegendItem>
        <SLegendItem>
          <SLegendDot $color={COLORS.stablePools} />
          <Text fs={12} color="text.medium">Stable Pools</Text>
        </SLegendItem>
        <SLegendItem>
          <SLegendDot $color={COLORS.moneyMarket} />
          <Text fs={12} color="text.medium">Money Market</Text>
        </SLegendItem>
        <SLegendItem>
          <SLegendDot $color={COLORS.xykPools} />
          <Text fs={12} color="text.medium">XYK Pools</Text>
        </SLegendItem>
      </SLegendRow>

      <SChartFooter>
        <div style={{ flex: 1 }}>
          <SelectDropdown
            value={filter}
            onValueChange={(value) => setFilter(value as Filter)}
            items={[
              { key: 'All', label: 'All (5/5)' },
              { key: 'Omnipool', label: 'Omnipool' },
              { key: 'Stable', label: 'Stable' },
              { key: 'XYK', label: 'XYK' },
              { key: 'MM', label: 'MM' },
            ]}
            label="Filter:"
          />
        </div>

        <div style={{ flex: 1 }}>
          <SFullWidthToggleGroup type="single" value={timeRange} onValueChange={(val) => val && setTimeRange(val as TimeRange)}>
            {['1W', '1M', '3M'].map(range => (
              <SToggleGroupItem key={range} value={range}>{range}</SToggleGroupItem>
            ))}
          </SFullWidthToggleGroup>
        </div>
      </SChartFooter>
    </SChartContainer >
  )
}
