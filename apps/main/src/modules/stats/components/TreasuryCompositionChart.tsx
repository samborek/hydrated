import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC, useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartTooltipContent, chartTooltipProps } from "./StatsChartTooltip"

const ASSET_COLORS: Record<string, string> = {
  HDX: "#e53e76",
  DOT: "#e6007a",
  H2O: "#74c742",
  GETH: "#627eea",
  USDT: "#26a17b",
  USDC: "#2775ca",
  vDOT: "#c84ba1",
  WBTC: "#f7931a",
  "2-Pool": "#b3cf92",
  "3-Pool-MRL": "#6fc272",
  "2-Pool-PRIME": "#dfb1f3",
  HEURC: "#53a4f3",
  Other: "#4a5568",
}

// Mock weekly composition snapshots — replace with indexer data when available
const generateCompositionData = () => {
  const weeks = ["Jan W1", "Jan W3", "Feb W1", "Feb W3", "Mar W1", "Mar W3", "Apr W1"]
  return weeks.map((week, i) => {
    const growth = 1 + i * 0.04
    return {
      week,
      HDX: Math.round(6_200_000 * growth * (1 + (Math.random() - 0.5) * 0.1)),
      DOT: Math.round(999_000 * growth * (1 + (Math.random() - 0.5) * 0.1)),
      H2O: Math.round(1_116_000 * growth * (1 + (Math.random() - 0.5) * 0.05)),
      GETH: Math.round(897_000 * growth * (1 + (Math.random() - 0.5) * 0.15)),
      USDT: Math.round(526_000 * growth * (1 + (Math.random() - 0.5) * 0.05)),
      USDC: Math.round(380_000 * growth * (1 + (Math.random() - 0.5) * 0.05)),
      Other: Math.round(1_200_000 * growth * (1 + (Math.random() - 0.5) * 0.1)),
    }
  })
}

const STACKED_KEYS = ["HDX", "DOT", "H2O", "GETH", "USDT", "USDC", "Other"]

const SContainer = styled.div`
  width: 100%;
`

const SLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  margin-top: 16px;
`

const SLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const SDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

export const TreasuryCompositionChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const data = useMemo(() => generateCompositionData(), [])

  return (
    <SContainer>
      <Text fs={14} fw={500} color="text.medium" sx={{ mb: 16 }}>
        Asset Composition
      </Text>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          barCategoryGap="28%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: theme.text.low, fontSize: 10 }}
            axisLine={{ stroke: theme.details.separators }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: theme.text.low, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
            width={44}
          />
          <Tooltip
            {...chartTooltipProps}
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload as any}
                label={label}
                valueFormatter={(v) =>
                  `$${v >= 1_000_000 ? (v / 1_000_000).toFixed(2) + "M" : (v / 1_000).toFixed(0) + "K"}`
                }
              />
            )}
          />
          {STACKED_KEYS.map((key) => (
            <Bar key={key} dataKey={key} stackId="a" radius={key === STACKED_KEYS[STACKED_KEYS.length - 1] ? [3, 3, 0, 0] : [0, 0, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={ASSET_COLORS[key] ?? ASSET_COLORS.Other} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>

      <SLegend>
        {STACKED_KEYS.map((key) => (
          <SLegendItem key={key}>
            <SDot $color={ASSET_COLORS[key] ?? (ASSET_COLORS.Other as string)} />
            <Text fs={11} fw={500} color="text.low">
              {key}
            </Text>
          </SLegendItem>
        ))}
      </SLegend>
    </SContainer>
  )
}
