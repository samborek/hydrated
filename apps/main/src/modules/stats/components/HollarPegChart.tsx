import styled from "@emotion/styled"
import { Text, Flex, ValueStats, ValueStatsValue, Separator } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, Fragment, useMemo, useState } from "react"
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

import { ChartTooltipContent, chartTooltipProps } from "./StatsChartTooltip"
import { SelectDropdown } from "./SelectDropdown"
import { SChartHeader } from "./ChartLayout"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { AssetLogo } from "@/components/AssetLogo"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { useHollarPegPrices } from "@/modules/stats/hooks/useHollarPegPrices"

export { HOLLAR_ASSET_ID }

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

const SPegPricesRow = styled.div`
  display: flex;
  align-items: stretch;
  overflow-x: auto;

  @media (max-width: 576px) {
    gap: 0;
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

export const HollarPegChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("30D")
  const { data: pegPrices = [] } = useHollarPegPrices()

  const chartData = useMemo(() => generatePegData(), [])

  const filteredData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : timeRange === "90D" ? 90 : chartData.length
    return chartData.slice(-days)
  }, [chartData, timeRange])

  return (
    <SChartContainer>
      <Flex direction="column" gap={16} sx={{ mb: 20 }}>
        <Text fs={18} fw={600} font="primary" color="text.primary">Hollar Peg</Text>

        {/* Peg prices — separator style, no bordered cards */}
        <SPegPricesRow>
          {pegPrices.map((config, index) => (
            <Fragment key={config.id}>
              <Flex sx={{ pl: index === 0 ? 0 : 20, pr: 20, py: 4 }}>
                <ValueStats
                  font="primary"
                  wrap={true}
                  customLabel={
                    <Flex gap={8} align="center">
                      <AssetLogo id={[HOLLAR_ASSET_ID, config.assetId]} size="small" />
                      <Text fs={11} fw={500} color="text.medium" css={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {config.label}
                      </Text>
                    </Flex>
                  }
                  customValue={
                    <ValueStatsValue font="primary" style={{ color: config.color }}>
                      {config.priceStr}
                    </ValueStatsValue>
                  }
                />
              </Flex>
              {index < pegPrices.length - 1 && (
                <Separator
                  orientation="vertical"
                  sx={{ my: 4, flexShrink: 0 }}
                />
              )}
            </Fragment>
          ))}
        </SPegPricesRow>
      </Flex>

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
          <Tooltip {...chartTooltipProps}
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

          {pegPrices.map((config) => (
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
