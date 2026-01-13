import styled from "@emotion/styled"
import { Button, Flex, Text } from "@galacticcouncil/ui/components"
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




// Generate mock fees data
const generateFeesData = () => {
    const data = []
    const now = new Date()

    for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            swap: Math.random() * 5000 + 2000,
            liquidations: Math.random() * 1000 + 200,
            hollar: Math.random() * 800 + 100,
            tips: Math.random() * 300 + 50,
            txFees: Math.random() * 500 + 100,
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
                    <Text fs={14} color="rgba(255,255,255,0.6)">{title}</Text>
                    <Text fs={28} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        ${(totalFees / 1000).toFixed(1)}K
                    </Text>
                    <Text fs={12} color="rgba(255,255,255,0.4)">
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
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)} K`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(20, 20, 30, 0.95)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: '#fff',
                        }}
                        formatter={(value: number) => [`$${value.toFixed(2)} `, '']}
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
