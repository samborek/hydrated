import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useMemo, useState } from "react"
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { getTvlColors } from "../utils/feeColors"
import { SChartHeader } from "./ChartLayout"
import { ChartTooltipContent, chartCursorStyle } from "./StatsChartTooltip"

const SChartContainer = styled.div`
  width: 100%;
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;

  @media ${({ theme }) => (theme as any).mediaDevice?.desktop || "(min-width: 576px)"} {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`

const STogglesContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const SChipToggle = styled.button<{ $active: boolean; $locked?: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.surfaces.containers.high.hover : theme.surfaces.containers.high.primary};
  color: ${({ theme }) => theme.text.high};
  border: 1px solid ${({ theme }) => theme.details.borders};
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: ${({ $locked }) => ($locked ? "default" : "pointer")};
  display: flex;
  align-items: center;
  gap: 4px;

  opacity: ${({ $locked }) => ($locked ? 0.8 : 1)};

  &:hover {
    background: ${({ $active, $locked, theme }) =>
      $locked 
        ? ($active ? theme.surfaces.containers.high.hover : theme.surfaces.containers.high.primary) 
        : ($active ? theme.surfaces.containers.high.primary : theme.surfaces.containers.high.hover)};
  }
`

const SChartSummary = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 24px;
`

type TimeRange = "7D" | "1M" | "1Y" | "ALL"
type MetricKey = "Revenue" | "TVL" | "Volume" | "Fees"

// Mock Data Generator
const generateMultiMetricData = () => {
  const data = []
  const now = new Date()

  for (let i = 365; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const baseTvl = 100 + i * 0.1 + Math.sin(i / 10) * 10
    const baseVolume = 10 + Math.random() * 5 + Math.sin(i / 7) * 2
    const baseRevenue = baseVolume * 0.05 + Math.random() * 0.1
    const baseFees = baseRevenue * 1.5 // Fees usually higher than protocol revenue

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

  const toggleMetric = (metric: MetricKey) => {
    if (metric === "Revenue") return // locked

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
      timeRange === "7D" ? 7 : timeRange === "1M" ? 30 : timeRange === "1Y" ? 365 : chartData.length
    return chartData.slice(-days)
  }, [chartData, timeRange])

  const COLORS = getTvlColors(theme)

  // Calculate selected period aggregates
  const aggregates = useMemo(() => {
    if (filteredData.length === 0) return { Revenue: 0, TVL: 0, Volume: 0, Fees: 0, diffs: {} };
    
    // In a real app we would compute the prior period exactly to compare
    const totalRev = filteredData.reduce((acc, curr) => acc + curr.Revenue, 0)
    const currentTvl = filteredData[filteredData.length - 1]!.TVL
    
    return {
      Revenue: totalRev,
      TVL: currentTvl, // TVL is a snapshot usually
      Volume: filteredData.reduce((acc, curr) => acc + curr.Volume, 0),
      Fees: filteredData.reduce((acc, curr) => acc + curr.Fees, 0),
      diffs: {
        Revenue: "+12.5%", // Mock diffs
        TVL: "+4.2%",
        Volume: "-3.1%",
        Fees: "+11.0%"
      }
    }
  }, [filteredData])

  const metricsConfig: Record<MetricKey, { color: string; type: "bar" | "line"; label: string }> = {
    Revenue: { color: COLORS.omnipool, type: "bar", label: "Protocol Revenue" },
    Fees: { color: theme.secondaryColors.pink.coralPink, type: "bar", label: "Total Fees" },
    TVL: { color: COLORS.stablePools, type: "line", label: "TVL" },
    Volume: { color: COLORS.xykPools, type: "line", label: "Volume" },
  }

  return (
    <SChartContainer className={className}>
      <SChartHeader $enableMobile={false} style={{ marginBottom: "16px" }}>
        <STogglesContainer>
          {(Object.keys(metricsConfig) as MetricKey[]).map((metric) => {
            const isActive = selectedMetrics.has(metric)
            const isLocked = metric === "Revenue"
            return (
              <SChipToggle
                key={metric}
                $active={isActive}
                $locked={isLocked}
                onClick={() => toggleMetric(metric)}
              >
                {isActive ? "−" : "+"} {metricsConfig[metric].label}
              </SChipToggle>
            )
          })}
        </STogglesContainer>
        <SControlsGroup>
          <TimeRangeToggle
            value={timeRange}
            items={["7D", "1M", "1Y", "ALL"]}
            onValueChange={(v: string) => setTimeRange(v as TimeRange)}
          />
        </SControlsGroup>
      </SChartHeader>

      <SChartSummary>
        {Array.from(selectedMetrics).map((metric) => (
          <div key={`summary-${metric}`}>
            <Text fs={12} color="text.medium" style={{ marginBottom: 4 }}>
              {metricsConfig[metric].label}
            </Text>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <Text fs={20} fw={600}>
                ${aggregates[metric].toFixed(2)}M
              </Text>
              <Text fs={12} style={{ color: aggregates.diffs[metric as keyof typeof aggregates.diffs]!.startsWith("+") ? theme.secondaryColors.greens?.brightGreen || "#00FF00" : theme.secondaryColors.pink?.coralRed || "#FF0000" }}>
                {aggregates.diffs[metric as keyof typeof aggregates.diffs]}
              </Text>
            </div>
          </div>
        ))}
      </SChartSummary>

      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
          <XAxis
            dataKey="date"
            tick={{ fill: theme.text.medium, fontSize: 11 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
            minTickGap={20}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: metricsConfig[Array.from(selectedMetrics).find(m => metricsConfig[m].type === "bar") ?? "Revenue"].color, fontSize: 11 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
            tickFormatter={(value) => `$${value}M`}
            width={55}
          />
          {Array.from(selectedMetrics).some(m => metricsConfig[m].type === "line") && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: metricsConfig[Array.from(selectedMetrics).find(m => metricsConfig[m].type === "line")!].color, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
              tickFormatter={(value) => `$${value}M`}
              width={55}
            />
          )}
          
          <Tooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload as any}
                label={label}
                valueFormatter={(v) => `$${v.toFixed(2)}M`}
              />
            )}
            cursor={chartCursorStyle}
          />

          {Array.from(selectedMetrics).map((metric) => {
            const config = metricsConfig[metric]
            if (config.type === "bar") {
              return (
                <Bar
                  key={metric}
                  yAxisId="left"
                  dataKey={metric}
                  fill={config.color}
                  name={config.label}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              )
            }
            return (
              <Line
                key={metric}
                yAxisId="right"
                type="monotone"
                dataKey={metric}
                stroke={config.color}
                name={config.label}
                strokeWidth={2}
                dot={false}
              />
            )
          })}

        </ComposedChart>
      </ResponsiveContainer>
    </SChartContainer>
  )
}
