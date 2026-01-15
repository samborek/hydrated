import styled from "@emotion/styled"
import { Flex, Text, ToggleGroup, ToggleGroupItem } from "@galacticcouncil/ui/components"
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
import { css } from "@galacticcouncil/ui/utils"
import { useTheme } from "@galacticcouncil/ui/theme"

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`

const SCircleToggle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const SCircleButton = styled.button<{ $active: boolean }>(
    ({ theme, $active }) => css`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${$active ? theme.surfaces.containers.high.hover : 'transparent'};
    color: ${$active ? theme.text.high : theme.text.medium};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: ${theme.text.high};
      background: ${$active ? theme.surfaces.containers.high.hover : theme.surfaces.containers.high.primary};
    }
  `
)

const SChartWrapper = styled.div`
  width: 100%;
  height: 360px;
`

// Generate mock price data
const generatePriceData = (timeRange: string) => {
    const data = []
    const now = new Date()
    const points = timeRange === '1H' ? 60 : timeRange === '1D' ? 24 : timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 90

    for (let i = points; i >= 0; i--) {
        const date = new Date(now)
        if (timeRange === '1H') {
            date.setMinutes(date.getMinutes() - i)
        } else if (timeRange === '1D') {
            date.setHours(date.getHours() - i)
        } else {
            date.setDate(date.getDate() - i)
        }

        const basePrice = 0.00000035
        const variation = (Math.random() - 0.5) * 0.0000001
        const price = basePrice + variation + (i * 0.000000001)

        data.push({
            date: timeRange === '1H'
                ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: Math.max(0.00000001, price),
        })
    }

    return data
}

type TimeRange = 'ALL' | '1H' | '1D' | '1W' | '1M'
type ChartMode = 'TVL' | 'Volume'

type Props = {
    symbol: string
}

export const AssetPriceChart: FC<Props> = ({ symbol }) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('1H')
    const [mode, setMode] = useState<ChartMode>('TVL')

    const chartData = generatePriceData(timeRange)
    const currentPrice = chartData[chartData.length - 1]?.price || 0
    const firstPrice = chartData[0]?.price || 0
    const priceChange = ((currentPrice - firstPrice) / firstPrice) * 100

    const { themeProps: theme } = useTheme()

    return (
        <>
            <SChartHeader>
                <Flex direction="column" gap={8}>
                    <ToggleGroup
                        type="single"
                        value={mode}
                        onValueChange={(v) => v && setMode(v as ChartMode)}
                    >
                        <ToggleGroupItem value="TVL">TVL</ToggleGroupItem>
                        <ToggleGroupItem value="Volume">Volume</ToggleGroupItem>
                    </ToggleGroup>
                    <Flex gap={8} align="baseline">
                        <Text fs={18} fw={600} color="text.high">
                            {currentPrice.toFixed(9)} {symbol}
                        </Text>
                        <Text
                            fs={14}
                            fw={500}
                            color={priceChange >= 0 ? "successGreen.500" : "error.default"}
                        >
                            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                        </Text>
                    </Flex>
                </Flex>
                <SCircleToggle>
                    {(['ALL', '1H', '1D', '1W', '1M'] as TimeRange[]).map((range) => (
                        <SCircleButton
                            key={range}
                            $active={timeRange === range}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </SCircleButton>
                    ))}
                </SCircleToggle>
            </SChartHeader>

            <SChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={theme.text.tint.secondary} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={theme.text.tint.secondary} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: theme.text.medium, fontSize: 11 }}
                            axisLine={{ stroke: theme.details.separators }}
                            tickLine={false}
                        />
                        <YAxis
                            hide
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => (
                                <ChartTooltipContent
                                    active={active}
                                    payload={payload as any}
                                    label={label}
                                    valueFormatter={(v) => `${v.toFixed(9)} ${symbol}`}
                                />
                            )}
                            cursor={chartCursorStyle}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={theme.text.tint.secondary}
                            fill="url(#priceGrad)"
                            strokeWidth={2}
                            name="Price"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </SChartWrapper>
        </>
    )
}
