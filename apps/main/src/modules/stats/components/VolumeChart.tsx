import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useMemo, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartTooltipContent, chartTooltipProps } from "./StatsChartTooltip"
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
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      volume: baseVolume,
    })
  }

  return data
}

type TimeRange = "7D" | "30D" | "MAX"

type Props = {
  title?: string
  value?: string
}

export const VolumeChart: FC<Props> = ({
  title = "24h Volume",
  value = "$10.3M",
}) => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")

  // Generate data once with useMemo to avoid regenerating on every render
  const volumeData = useMemo(() => generateVolumeData(), [])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 90
    return volumeData.slice(-days)
  }, [volumeData, timeRange])

  return (
    <SChartContainer>
      <SChartHeader>
        <ValueStats
          label={title}
          customValue={
            <Text
              fs={28}
              fw={700}
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

      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          data={filteredData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
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
            tickFormatter={(value) => `$${value}M`}
            width={45}
          />
          <Tooltip {...chartTooltipProps}
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

          <Bar
            dataKey="volume"
            fill={theme.text.tint.secondary}
            radius={[4, 4, 0, 0]}
            name="Volume"
          />
        </BarChart>
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
