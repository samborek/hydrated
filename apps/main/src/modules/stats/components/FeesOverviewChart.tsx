import styled from "@emotion/styled"
import { Button, Flex, Text, ToggleGroup, ToggleGroupItem } from "@galacticcouncil/ui/components"
import { FC, useState, useMemo } from "react"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
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


// Generate mock fees data with all 5 categories
const generateFeesData = (timeRange: TimeRange) => {
    const data = []
    const now = new Date()

    // Determine number of data points and granularity
    const isWeekly = timeRange === '1Y' || timeRange === 'ALL'
    const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '1Y' ? 52 : 104
    const step = isWeekly ? 7 : 1

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - (i * step))

        const multiplier = isWeekly ? 7 : 1 // Weekly data is ~7x daily

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            networkFees: (Math.random() * 500 + 100) * multiplier,
            tradingFees: (Math.random() * 5000 + 2000) * multiplier,
            liquidityFees: (Math.random() * 1500 + 500) * multiplier,
            supplyBorrowFees: (Math.random() * 2000 + 800) * multiplier,
            hollarFees: (Math.random() * 800 + 200) * multiplier,
        })
    }

    return data
}

// Convert absolute fees to percentage distribution
const convertToPercentages = (data: ReturnType<typeof generateFeesData>) => {
    return data.map(day => {
        const total = day.networkFees + day.tradingFees + day.liquidityFees + day.supplyBorrowFees + day.hollarFees
        return {
            date: day.date,
            networkFees: (day.networkFees / total) * 100,
            tradingFees: (day.tradingFees / total) * 100,
            liquidityFees: (day.liquidityFees / total) * 100,
            supplyBorrowFees: (day.supplyBorrowFees / total) * 100,
            hollarFees: (day.hollarFees / total) * 100,
        }
    })
}

const COLORS = {
    networkFees: '#8B5CF6',
    tradingFees: '#3B82F6',
    liquidityFees: '#22C55E',
    supplyBorrowFees: '#F59E0B',
    hollarFees: '#EC4899',
}

const LABELS = {
    networkFees: 'Network Fees',
    tradingFees: 'Trading Fees',
    liquidityFees: 'Liquidity/Withdraw Fees',
    supplyBorrowFees: 'Supply & Borrow Fees',
    hollarFees: 'Hollar Fees',
}

type TimeRange = '1W' | '1M' | '1Y' | 'ALL'
type ViewMode = 'fees' | 'revenue'

const FEE_KEYS = ['networkFees', 'tradingFees', 'liquidityFees', 'supplyBorrowFees', 'hollarFees'] as const

export const FeesOverviewChart: FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('1M')
    const [viewMode, setViewMode] = useState<ViewMode>('revenue')

    const rawFeesData = useMemo(() => generateFeesData(timeRange), [timeRange])
    const percentageData = useMemo(() => convertToPercentages(rawFeesData), [rawFeesData])

    // Calculate total revenue (protocol's portion ~60% of fees)
    const totalRevenue = rawFeesData.reduce((acc, day) =>
        acc + (day.networkFees + day.tradingFees + day.liquidityFees + day.supplyBorrowFees + day.hollarFees) * 0.6, 0
    )

    // For fees mode, show current period average % distribution
    const latestPercentages = percentageData[percentageData.length - 1]

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={14} color="rgba(255,255,255,0.6)">
                        {viewMode === 'revenue' ? 'Protocol Revenue' : 'Fee Distribution (%)'}
                    </Text>
                    <Text fs={32} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        {viewMode === 'revenue'
                            ? `$${(totalRevenue / 1000).toFixed(1)}K`
                            : `${latestPercentages?.tradingFees.toFixed(1)}% Trading`
                        }
                    </Text>
                    <Text fs={12} color="rgba(255,255,255,0.4)">
                        {timeRange === '1W' ? 'Last 7 days' :
                            timeRange === '1M' ? 'Last 30 days' :
                                timeRange === '1Y' ? 'Last year' : 'All time'}
                    </Text>
                </div>
            </SChartHeader>


            <ResponsiveContainer width="100%" height={320}>
                {viewMode === 'revenue' ? (
                    // REVENUE MODE: Stacked Bar Chart with absolute $ values
                    <BarChart data={rawFeesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(20, 20, 30, 0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                color: '#fff',
                            }}
                            formatter={(value: number, name: string) => [
                                `$${(value * 0.6).toFixed(2)}`,
                                LABELS[name as keyof typeof LABELS] || name
                            ]}
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
                                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
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
                        <Bar dataKey="hollarFees" stackId="a" fill={COLORS.hollarFees} name="hollarFees" radius={[2, 2, 0, 0]} />
                    </BarChart>
                ) : (
                    // FEES MODE: Line Chart showing % distribution over time
                    <LineChart data={percentageData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                            tickFormatter={(value) => `${value.toFixed(0)}%`}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(20, 20, 30, 0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                color: '#fff',
                            }}
                            formatter={(value: number, name: string) => [
                                `${value.toFixed(1)}%`,
                                LABELS[name as keyof typeof LABELS] || name
                            ]}
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
                                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                                                {LABELS[entry.value as keyof typeof LABELS] || entry.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {FEE_KEYS.map((key) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={COLORS[key]}
                                strokeWidth={2}
                                dot={false}
                                name={key}
                            />
                        ))}
                    </LineChart>
                )}
            </ResponsiveContainer>

            <SControlsFooter>
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
            </SControlsFooter>
        </SChartContainer>
    )
}
