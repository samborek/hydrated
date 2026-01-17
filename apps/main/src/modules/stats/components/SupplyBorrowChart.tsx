import styled from "@emotion/styled"
import { Button, Flex, Text, ValueStats } from "@galacticcouncil/ui/components"
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

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.scales.paddings.m}px;
  margin-bottom: ${({ theme }) => theme.scales.paddings.l}px;
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

const SLegendRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
  flex-wrap: wrap;
`

const SLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SLegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
`

// Generate mock supply/borrow data
const generateSupplyBorrowData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const supply = 10 + (90 - i) * 0.03 + Math.random() * 1
    const borrow = 5 + (90 - i) * 0.02 + Math.random() * 0.8

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      supply,
      borrow,
    })
  }

  return data
}

type TimeRange = "7D" | "30D" | "MAX"

export const SupplyBorrowChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")


  // Generate data once with useMemo to avoid regenerating on every render
  const chartData = useMemo(() => generateSupplyBorrowData(), [])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 90
    return chartData.slice(-days)
  }, [chartData, timeRange])

  const currentData = filteredData[filteredData.length - 1]

  return (
    <SChartContainer>
      <SChartHeader>
        <Flex gap={Number(theme.scales.paddings.l)} align="flex-start" wrap>
          <ValueStats
            label="Total Supply"
            customValue={
              <Text
                fs={28}
                fw={700}
                color="#22C55E"
                style={{ fontFamily: "Gazpacho, sans-serif", lineHeight: 1 }}
              >
                ${currentData?.supply.toFixed(1)}M
              </Text>
            }
            wrap={true}
            size="header"
            style={{ alignItems: "flex-start" }}
          />
          <ValueStats
            label="Total Borrow"
            customValue={
              <Text
                fs={28}
                fw={700}
                color="#F59E0B"
                style={{ fontFamily: "Gazpacho, sans-serif", lineHeight: 1 }}
              >
                ${currentData?.borrow.toFixed(1)}M
              </Text>
            }
            wrap={true}
            size="header"
            style={{ alignItems: "flex-start" }}
          />
        </Flex>
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
            <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="borrowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
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
            dataKey="supply"
            stroke="#22C55E"
            fill="url(#supplyGrad)"
            strokeWidth={2}
            name="Supply"
          />
          <Area
            type="monotone"
            dataKey="borrow"
            stroke="#F59E0B"
            fill="url(#borrowGrad)"
            strokeWidth={2}
            name="Borrow"
          />
        </AreaChart>
      </ResponsiveContainer>

      <SLegendRow>
        <SLegendItem>
          <SLegendDot $color="#22C55E" />
          <Text fs={12} color={theme.text.low}>
            Supply
          </Text>
        </SLegendItem>
        <SLegendItem>
          <SLegendDot $color="#F59E0B" />
          <Text fs={12} color={theme.text.low}>
            Borrow
          </Text>
        </SLegendItem>
      </SLegendRow>

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
