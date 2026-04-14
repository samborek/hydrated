import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { useBreakpoints, useTheme } from "@galacticcouncil/ui/theme"
import ReactECharts from "echarts-for-react"
import { FC, useMemo, useState } from "react"

import { getFeeColors } from "@/modules/stats/utils/feeColors"
import {
  generateFeesData,
  type TimeRange,
} from "@/modules/stats/utils/feesData"

import { SChartHeader } from "./ChartLayout"
import { SelectDropdown } from "./SelectDropdown"

const SChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SChartWrapper = styled.div`
  flex: 1;
  min-height: 500px;
  width: 100%;
  height: 100%;
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    display: none;
  }
`

const SDesktopOnly = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`

const SChartFooter = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.scales.paddings.s}px;
    margin-top: ${({ theme }) => theme.scales.paddings.m}px;
  }
`

const SFooterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.scales.paddings.s}px;
  align-items: center;
`

const SFlexGrow = styled.div`
  flex: 1;
  min-width: 0;
`

const formatCompactUsd = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

const formatUsd = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value)
}

const NODE_NAMES = {
  trades: "Trades",
  supplyBorrow: "Supply & Borrow",
  hollar: "HOLLAR",
  protocol: "Protocol",
  borrowApr: "Borrow APR",
  liquidations: "Liquidations",
  hollarBorrowApr: "Hollar Borrow APR",
  hsmRevenue: "HSM revenue",
  hdx: "HDX",
  staking: "Staking",
  referrals: "Referrals",
  traders: "Traders",
  lps: "Liquidity providers",
  treasury: "Treasury",
} as const

const getFeeFlowColors = (colors: ReturnType<typeof getFeeColors>) => ({
  [NODE_NAMES.trades]: colors.tradingFees,
  [NODE_NAMES.supplyBorrow]: colors.supplyBorrowFees,
  [NODE_NAMES.hollar]: colors.hollarFees,
  [NODE_NAMES.protocol]: colors.protocol,
  [NODE_NAMES.borrowApr]: colors.supplyBorrowFees,
  [NODE_NAMES.liquidations]: colors.liquidationPenalty,
  [NODE_NAMES.hollarBorrowApr]: colors.hollar,
  [NODE_NAMES.hsmRevenue]: colors.treasury,
  [NODE_NAMES.hdx]: colors.stakers,
  [NODE_NAMES.staking]: colors.stakers,
  [NODE_NAMES.referrals]: colors.lps,
  [NODE_NAMES.traders]: colors.users,
  [NODE_NAMES.lps]: colors.lps,
  [NODE_NAMES.treasury]: colors.treasury,
})

const splitLabel = (label: string, isMobile: boolean) => {
  if (label.includes("/") && isMobile) {
    const [left, right] = label.split("/")
    return [left, right]
  }

  if (!isMobile) return [label]

  if (label.includes(" & ")) {
    const [left, right] = label.split(" & ")
    return [left, `& ${right}`]
  }

  const words = label.split(" ").filter(Boolean)
  if (words.length <= 1) return [label]

  return [words.slice(0, -1).join(" "), words[words.length - 1]]
}

type Props = {
  title?: string
}

export const ProtocolRevenueFlowChart: FC<Props> = ({
  title = "Revenue Flow",
}) => {
  const { themeProps: theme } = useTheme()
  const { isMobile } = useBreakpoints()
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")

  const feeColors = getFeeColors(theme)
  const flowColors = getFeeFlowColors(feeColors)
  const labelColor = theme.text.high

  const totals = useMemo(() => {
    const data = generateFeesData(timeRange)
    if (!data || data.length === 0) return null

    return data.reduce(
      (acc, curr) => ({
        tradingFees: acc.tradingFees + curr.tradingFees,
        liquidityFees: acc.liquidityFees + curr.liquidityFees,
        networkFees: acc.networkFees + curr.networkFees,
        supplyBorrowFees: acc.supplyBorrowFees + curr.supplyBorrowFees,
        hollarFees: acc.hollarFees + curr.hollarFees,
      }),
      {
        tradingFees: 0,
        liquidityFees: 0,
        networkFees: 0,
        supplyBorrowFees: 0,
        hollarFees: 0,
      },
    )
  }, [timeRange])

  const totalFlow = useMemo(() => {
    if (!totals) return 0
    return (
      totals.tradingFees +
      totals.liquidityFees +
      totals.networkFees +
      totals.supplyBorrowFees +
      totals.hollarFees
    )
  }, [totals])

  const echartsOption = useMemo(() => {
    if (!totals) {
      return {}
    }

    const tradesTotal =
      totals.tradingFees + totals.liquidityFees + totals.networkFees
    const mmTotal = totals.supplyBorrowFees
    const hollarTotal = totals.hollarFees

    const rawNodes = [
      { name: NODE_NAMES.trades, value: tradesTotal, depth: 0 },
      { name: NODE_NAMES.supplyBorrow, value: mmTotal, depth: 0 },
      { name: NODE_NAMES.hollar, value: hollarTotal, depth: 0 },

      { name: NODE_NAMES.protocol, value: tradesTotal * 0.5, depth: 1 },
      { name: NODE_NAMES.borrowApr, value: mmTotal * 0.8, depth: 1 },
      { name: NODE_NAMES.liquidations, value: mmTotal * 0.2, depth: 1 },
      { name: NODE_NAMES.hollarBorrowApr, value: hollarTotal * 0.7, depth: 1 },
      { name: NODE_NAMES.hsmRevenue, value: hollarTotal * 0.3, depth: 1 },

      { name: NODE_NAMES.hdx, depth: 2, value: tradesTotal * 0.125 },
      { name: NODE_NAMES.staking, depth: 2, value: tradesTotal * 0.125 },
      { name: NODE_NAMES.referrals, depth: 2, value: tradesTotal * 0.125 },
      { name: NODE_NAMES.traders, depth: 2, value: tradesTotal * 0.125 },
      {
        name: NODE_NAMES.lps,
        depth: 2,
        value: tradesTotal * 0.5 + mmTotal * 0.4,
      },
      {
        name: NODE_NAMES.treasury,
        depth: 2,
        value: mmTotal * 0.6 + hollarTotal,
      },
    ]

    const nodes = rawNodes.map((node) => {
      const isSource = node.depth === 0
      const isTarget = node.depth === 2
      const isOuter = isSource || isTarget

      return {
        name: node.name,
        depth: node.depth,
        itemStyle: {
          color: flowColors[node.name],
          borderColor: flowColors[node.name],
        },
        label: {
          position: isSource ? "left" : isTarget ? "right" : "top",
          distance: isMobile ? 6 : 8,
          align: isSource ? "right" : isTarget ? "left" : "center",
          formatter: function (params: any) {
            const lines = splitLabel(params.name, isMobile)
            if (isOuter) {
              return (
                lines.join("\n") +
                "\n{value|" +
                formatCompactUsd(node.value ?? 0) +
                "}"
              )
            }
            return lines.join("\n")
          },
          rich: {
            value: {
              fontSize: 13,
              fontWeight: 700,
              color: labelColor,
              lineHeight: 20,
            },
          },
        },
      }
    })

    const buildLink = (
      source: string,
      target: string,
      value: number,
      hideEdgeLabel = false,
    ) => ({
      source,
      target,
      value,
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
        opacity: 0.85,
      },
      label: hideEdgeLabel
        ? { show: false }
        : {
            show: true,
            formatter: (params: any) => formatCompactUsd(params.value),
            color: labelColor,
            fontSize: 11,
            fontWeight: 600,
            opacity: 0.85,
          },
    })

    const links = [
      buildLink(NODE_NAMES.trades, NODE_NAMES.protocol, tradesTotal * 0.5),
      buildLink(NODE_NAMES.trades, NODE_NAMES.lps, tradesTotal * 0.5),

      buildLink(NODE_NAMES.protocol, NODE_NAMES.hdx, tradesTotal * 0.125, true),
      buildLink(
        NODE_NAMES.protocol,
        NODE_NAMES.staking,
        tradesTotal * 0.125,
        true,
      ),
      buildLink(
        NODE_NAMES.protocol,
        NODE_NAMES.referrals,
        tradesTotal * 0.125,
        true,
      ),
      buildLink(
        NODE_NAMES.protocol,
        NODE_NAMES.traders,
        tradesTotal * 0.125,
        true,
      ),

      buildLink(
        NODE_NAMES.supplyBorrow,
        NODE_NAMES.borrowApr,
        mmTotal * 0.8,
        true,
      ),
      buildLink(
        NODE_NAMES.supplyBorrow,
        NODE_NAMES.liquidations,
        mmTotal * 0.2,
        true,
      ),

      buildLink(NODE_NAMES.borrowApr, NODE_NAMES.lps, mmTotal * 0.4, true),
      buildLink(NODE_NAMES.borrowApr, NODE_NAMES.treasury, mmTotal * 0.4, true),
      buildLink(NODE_NAMES.liquidations, NODE_NAMES.treasury, mmTotal * 0.2, true),

      buildLink(
        NODE_NAMES.hollar,
        NODE_NAMES.hollarBorrowApr,
        hollarTotal * 0.7,
        true,
      ),
      buildLink(NODE_NAMES.hollar, NODE_NAMES.hsmRevenue, hollarTotal * 0.3, true),

      buildLink(
        NODE_NAMES.hollarBorrowApr,
        NODE_NAMES.treasury,
        hollarTotal * 0.7,
        true,
      ),
      buildLink(NODE_NAMES.hsmRevenue, NODE_NAMES.treasury, hollarTotal * 0.3, true),
    ]

    return {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: theme.details.tooltips,
        borderColor: "rgba(124, 127, 138, 0.2)",
        borderWidth: 1,
        textStyle: {
          color: theme.text.high,
          fontSize: 12,
          fontWeight: 500,
        },
        padding: [12, 16],
        borderRadius: theme.radii?.lg ?? 8,
        extraCssText: "box-shadow: 0px 8px 30px 0px rgba(41, 41, 60, 0.41);",
        formatter: function (params: any) {
          if (params.dataType === "edge") {
            return `${params.data.source}  →  ${params.data.target}<br/><span style="color:${theme.text.high}; font-weight: 600">${formatUsd(params.value)}</span>`
          }
          return `${params.name}<br/><span style="color:${theme.text.high}; font-weight: 600">${formatUsd(params.value)}</span>`
        },
      },
      series: {
        type: "sankey",
        emphasis: {
          focus: "trajectory",
          lineStyle: {
            opacity: 1,
          },
        },
        nodeAlign: "justify",
        data: nodes,
        links: links,
        itemStyle: {
          borderWidth: 0,
          borderRadius: 4,
        },
        lineStyle: {
          color: "source",
          curveness: 0.5,
        },
        label: {
          color: labelColor,
          fontSize: 11,
          fontWeight: 500,
        },
        nodeWidth: 14,
        nodeGap: 24,
        left: isMobile ? 88 : 100,
        right: 72,
        top: 8,
        bottom: 8,
      },
    }
  }, [totals, isMobile, theme, flowColors, labelColor])

  return (
    <SChartContainer>
      <SChartHeader
        $align="flex-start"
        $marginBottom="m"
        $wrap={false}
        $enableMobile={false}
      >
        <ValueStats
          label={title}
          customValue={
            <Text
              fs={24}
              fw={700}
              style={{ fontFamily: "Gazpacho, sans-serif", lineHeight: 1 }}
            >
              {formatCompactUsd(totalFlow)}
            </Text>
          }
          bottomLabel={`Latest snapshot (${timeRange})`}
          wrap={true}
          size="header"
          style={{ alignItems: "flex-start" }}
        />
        <SControlsGroup>
          <SDesktopOnly>
            <TimeRangeToggle
              value={timeRange}
              items={["1M", "3M", "1Y", "ALL"]}
              onValueChange={(v: string) => setTimeRange(v as TimeRange)}
            />
          </SDesktopOnly>
        </SControlsGroup>
      </SChartHeader>

      <SChartWrapper>
        <div style={{ width: "100%", height: 500 }}>
          {totals && (
            <ReactECharts
              option={echartsOption}
              style={{ height: "100%", width: "100%" }}
              notMerge={true}
            />
          )}
        </div>
      </SChartWrapper>

      <SChartFooter>
        <SFooterRow>
          <SFlexGrow>
            <SelectDropdown
              value={timeRange}
              items={["1M", "3M", "1Y", "ALL"].map((range) => ({
                key: range,
                label: range,
              }))}
              onValueChange={(val: string) => setTimeRange(val as TimeRange)}
            />
          </SFlexGrow>
        </SFooterRow>
      </SChartFooter>
    </SChartContainer>
  )
}
