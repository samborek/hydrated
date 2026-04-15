import styled from "@emotion/styled"
import { Text, Flex } from "@galacticcouncil/ui/components"
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
  PieChart,
  Pie,
  Cell
} from "recharts"

import { ChartTooltipContent, chartCursorStyle } from "./StatsChartTooltip"
import { SelectDropdown } from "./SelectDropdown"
import { SChartHeader } from "./ChartLayout"
import { formatUSD } from "@/api/stats"

const SContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 2fr;
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

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

const SDonutInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const SDonutWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

const SLegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
`

// Generate mock Hollar stacked area data (❗️ Needs Indexer)
const generateHollarStackedData = () => {
  const data = []
  const now = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const mmSupply = 4 + (90 - i) * 0.02 + Math.random() * 0.2
    const hsmSupply = 2 + (90 - i) * 0.01 + Math.random() * 0.1

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      mmSupply,
      hsmSupply,
    })
  }

  return data
}

type TimeRange = "7D" | "30D" | "90D" | "MAX"

type Props = {
  totalBorrowedValue: number
  totalHsmValue: number
  isLoading?: boolean
}

export const HollarSupplyBreakdown: FC<Props> = ({
  totalBorrowedValue,
  totalHsmValue,
  isLoading = false,
}) => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")

  const totalSupply = totalBorrowedValue + totalHsmValue
  
  // During loading, show equal placeholder slices so the donut isn't empty
  const donutData = isLoading
    ? [
        { name: "Borrowed (MM)", value: 1 },
        { name: "HSM", value: 1 },
      ]
    : [
        { name: "Borrowed (MM)", value: totalBorrowedValue },
        { name: "HSM", value: totalHsmValue },
      ].filter(d => d.value > 0)

  // Provide fallback coloring
  const mmColor = theme.colors.lavender?.["700"] || "#8B5CF6"
  const hsmColor = "#EC4899"
  const COLORS = [mmColor, hsmColor]

  const chartData = useMemo(() => generateHollarStackedData(), [])

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : timeRange === "90D" ? 90 : chartData.length
    return chartData.slice(-days)
  }, [chartData, timeRange])

  return (
    <SContainer>
      {/* 1/3 Donut Chart */}
      <SChartContainer>
         <Text fs={18} fw={600} font="primary" color="text.primary">
            Supply Breakdown
         </Text>

         <SDonutWrapper>
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={donutData}
                 cx="50%"
                 cy="50%"
                 innerRadius={80}
                 outerRadius={105}
                 stroke="none"
                 paddingAngle={4}
                 cornerRadius={6}
                 dataKey="value"
               >
                 {donutData.map((_entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip
                 content={({ active, payload }) => (
                   <ChartTooltipContent
                     active={active}
                     payload={payload?.map(p => ({ ...p, dataKey: p.name, value: p.value as number, color: p.payload?.fill || (p as any).color })) as any}
                     label=""
                     valueFormatter={(v) => formatUSD(v)}
                   />
                 )}
                 cursor={chartCursorStyle}
               />
             </PieChart>
           </ResponsiveContainer>
           <SDonutInner>
              <Text fs={12} color="text.medium" style={{ textTransform: "uppercase" }}>Total Supply</Text>
              <Text fs={24} fw={700} color="text.primary" style={{ fontFamily: "Gazpacho, sans-serif" }}>
                 {formatUSD(totalSupply)}
              </Text>
           </SDonutInner>
         </SDonutWrapper>
         
         <Flex direction="column" gap={12} sx={{ mt: 24, px: 10 }}>
            {donutData.map((item, index) => {
               const percentage = totalSupply > 0 ? ((item.value / totalSupply) * 100).toFixed(1) : "0"
               return (
                 <Flex justify="space-between" align="center" key={item.name}>
                    <Flex align="center" gap={8}>
                       <SLegendDot $color={COLORS[index % COLORS.length]!} />
                       <Text fs={14} color="text.medium">{item.name}</Text>
                    </Flex>
                    <Flex align="center" gap={12}>
                       <Text fs={14} color="text.primary">{formatUSD(item.value)}</Text>
                       <Text fs={12} color="text.medium" style={{ opacity: 0.7, width: 40, textAlign: "right" }}>{percentage}%</Text>
                    </Flex>
                 </Flex>
               )
            })}
         </Flex>
      </SChartContainer>

      {/* 2/3 Stacked Area Chart */}
      <SChartContainer>
          <SChartHeader $align="flex-start" style={{ marginBottom: 12 }}>
            <Flex direction="column">
               <Text fs={18} fw={600} font="primary" color="text.primary">
                  Supply Over Time
               </Text>
            </Flex>
            <SControlsGroup>
              <TimeRangeToggle
                value={timeRange}
                items={["7D", "30D", "MAX"]}
                onValueChange={(v: string) => setTimeRange(v as TimeRange)}
              />
            </SControlsGroup>
          </SChartHeader>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="mmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={mmColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={mmColor} stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="hsmGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={hsmColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={hsmColor} stopOpacity={0.2} />
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
                dataKey="mmSupply"
                stackId="1"
                stroke={mmColor}
                fill="url(#mmGrad)"
                strokeWidth={2}
                name="Borrowed"
              />
              <Area
                type="monotone"
                dataKey="hsmSupply"
                stackId="1"
                stroke={hsmColor}
                fill="url(#hsmGrad)"
                strokeWidth={2}
                name="HSM"
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
    </SContainer>
  )
}
