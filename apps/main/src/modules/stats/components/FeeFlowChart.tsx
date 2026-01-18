import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { useBreakpoints, useTheme } from "@galacticcouncil/ui/theme"
import { type CSSProperties, FC } from "react"
import {
  Layer,
  Rectangle,
  ResponsiveContainer,
  Sankey,
  Tooltip,
} from "recharts"

import { getFeeColors } from "@/modules/stats/utils/feeColors"

import { SChartHeader } from "./ChartLayout"

const SChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SChartWrapper = styled.div`
  flex: 1;
  min-height: 420px;
`

const getFeeFlowColors = (colors: ReturnType<typeof getFeeColors>) => ({
  // Sources (left side)
  "Network Fees": colors.networkFees,
  "Omnipool Asset Fee": colors.omnipoolAssetFee,
  "Omnipool Protocol Fee": colors.omnipoolProtocolFee,
  "Withdrawal Fee": colors.omnipoolWithdrawFee,
  "XYK Trade Fee": colors.xykTradeFee,
  "HSM Revenue": colors.hollarFees,
  // Destinations (right side)
  Treasury: colors.treasury,
  LPs: colors.lps,
  "Referrers & Stakers": colors.referrersAndStakers,
  Burned: colors.burned,
  Protocol: colors.protocol,
})

// Fee flow data based on the documentation
// Nodes: 0-5 are sources, 6-10 are destinations
const SANKEY_DATA = {
  nodes: [
    // Sources (index 0-5)
    { name: "Network Fees" }, // 0
    { name: "Omnipool Asset Fee" }, // 1
    { name: "Omnipool Protocol Fee" }, // 2
    { name: "Withdrawal Fee" }, // 3
    { name: "XYK Trade Fee" }, // 4
    { name: "HSM Revenue" }, // 5
    // Destinations (index 6-10)
    { name: "Treasury" }, // 6
    { name: "LPs" }, // 7
    { name: "Referrers & Stakers" }, // 8
    { name: "Burned" }, // 9
    { name: "Protocol" }, // 10
  ],
  links: [
    // Network Fees → Treasury
    { source: 0, target: 6, value: 100 },

    // Omnipool Asset Fee → 50% LPs, 50% Referrers
    { source: 1, target: 7, value: 50 },
    { source: 1, target: 8, value: 50 },

    // Omnipool Protocol Fee → 50% Burned, 50% Treasury
    { source: 2, target: 9, value: 50 },
    { source: 2, target: 6, value: 50 },

    // Withdrawal Fee → LPs
    { source: 3, target: 7, value: 100 },

    // XYK Trade Fee → LPs
    { source: 4, target: 7, value: 100 },

    // HSM Revenue → Protocol
    { source: 5, target: 10, value: 100 },
  ],
}

