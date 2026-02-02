import styled from "@emotion/styled"
import { Flex, Stack, Text, ToggleGroup, ToggleGroupItem } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css } from "@galacticcouncil/ui/utils"
import { FC, useMemo, useState } from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled(Flex)`
  margin-bottom: 24px;
`

const STimeRangeGroup = styled.div(
    () => css`
    display: flex;
    gap: 8px;
  `,
)

const STimeButton = styled.button<{ $active?: boolean }>(
    ({ theme, $active }) => css`
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    transition: all 0.2s;
    background: ${$active
            ? theme.surfaces.containers.high.hover
            : "transparent"};
    color: ${$active ? theme.text.high : theme.text.medium};

    &:hover {
      color: ${theme.text.high};
    }
  `,
)

const SChartWrapper = styled.div`
  width: 100%;
  height: 320px;
`

const SLegend = styled(Flex)`
  margin-top: 20px;
  flex-wrap: wrap;
`

const SLegendItem = styled(Flex)`
  cursor: pointer;
`

const SColorDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
`

const STooltipContainer = styled.div(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    min-width: 180px;
  `,
)

// Mock data generator
const generateMockData = (range: string) => {
    const points = range === "7D" ? 7 : range === "30D" ? 30 : 90
    const series = [
        { id: "8.3x", base: 15 },
        { id: "6.5x", base: 13 },
        { id: "4.7x", base: 11 },
        { id: "2.9x", base: 9 },
    ]

    return Array.from({ length: points }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (points - i))
        const formattedDate = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
        })

        const dataPoint: any = {
            date: formattedDate,
            fullDate: date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
        }

        // Simulate the dip in the screenshot around middle
        let dip = 0
        const dipIndex = Math.floor(points * 0.45)
        if (i === dipIndex) dip = 4
        if (i === dipIndex - 1 || i === dipIndex + 1) dip = 2

        series.forEach((s) => {
            const variation = Math.sin(i * 0.1) * 0.3 + Math.random() * 0.4
            dataPoint[s.id] = Math.max(0, s.base + variation - dip)
        })

        return dataPoint
    })
}

export const NetApyChart: FC = () => {
    const { themeProps: theme } = useTheme()
    const [activeMode, setActiveMode] = useState<string>("netApy")
    const [timeRange, setTimeRange] = useState("30D")

    const series = [
        { id: "2.9x", color: "#5EA1FF" },
        { id: "4.7x", color: "#45E1B5" },
        { id: "6.5x", color: "#A084FF" },
        { id: "8.3x", color: "#FF4D4D" },
    ]

    const data = useMemo(() => generateMockData(timeRange), [timeRange])

    return (
        <SChartContainer>
            <SChartHeader justify="space-between" align="center">
                <ToggleGroup
                    type="single"
                    value={activeMode}
                    onValueChange={(val: string) => val && setActiveMode(val)}
                >
                    <ToggleGroupItem value="netApy">Net APY</ToggleGroupItem>
                    <ToggleGroupItem value="underlying">Underlying APYs</ToggleGroupItem>
                </ToggleGroup>

                <STimeRangeGroup>
                    {["7D", "30D", "3M"].map((range) => (
                        <STimeButton
                            key={range}
                            $active={timeRange === range}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </STimeButton>
                    ))}
                </STimeRangeGroup>
            </SChartHeader>

            <SChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            {series.map((s) => (
                                <linearGradient
                                    key={`grad-${s.id}`}
                                    id={`grad-${s.id}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop offset="5%" stopColor={s.color} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid
                            strokeDasharray="0"
                            stroke={theme.details.separators}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.text.medium, fontSize: 11 }}
                            minTickGap={30}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.text.medium, fontSize: 11 }}
                            tickFormatter={(val) => `${val}%`}
                            orientation="right"
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const sortedPayload = [...payload].sort(
                                        (a, b) => (b.value as number) - (a.value as number),
                                    )
                                    return (
                                        <STooltipContainer>
                                            <Text fs={12} fw={600} mb={8} color={theme.text.high}>
                                                {payload[0].payload.fullDate} 03:00
                                            </Text>
                                            <Stack gap={4}>
                                                {sortedPayload.map((entry: any) => (
                                                    <Flex
                                                        key={entry.dataKey}
                                                        justify="space-between"
                                                        gap={20}
                                                    >
                                                        <Text fs={12} color={entry.color} fw={600}>
                                                            {entry.dataKey} Leverage
                                                        </Text>
                                                        <Text fs={12} fw={700} color={theme.text.high}>
                                                            {Number(entry.value).toFixed(2)}%
                                                        </Text>
                                                    </Flex>
                                                ))}
                                            </Stack>
                                        </STooltipContainer>
                                    )
                                }
                                return null
                            }}
                        />
                        {series.map((s) => (
                            <Area
                                key={s.id}
                                type="monotone"
                                dataKey={s.id}
                                stroke={s.color}
                                fillOpacity={1}
                                fill={`url(#grad-${s.id})`}
                                strokeWidth={2}
                                activeDot={{ r: 4, strokeWidth: 0 }}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </SChartWrapper>

            <SLegend gap={20}>
                <Text fs={12} color={theme.text.medium}>
                    Multiplier:
                </Text>
                {series.map((s) => (
                    <SLegendItem key={s.id} align="center" gap={6}>
                        <SColorDot color={s.color} />
                        <Text fs={12} fw={600} color={theme.text.high}>
                            {s.id}
                        </Text>
                    </SLegendItem>
                ))}
            </SLegend>
        </SChartContainer>
    )
}
