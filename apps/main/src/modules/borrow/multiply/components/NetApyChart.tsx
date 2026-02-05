import { Theme } from "@emotion/react"
import styled from "@emotion/styled"
import {
  Flex,
  Stack,
  Text,
  TimeRangeToggle,
} from "@galacticcouncil/ui/components"
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

const SChartContainer = styled.div(
  ({ theme }: { theme: Theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: 20px;
    width: 100%;
  `,
)

const SChartHeader = styled(Flex)`
  margin-bottom: 24px;
`

const SChartWrapper = styled.div`
  width: 100%;
  height: 400px;
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
  background: ${({ color }: { color: string }) => color};
`

const STooltipContainer = styled.div(
  ({ theme }: { theme: Theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    min-width: 180px;
  `,
)

type DataPoint = {
  date: string
  fullDate: string
} & Record<string, number | string>

// Mock data generator
const generateMockData = (range: string) => {
  const points =
    range === "1W" ? 7 : range === "1M" ? 30 : range === "1D" ? 24 : 90
  const series = [
    { id: "8.3x", base: 15 },
    { id: "6.5x", base: 13 },
    { id: "4.7x", base: 11 },
    { id: "2.9x", base: 9 },
  ]

  return Array.from({ length: points }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (points - i))

    const dataPoint: DataPoint = {
      date: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
      }),
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
  const [timeRange, setTimeRange] = useState("1W")

  const series = [
    { id: "2.9x", color: theme.chart[1] },
    { id: "4.7x", color: theme.chart[3] },
    { id: "6.5x", color: theme.chart[9] },
    { id: "8.3x", color: theme.chart[2] },
  ]

  const data = useMemo(() => generateMockData(timeRange), [timeRange])

  return (
    <SChartContainer>
      <SChartHeader justify="space-between" align="center">
        <Text fs="p1" fw={600} color={theme.text.high}>
          Net APY
        </Text>

        <TimeRangeToggle
          value={timeRange}
          items={["1H", "1D", "1W", "1M", "All"]}
          onValueChange={setTimeRange}
        />
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
              strokeOpacity={0.1}
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
              cursor={{ stroke: theme.details.separators, strokeWidth: 1 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const sortedPayload = [...payload].sort(
                    (a, b) => (b.value as number) - (a.value as number),
                  )
                  return (
                    <STooltipContainer>
                      <Text fs={12} fw={600} mb={8} color={theme.text.high}>
                        {payload[0].payload.fullDate}
                      </Text>
                      <Stack gap={4}>
                        {sortedPayload.map((entry) => (
                          <Flex
                            key={entry.dataKey}
                            justify="space-between"
                            gap={20}
                          >
                            <Flex align="center" gap={6}>
                              <SColorDot color={entry.color} />
                              <Text fs={12} color={theme.text.medium} fw={500}>
                                {entry.dataKey}
                              </Text>
                            </Flex>
                            <Text fs={12} fw={600} color={theme.text.high}>
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
                activeDot={{ r: 4, strokeWidth: 0, fill: s.color }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </SChartWrapper>

      <SLegend gap={20} justify="flex-start">
        {series.map((s) => (
          <SLegendItem key={s.id} align="center" gap={6}>
            <SColorDot color={s.color} />
            <Text fs={14} fw={600} color={theme.text.high}>
              {s.id === "2.9x" ? "x1" : s.id}
            </Text>
          </SLegendItem>
        ))}
      </SLegend>
    </SChartContainer>
  )
}
