import styled from "@emotion/styled"
import { Button, Flex, Text } from "@galacticcouncil/ui/components"
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
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

// Generate mock supply/borrow data
const generateSupplyBorrowData = () => {
    const data = []
    const now = new Date()

    for (let i = 90; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        const supply = 10 + (90 - i) * 0.03 + Math.random() * 1
        const borrow = 5 + (90 - i) * 0.02 + Math.random() * 0.8

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            supply,
            borrow,
        })
    }

    return data
}

const chartData = generateSupplyBorrowData()

type TimeRange = '7D' | '30D' | 'MAX'

type Props = {
    title?: string
}

export const SupplyBorrowChart: FC<Props> = ({
    title = "Supply / Borrow History"
}) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('30D')

    const getFilteredData = () => {
        const days = timeRange === '7D' ? 7 : timeRange === '30D' ? 30 : 90
        return chartData.slice(-days)
    }

    const filteredData = getFilteredData()
    const latestData = filteredData[filteredData.length - 1]

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={14} color="rgba(255,255,255,0.6)">{title}</Text>
                </div>
                <Flex gap={6}>
                    {(['7D', '30D', 'MAX'] as TimeRange[]).map((range) => (
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
                <AreaChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="borrowGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value.toFixed(0)}M`}
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
                    <Area
                        type="monotone"
                        dataKey="supply"
                        stroke="#22C55E"
                        fill="url(#supplyGrad)"
                        strokeWidth={2}
                        name="Supply"
                    />
                    <Area
                        type="monotone"
                        dataKey="borrow"
                        stroke="#F59E0B"
                        fill="url(#borrowGrad)"
                        strokeWidth={2}
                        name="Borrow"
                    />
                </AreaChart>
            </ResponsiveContainer>

            <SLegendRow>
                <SLegendItem>
                    <SLegendDot $color="#22C55E" />
                    <Text fs={12} color="rgba(255,255,255,0.6)">Supply:</Text>
                    <Text fs={12} fw={500}>${latestData?.supply.toFixed(2)}M</Text>
                </SLegendItem>
                <SLegendItem>
                    <SLegendDot $color="#F59E0B" />
                    <Text fs={12} color="rgba(255,255,255,0.6)">Borrow:</Text>
                    <Text fs={12} fw={500}>${latestData?.borrow.toFixed(2)}M</Text>
                </SLegendItem>
            </SLegendRow>
        </SChartContainer >
    )
}
