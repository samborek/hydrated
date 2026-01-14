import styled from "@emotion/styled"
import { Button, Flex, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
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


// Generate mock volume data
const generateVolumeData = () => {
    const data = []
    const now = new Date()

    for (let i = 90; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        // Simulate daily volume with some variance
        const baseVolume = 8 + Math.random() * 6 + Math.sin(i / 7) * 2

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            volume: baseVolume,
        })
    }

    return data
}

const volumeData = generateVolumeData()

type TimeRange = '7D' | '30D' | 'MAX'

type Props = {
    title?: string
    value?: string
}

export const VolumeChart: FC<Props> = ({
    title = "24h Volume",
    value = "$10.3M"
}) => {
    const { themeProps: theme } = useTheme()
    const [timeRange, setTimeRange] = useState<TimeRange>('30D')

    // Filter data based on time range
    const getFilteredData = () => {
        const days = timeRange === '7D' ? 7 : timeRange === '30D' ? 30 : 90
        return volumeData.slice(-days)
    }

    const filteredData = getFilteredData()

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={14} color={theme.text.medium}>{title}</Text>
                    <Text fs={28} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        {value}
                    </Text>
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

            <ResponsiveContainer width="100%" height={330}>
                <AreaChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: theme.text.low, fontSize: 10 }}
                        axisLine={{ stroke: theme.details.separators }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: theme.text.low, fontSize: 10 }}
                        axisLine={{ stroke: theme.details.separators }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value}M`}
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
                        cursor={{ fill: theme.surfaces.containers.high.hover }}
                    />

                    <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="#3B82F6"
                        fill="url(#volumeGrad)"
                        strokeWidth={2}
                        name="Volume"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </SChartContainer >
    )
}

