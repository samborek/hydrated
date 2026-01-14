import styled from "@emotion/styled"
import { Button, Flex, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useState } from "react"
import {
    BarChart,
    Bar,
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




// Generate mock fees data with realistic relative distributions
const generateFeesData = () => {
    const data = []
    const now = new Date()

    for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        const volatility = () => 0.7 + Math.random() * 0.6

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            // Swap: Main volume, similar to Trading Fees
            swap: (Math.random() * 4000 + 2000) * volatility(),
            // Liquidations: Part of Supply/Borrow, spikey
            liquidations: (Math.random() * 500 + 100) * volatility(),
            // Hollar: Consistent borrow interest
            hollar: (Math.random() * 600 + 300) * volatility(),
            // Tips: Very small part of Network fees
            tips: (Math.random() * 10 + 2) * volatility(),
            // TX Fees: Small base network fees
            txFees: (Math.random() * 40 + 15) * volatility(),
        })
    }

    return data
}

const feesData = generateFeesData()

const COLORS = {
    swap: '#3B82F6',
    liquidations: '#EF4444',
    hollar: '#22C55E',
    tips: '#F59E0B',
    txFees: '#8B5CF6',
}

type TimeRange = '1W' | '1M' | '3M'

type Props = {
    title?: string
}

export const FeesStackedChart: FC<Props> = ({
    title = "Fees summary"
}) => {
    const { themeProps: theme } = useTheme()
    const [timeRange, setTimeRange] = useState<TimeRange>('1M')

    // Filter data based on time range
    const getFilteredData = () => {
        const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 90
        return feesData.slice(-days)
    }

    const filteredData = getFilteredData()

    // Calculate total fees
    const totalFees = filteredData.reduce((acc, day) =>
        acc + day.swap + day.liquidations + day.hollar + day.tips + day.txFees, 0
    )

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={14} color={theme.text.medium}>{title}</Text>
                    <Text fs={28} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        ${(totalFees / 1000).toFixed(1)}K
                    </Text>
                    <Text fs={12} color={theme.text.low}>
                        Last {timeRange === '1W' ? '7 days' : timeRange === '1M' ? '30 days' : '90 days'}
                    </Text>
                </div>
                <Flex gap={6}>
                    {(['1W', '1M', '3M'] as TimeRange[]).map((range) => (
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
                <BarChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)} K`}
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
                                        <span style={{ color: theme.text.low, fontSize: '12px' }}>
                                            {entry.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    <Bar dataKey="swap" stackId="a" fill={COLORS.swap} name="Swap Fees" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="liquidations" stackId="a" fill={COLORS.liquidations} name="Liquidations" />
                    <Bar dataKey="hollar" stackId="a" fill={COLORS.hollar} name="Hollar" />
                    <Bar dataKey="tips" stackId="a" fill={COLORS.tips} name="Tips" />
                    <Bar dataKey="txFees" stackId="a" fill={COLORS.txFees} name="TX Fees" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </SChartContainer>
    )
}
