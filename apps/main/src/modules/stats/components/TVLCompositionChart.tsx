import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  margin-bottom: 8px;
`

const SControlsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 16px;
`




const SLegendRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
  flex-wrap: wrap;
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

const SPillToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 4px;
`

const SPillButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => $active ? '#85D1FF' : 'transparent'};
  color: ${({ $active }) => $active ? '#000' : 'rgba(255, 255, 255, 0.6)'};
  border: none;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ $active }) => $active ? '#000' : '#fff'};
  }
`

const SCircleToggle = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const SCircleButton = styled.button<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${({ $active }) => $active ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #fff;
    background: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  }
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

const chartData = generateMockData()

const COLORS = {
    omnipool: '#3B82F6',
    stablePools: '#22C55E',
    moneyMarket: '#F59E0B',
    xykPools: '#A855F7',
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

    // Filter data based on time range
    const getFilteredData = () => {
        const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 90
        return chartData.slice(-days)
    }

    const filteredData = getFilteredData()

    // Calculate totals for legend
    const latestData = filteredData[filteredData.length - 1]
    const totals = {
        omnipool: `$${(latestData?.omnipool || 0).toFixed(2)}M`,
        stablePools: `$${(latestData?.stablePools || 0).toFixed(2)}M`,
        moneyMarket: `$${(latestData?.moneyMarket || 0).toFixed(2)}M`,
        xykPools: `$${(latestData?.xykPools || 0).toFixed(2)}M`,
    }

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={14} color="rgba(255,255,255,0.6)">{title}</Text>
                    <Text fs={32} fw={700} color="#FF4B8C" style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        {value}
                    </Text>
                </div>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value}M`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(20, 20, 30, 0.95)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: '#fff',
                        }}
                        formatter={(value: number) => [`$${value.toFixed(2)}M`, '']}
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
                    <Text fs={12} color="rgba(255,255,255,0.6)">Omnipool:</Text>
                    <Text fs={12} fw={500}>{totals.omnipool}</Text>
                </SLegendItem>
                <SLegendItem>
                    <SLegendDot $color={COLORS.stablePools} />
                    <Text fs={12} color="rgba(255,255,255,0.6)">Stable Pools:</Text>
                    <Text fs={12} fw={500}>{totals.stablePools}</Text>
                </SLegendItem>
                <SLegendItem>
                    <SLegendDot $color={COLORS.moneyMarket} />
                    <Text fs={12} color="rgba(255,255,255,0.6)">Money Market:</Text>
                    <Text fs={12} fw={500}>{totals.moneyMarket}</Text>
                </SLegendItem>
                <SLegendItem>
                    <SLegendDot $color={COLORS.xykPools} />
                    <Text fs={12} color="rgba(255,255,255,0.6)">XYK Pools:</Text>
                    <Text fs={12} fw={500}>{totals.xykPools}</Text>
                </SLegendItem>
            </SLegendRow>

            <SControlsFooter>
                <SPillToggle>
                    {(['All', 'Omnipool', 'Stable', 'XYK', 'MM'] as Filter[]).map((f) => (
                        <SPillButton
                            key={f}
                            $active={filter === f}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </SPillButton>
                    ))}
                </SPillToggle>
                <SCircleToggle>
                    {(['1W', '1M', '3M'] as TimeRange[]).map((range) => (
                        <SCircleButton
                            key={range}
                            $active={timeRange === range}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </SCircleButton>
                    ))}
                </SCircleToggle>
            </SControlsFooter>
        </SChartContainer >
    )
}
