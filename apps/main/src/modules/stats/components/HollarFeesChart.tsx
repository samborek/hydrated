import styled from "@emotion/styled"
import { Button, Flex, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useState, useMemo } from "react"
import {
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


// Generate mock Hollar fees data
const generateHollarFeesData = (timeRange: TimeRange) => {
    const data = []
    const now = new Date()

    const isWeekly = timeRange === '1Y' || timeRange === 'ALL'
    const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '1Y' ? 52 : 104
    const step = isWeekly ? 7 : 1

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - (i * step))

        const multiplier = isWeekly ? 7 : 1

        // HSM revenue from yield-bearing stablecoins
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            hsmRevenue: (Math.random() * 800 + 200) * multiplier,
        })
    }

    return data
}

type TimeRange = '1W' | '1M' | '1Y' | 'ALL'

export const HollarFeesChart: FC = () => {
    const { themeProps: theme } = useTheme()
    const [timeRange, setTimeRange] = useState<TimeRange>('1M')

    const feesData = useMemo(() => generateHollarFeesData(timeRange), [timeRange])

    // Calculate total
    const latestValue = feesData[feesData.length - 1]?.hsmRevenue || 0

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={24} fw={700} color="#8B5CF6" style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        ${(latestValue / 1000).toFixed(2)}K
                    </Text>
                    <Text fs={12} color={theme.text.low}>
                        HSM Revenue (latest)
                    </Text>
                </div>
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
            </SChartHeader>



            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={feesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="hollarFeesGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => (
                            <ChartTooltipContent
                                active={active}
                                payload={payload as any}
                                label={label}
                                valueFormatter={(v) => `$${v.toFixed(2)}`}
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
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                                            {entry.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    <Area
                        type="monotone"
                        dataKey="hsmRevenue"
                        stroke="#8B5CF6"
                        fill="url(#hollarFeesGrad)"
                        strokeWidth={2}
                        name="HSM Revenue"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </SChartContainer >
    )
}
