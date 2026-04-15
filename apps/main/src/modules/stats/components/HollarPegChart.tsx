import styled from "@emotion/styled"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useMemo, useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine
} from "recharts"

import { ChartTooltipContent } from "./StatsChartTooltip"
import { SelectDropdown } from "./SelectDropdown"
import { SChartHeader } from "./ChartLayout"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { HOLLAR_ASSET_ID, USDT_ASSET_ID, SUSDE_ASSET_ID, SUSDS_ASSET_ID } from "@galacticcouncil/utils"

export { HOLLAR_ASSET_ID, USDT_ASSET_ID, SUSDE_ASSET_ID, SUSDS_ASSET_ID }

const SChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

// Mock Peg Historical Data (❗️ Needs Indexer)
const generatePegData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      aUSDT: 1.0 + (Math.random() - 0.5) * 0.005,
      aUSDC: 1.0 + (Math.random() - 0.5) * 0.003,
      sUSDe: 1.0 + (Math.random() - 0.5) * 0.008,
      sUSDS: 1.0 + (Math.random() - 0.5) * 0.006,
    })
  }

  return data
}

type TimeRange = "7D" | "30D" | "90D" | "MAX"

export const PEG_CONFIG = [
  { id: "aUSDT", label: "HOLLAR/aUSDT", assetId: USDT_ASSET_ID, color: "#26A17B", spot: "$1.0001" },
  { id: "aUSDC", label: "HOLLAR/aUSDC", assetId: "22",           color: "#2775CA", spot: "$1.0005" },
  { id: "sUSDe", label: "HOLLAR/sUSDe", assetId: SUSDE_ASSET_ID, color: "#8B5CF6", spot: "$0.9998" },
  { id: "sUSDS", label: "HOLLAR/sUSDS", assetId: SUSDS_ASSET_ID, color: "#F4B731", spot: "$1.0012" },
] as const

export const HollarPegChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")

  const chartData = useMemo(() => generatePegData(), [])

  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : timeRange === "90D" ? 90 : chartData.length
    return chartData.slice(-days)
  }, [chartData, timeRange])

  return (
    <SChartContainer>
      <SChartHeader $align="flex-start" style={{ marginBottom: 12 }}>
        <div />
        <SControlsGroup>
          <TimeRangeToggle
            value={timeRange}
            items={["7D", "30D", "90D", "MAX"]}
            onValueChange={(v: string) => setTimeRange(v as TimeRange)}
          />
        </SControlsGroup>
      </SChartHeader>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme.text.low, fontSize: 10 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
          />
          <YAxis
            domain={[0.985, 1.015]}
            tick={{ fill: theme.text.low, fontSize: 10 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
            tickFormatter={(value) => `$${value.toFixed(3)}`}
          />
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload as any}
                label={label}
                valueFormatter={(v) => `$${v.toFixed(4)}`}
              />
            )}
            cursor={{ stroke: theme.surfaces.containers.high.hover, strokeWidth: 1 }}
          />
          <ReferenceLine y={1.000} stroke={theme.text.medium} strokeDasharray="5 5" strokeOpacity={0.8} />

          {PEG_CONFIG.map((config) => (
            <Line
              key={config.id}
              type="monotone"
              dataKey={config.id}
              stroke={config.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              name={config.label}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <SChartFooter>
        <SelectDropdown
          value={timeRange}
          items={['7D', '30D', '90D', 'MAX'].map(range => ({ key: range, label: range }))}
          onValueChange={(val: string) => setTimeRange(val as TimeRange)}
        />
      </SChartFooter>
    </SChartContainer>
  )
}
