import styled from "@emotion/styled"
import { Button, Text } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
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

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 16px;
  }
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;

  @media (max-width: 576px) {
    display: none;
  }
`

const SChartFooter = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }
`

// Generate mock treasury value data
const generateTreasuryData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Simulate treasury growth
    const baseValue = 2.5 + (90 - i) * 0.005 + Math.random() * 0.2

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: baseValue,
    })
  }

  return data
}

type TimeRange = "7D" | "30D" | "MAX"

type Props = {
  title?: string
  value?: string
}

export const TreasuryChart: FC<Props> = ({
  title = "Treasury Value",
  value = "$2.85M",
}) => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")

  // Generate data once with useMemo to avoid regenerating on every render
  const treasuryData = useMemo(() => generateTreasuryData(), [])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 90
    return treasuryData.slice(-days)
  }, [treasuryData, timeRange])

  return (
    <SChartContainer>
      <SChartHeader>
        <div>
          <Text fs={14} color={theme.text.medium}>
            {title}
          </Text>
          <Text
            fs={28}
            fw={700}
            color={theme.text.tint.secondary}
            style={{ fontFamily: "Gazpacho, sans-serif" }}
          >
            {value}
          </Text>
        </div>
        <SControlsGroup>
          <TimeRangeToggle
            value={timeRange}
            items={["7D", "30D", "MAX"]}
            onValueChange={(v) => setTimeRange(v as TimeRange)}
          />
        </SControlsGroup>
      </SChartHeader>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="treasuryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.text.tint.secondary}
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor={theme.text.tint.secondary}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.details.separators}
          />
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
            tickFormatter={(value) => `$${value.toFixed(1)}M`}
            width={45}
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
            dataKey="value"
            stroke={theme.text.tint.secondary}
            fill="url(#treasuryGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <SChartFooter>
        {(["7D", "30D", "MAX"] as TimeRange[]).map((range) => (
          <Button
            key={range}
            size="medium"
            variant={timeRange === range ? "secondary" : "tertiary"}
            outline={timeRange !== range}
            onClick={() => setTimeRange(range)}
            sx={{ flex: 1 }}
          >
            {range}
          </Button>
        ))}
      </SChartFooter>
    </SChartContainer>
  )
}
