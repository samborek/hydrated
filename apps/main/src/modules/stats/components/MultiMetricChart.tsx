import styled from "@emotion/styled"
import { Separator, ValueStats } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { FC, useMemo, useState } from "react"
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  DefaultZIndexes,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { getTvlColors } from "../utils/feeColors"
import { SChartHeader } from "./ChartLayout"
import { ChartTooltipContent, chartTooltipProps } from "./StatsChartTooltip"

const SChartContainer = styled.div`
  width: 100%;
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
`

const STogglesContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const SChipToggle = styled.button<{ $active: boolean; $color: string }>`
  background: ${({ $active, theme }) =>
    $active ? theme.surfaces.containers.high.hover : "transparent"};
  color: ${({ $active, $color, theme }) => ($active ? $color : theme.text.low)};
  border: 1px solid
    ${({ $active, $color, theme }) => ($active ? $color : theme.details.borders)};
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
  }
`

const SChartSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 16px;
  margin-bottom: 24px;
`

type TimeRange = "7D" | "1M" | "3M" | "1Y" | "ALL"
type MetricKey = "Revenue" | "TVL" | "Volume" | "Fees"

const generateMultiMetricData = () => {
  const data = []
  const now = new Date()

  for (let i = 365; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const baseTvl = 100 + i * 0.1 + Math.sin(i / 10) * 10
    const baseVolume = 10 + Math.random() * 5 + Math.sin(i / 7) * 2
    const baseRevenue = baseVolume * 0.05 + Math.random() * 0.1
    const baseFees = baseRevenue * 1.5

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: i > 180 ? "2-digit" : undefined,
      }),
      timestamp: date.getTime(),
      TVL: baseTvl,
      Volume: baseVolume,
      Revenue: baseRevenue,
      Fees: baseFees,
    })
  }

  return data
}

type Props = {
  className?: string
}

export const MultiMetricChart: FC<Props> = ({ className }) => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")
  const [selectedMetrics, setSelectedMetrics] = useState<Set<MetricKey>>(
    new Set(["Revenue"]),
  )

  const COLORS = getTvlColors(theme)

  const metricsConfig: Record<MetricKey, { color: string; label: string }> = {
    Revenue: { color: COLORS.omnipool, label: "Protocol Revenue" },
    Fees:    { color: theme.secondaryColors.pink.coralPink, label: "Total Fees" },
    TVL:     { color: COLORS.stablePools, label: "TVL" },
    Volume:  { color: COLORS.xykPools, label: "Volume" },
  }

  const toggleMetric = (metric: MetricKey) => {
    const newSet = new Set(selectedMetrics)
    if (newSet.has(metric)) {
      newSet.delete(metric)
    } else {
      newSet.add(metric)
    }
    setSelectedMetrics(newSet)
  }

  const chartData = useMemo(() => generateMultiMetricData(), [])

  const filteredData = useMemo(() => {
    const days =
      timeRange === "7D" ? 7 : timeRange === "1M" ? 30 : timeRange === "3M" ? 90 : timeRange === "1Y" ? 365 : chartData.length
    return chartData.slice(-days)
  }, [chartData, timeRange])

  const aggregates = useMemo(() => {
    if (filteredData.length === 0) return { Revenue: 0, TVL: 0, Volume: 0, Fees: 0 }
    return {
      Revenue: filteredData.reduce((acc, curr) => acc + curr.Revenue, 0),
      TVL: filteredData[filteredData.length - 1]!.TVL,
      Volume: filteredData.reduce((acc, curr) => acc + curr.Volume, 0),
      Fees: filteredData.reduce((acc, curr) => acc + curr.Fees, 0),
    }
  }, [filteredData])

  const activeMetrics = Array.from(selectedMetrics)

  return (
    <SChartContainer className={className}>
      <SChartHeader $enableMobile={false} style={{ marginBottom: "16px" }}>
        <STogglesContainer>
          {(Object.keys(metricsConfig) as MetricKey[]).map((metric) => {
            const isActive = selectedMetrics.has(metric)
            return (
              <SChipToggle
                key={metric}
                $active={isActive}
                $color={metricsConfig[metric].color}
                onClick={() => toggleMetric(metric)}
              >
                {metricsConfig[metric].label}
              </SChipToggle>
            )
          })}
        </STogglesContainer>
        <SControlsGroup>
          <TimeRangeToggle
            value={timeRange}
            items={["7D", "1M", "3M", "1Y", "ALL"]}
            onValueChange={(v: string) => setTimeRange(v as TimeRange)}
          />
        </SControlsGroup>
      </SChartHeader>

      <SChartSummary>
        {activeMetrics.map((metric, i) => (
          <>
            {i > 0 && (
              <Separator
                key={`sep-${metric}`}
                orientation="vertical"
                sx={{ my: getTokenPx("containers.paddings.quart"), flexShrink: 0 }}
              />
            )}
            <ValueStats
              key={metric}
              label={metricsConfig[metric].label}
              size="small"
              wrap
              value={`$${aggregates[metric].toFixed(2)}M`}
            />
          </>
        ))}
      </SChartSummary>

      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            {activeMetrics.filter((m) => m !== "Revenue").map((metric) => (
              <linearGradient key={metric} id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={metricsConfig[metric].color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={metricsConfig[metric].color} stopOpacity={0.0} />
              </linearGradient>
            ))}
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme.text.medium, fontSize: 11 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
            minTickGap={20}
          />
          <YAxis
            yAxisId="bar"
            tick={{ fill: metricsConfig.Revenue.color, fontSize: 11 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
            tickFormatter={(v) => `$${v.toFixed(1)}M`}
            width={55}
          />
          {activeMetrics.some((m) => m !== "Revenue") && (
            <YAxis
              yAxisId="area"
              orientation="right"
              tick={{ fill: theme.text.medium, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
              tickFormatter={(v) => `$${v}M`}
              width={55}
            />
          )}

          <Tooltip
            {...chartTooltipProps}
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

          {selectedMetrics.has("Revenue") && (
            <Bar
              yAxisId="bar"
              dataKey="Revenue"
              name={metricsConfig.Revenue.label}
              fill={metricsConfig.Revenue.color}
              fillOpacity={0.85}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              zIndex={50}
            />
          )}

          {activeMetrics.filter((m) => m !== "Revenue").map((metric) => (
            <Area
              key={metric}
              yAxisId="area"
              type="monotone"
              dataKey={metric}
              name={metricsConfig[metric].label}
              stroke={metricsConfig[metric].color}
              fill={`url(#grad-${metric})`}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              zIndex={DefaultZIndexes.line}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </SChartContainer>
  )
}