// Custom node component
const splitLabel = (label: string, isMobile: boolean) => {
  if (label.startsWith("Omnipool ")) {
    return ["Omnipool", label.replace("Omnipool ", "")]
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

type SankeyNodeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  index?: number
  payload?: { name: string }
  colorsMap: Record<string, string>
  labelColor: string
  fallbackColor: string
  isMobile: boolean
}

const CustomNode = ({
  x,
  y,
  width,
  height,
  index,
  payload,
  colorsMap,
  labelColor,
  fallbackColor,
  isMobile,
}: SankeyNodeProps) => {
  const safeIndex = index ?? 0
  const safePayload = payload ?? { name: "" }
  const isSource = safeIndex < 6
  const color = colorsMap[safePayload.name] || fallbackColor
  const lines = splitLabel(safePayload.name, isMobile)
  const lineOffset = lines.length > 1 ? -7 : 0
  const labelOffset = isMobile ? 6 : 8

  return (
    <Layer key={`node-${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.9}
        rx={4}
        ry={4}
      />
      <text
        x={
          isSource
            ? (x ?? 0) - labelOffset
            : (x ?? 0) + (width ?? 0) + labelOffset
        }
        y={(y ?? 0) + (height ?? 0) / 2}
        textAnchor={isSource ? "end" : "start"}
        dominantBaseline="middle"
        fill={labelColor}
        fontSize={11}
        fontWeight={500}
      >
        {lines.map((line, lineIndex) => (
          <tspan
            key={`${safePayload.name}-${lineIndex}`}
            x={
              isSource
                ? (x ?? 0) - labelOffset
                : (x ?? 0) + (width ?? 0) + labelOffset
            }
            dy={lineIndex === 0 ? lineOffset : 12}
          >
            {line}
          </tspan>
        ))}
      </text>
    </Layer>
  )
}

// Custom link component with gradient and percentage labels
type SankeyLinkPayload = {
  source?: { name: string }
  target?: { name: string }
  value?: number
}

type SankeyLinkProps = {
  sourceX?: number
  targetX?: number
  sourceY?: number
  targetY?: number
  sourceControlX?: number
  targetControlX?: number
  linkWidth?: number
  index?: number
  payload?: SankeyLinkPayload
  colorsMap: Record<string, string>
  fallbackSource: string
  fallbackTarget: string
  labelColor: string
}

const CustomLink = ({
  sourceX,
  targetX,
  sourceY,
  targetY,
  sourceControlX,
  targetControlX,
  linkWidth,
  index,
  payload,
  colorsMap,
  fallbackSource,
  fallbackTarget,
  labelColor,
}: SankeyLinkProps) => {
  // Try to get colors from payload first (Recharts passes source/target objects)
  const sourceName = payload?.source?.name || ""
  const targetName = payload?.target?.name || ""

  // Fallback to SANKEY_DATA lookup if payload doesn't have names
  const safeIndex = index ?? 0
  const link = SANKEY_DATA.links[safeIndex]
  const sourceNodeName =
    sourceName ||
    (link ? SANKEY_DATA.nodes[link.source]?.name : "") ||
    "HSM Revenue"
  const targetNodeName =
    targetName ||
    (link ? SANKEY_DATA.nodes[link.target]?.name : "") ||
    "Protocol"

  const sourceColor = colorsMap[sourceNodeName] || fallbackSource
  const targetColor = colorsMap[targetNodeName] || fallbackTarget
  const percentage = payload?.value || link?.value || 100

  // Create safe gradient ID (remove spaces and special chars)
  const safeSourceName = sourceNodeName.replace(/[^a-zA-Z0-9]/g, "")
  const gradientId = `linkGrad${safeIndex}${safeSourceName}`

  // Calculate midpoint for label
  const midX = ((sourceX ?? 0) + (targetX ?? 0)) / 2
  const midY = ((sourceY ?? 0) + (targetY ?? 0)) / 2

  // Path definition
  const pathD = `M${sourceX ?? 0},${sourceY ?? 0} C${sourceControlX ?? 0},${sourceY ?? 0} ${targetControlX ?? 0},${targetY ?? 0} ${targetX ?? 0},${targetY ?? 0}`

  return (
    <Layer key={`link-${index}`}>
      {/* Define gradient for this link */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={sourceColor} stopOpacity={0.7} />
          <stop offset="50%" stopColor={sourceColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={targetColor} stopOpacity={0.7} />
        </linearGradient>
      </defs>
      {/* Render path with gradient stroke, fallback to solid color */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={linkWidth ?? 0}
      />
      {/* Fallback solid path underneath in case gradient fails */}
      <path
        d={pathD}
        fill="none"
        stroke={sourceColor}
        strokeWidth={linkWidth ?? 0}
        strokeOpacity={0.3}
        style={{ pointerEvents: "none" }}
      />
      {/* Percentage label on link */}
      {(linkWidth ?? 0) > 8 && (
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={labelColor}
          fillOpacity={0.9}
          fontSize={10}
          fontWeight={600}
        >
          {percentage}%
        </text>
      )}
    </Layer>
  )
}

// Custom tooltip
type SankeyTooltipProps = {
  active?: boolean
  payload?: Array<{
    payload: SankeyLinkPayload & {
      source?: { name: string }
      target?: { name: string }
    }
  }>
  containerStyle: CSSProperties
  labelColor: string
  valueColor: string
}

const CustomTooltip = ({
  active,
  payload,
  containerStyle,
  labelColor,
  valueColor,
}: SankeyTooltipProps) => {
  if (!active || !payload || !payload.length) return null

  const data = payload[0]?.payload
  if (!data?.source || !data?.target) return null

  return (
    <div style={containerStyle}>
      <Text fs={12} style={{ color: labelColor }}>
        {data.source.name} → {data.target.name}
      </Text>
      <Text fs={11} style={{ color: valueColor }}>
        {data.value ?? 0}% of fee
      </Text>
    </div>
  )
}

type Props = {
  title?: string
}

export const FeeFlowChart: FC<Props> = ({ title = "Fee Flow" }) => {
  const { themeProps: theme } = useTheme()
  const { isMobile } = useBreakpoints()
  const feeColors = getFeeColors(theme)
  const flowColors = getFeeFlowColors(feeColors)
  const labelColor = theme.text.high
  const fallbackColor = theme.text.medium

  const tooltipStyles = {
    background: theme.surfaces.containers.low.primary,
    padding: `${theme.scales.paddings.s}px ${theme.scales.paddings.base}px`,
    borderRadius: `${theme.scales.cornerRadius.m}px`,
    border: `1px solid ${theme.details.borders}`,
  }

  const tooltipLabelColor = theme.text.high
  const tooltipValueColor = theme.text.medium

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
              Where fees go
            </Text>
          }
          wrap={true}
          size="header"
          style={{ alignItems: "flex-start" }}
        />
      </SChartHeader>

      <SChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={SANKEY_DATA}
            node={
              <CustomNode
                colorsMap={flowColors}
                labelColor={labelColor}
                fallbackColor={fallbackColor}
                isMobile={isMobile}
              />
            }
            link={
              <CustomLink
                colorsMap={flowColors}
                fallbackSource={feeColors.networkFees}
                fallbackTarget={feeColors.protocol}
                labelColor={labelColor}
              />
            }
            nodePadding={24}
            nodeWidth={14}
            margin={
              isMobile
                ? { top: 8, right: 72, bottom: 8, left: 72 }
                : { top: 10, right: 72, bottom: 10, left: 100 }
            }
          >
            <Tooltip
              content={
                <CustomTooltip
                  containerStyle={tooltipStyles}
                  labelColor={tooltipLabelColor}
                  valueColor={tooltipValueColor}
                />
              }
            />
          </Sankey>
        </ResponsiveContainer>
      </SChartWrapper>
    </SChartContainer>
  )
}
