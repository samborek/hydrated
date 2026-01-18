import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
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
import { SelectDropdown } from "./SelectDropdown"
import { SChartHeader } from "./ChartLayout"

const SChartContainer = styled.div`
  width: 100%;
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

// Generate mock Hollar supply data
const generateHollarData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const supply = 5 + (90 - i) * 0.04 + Math.random() * 0.5

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      supply,
    })
  }

  return data
}

type TimeRange = "7D" | "30D" | "MAX"

type Props = {
  title?: string
  value?: string
}

export const HollarSupplyChart: FC<Props> = ({
  title = "Hollar Supply",
  value = "$8.5M",
}) => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")

  // Generate data once with useMemo to avoid regenerating on every render
  const chartData = useMemo(() => generateHollarData(), [])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 90
    return chartData.slice(-days)
  }, [chartData, timeRange])

  return (
    <SChartContainer>
      <SChartHeader $align="flex-start">
        <ValueStats
          label={title}
          customValue={
            <Text
              fs={28}
              fw={700}
              color="#8B5CF6"
              style={{ fontFamily: "Gazpacho, sans-serif", lineHeight: 1 }}
            >
              {value}
            </Text>
          }
          wrap={true}
          size="header"
          style={{ alignItems: "flex-start" }}
        />
        <SControlsGroup>
          <TimeRangeToggle
            value={timeRange}
            items={["7D", "30D", "MAX"]}
            onValueChange={(v: string) => setTimeRange(v as TimeRange)}
          />
        </SControlsGroup>
      </SChartHeader>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="hollarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
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
            tickFormatter={(value) => `$${value.toFixed(0)}M`}
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
            dataKey="supply"
            stroke="#8B5CF6"
            fill="url(#hollarGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <SChartFooter>
        <div style={{ flex: 1 }}>
          <SelectDropdown
            value={timeRange}
            items={['7D', '30D', 'MAX'].map(range => ({ key: range, label: range }))}
            onValueChange={(val: string) => setTimeRange(val as TimeRange)}
          />
        </div>
      </SChartFooter>
    </SChartContainer>
  )
}
