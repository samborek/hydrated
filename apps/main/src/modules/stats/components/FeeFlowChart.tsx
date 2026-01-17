import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC } from "react"
import { Sankey, Tooltip, Layer, Rectangle, ResponsiveContainer } from "recharts"

import { getFeeColors } from "@/modules/stats/utils/feeColors"

const SChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.scales.paddings.m}px;
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
  "Treasury": colors.treasury,
  "LPs": colors.lps,
  "Referrers & Stakers": colors.referrersAndStakers,
  "Burned": colors.burned,
  "Protocol": colors.protocol,
})

// Fee flow data based on the documentation
// Nodes: 0-5 are sources, 6-10 are destinations
const SANKEY_DATA = {
  nodes: [
    // Sources (index 0-5)
    { name: "Network Fees" },        // 0
    { name: "Omnipool Asset Fee" },  // 1
    { name: "Omnipool Protocol Fee" }, // 2
    { name: "Withdrawal Fee" },      // 3
    { name: "XYK Trade Fee" },       // 4
    { name: "HSM Revenue" },         // 5
    // Destinations (index 6-10)
    { name: "Treasury" },            // 6
    { name: "LPs" },                 // 7
    { name: "Referrers & Stakers" }, // 8
    { name: "Burned" },              // 9
    { name: "Protocol" },            // 10
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
}: any) => {
  const isSource = index < 6
  const color = colorsMap[payload.name] || fallbackColor

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
        x={isSource ? x - 8 : x + width + 8}
        y={y + height / 2}
        textAnchor={isSource ? "end" : "start"}
        dominantBaseline="middle"
        fill={labelColor}
        fontSize={11}
        fontWeight={500}
      >
        {payload.name}
      </text>
    </Layer>
  )
}

// Custom link component with gradient and percentage labels
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
}: any) => {
  // Try to get colors from payload first (Recharts passes source/target objects)
  const sourceName = payload?.source?.name || ''
  const targetName = payload?.target?.name || ''
  
  // Fallback to SANKEY_DATA lookup if payload doesn't have names
  const link = SANKEY_DATA.links[index]
  const sourceNodeName = sourceName || (link ? SANKEY_DATA.nodes[link.source]?.name : "") || "HSM Revenue"
  const targetNodeName = targetName || (link ? SANKEY_DATA.nodes[link.target]?.name : "") || "Protocol"

  const sourceColor = colorsMap[sourceNodeName] || fallbackSource
  const targetColor = colorsMap[targetNodeName] || fallbackTarget
  const percentage = payload?.value || link?.value || 100
  
  // Create safe gradient ID (remove spaces and special chars)
  const safeSourceName = sourceNodeName.replace(/[^a-zA-Z0-9]/g, '')
  const gradientId = `linkGrad${index}${safeSourceName}`
  
  // Calculate midpoint for label
  const midX = (sourceX + targetX) / 2
  const midY = (sourceY + targetY) / 2
  
  // Path definition
  const pathD = `M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`
  
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
        strokeWidth={linkWidth}
      />
      {/* Fallback solid path underneath in case gradient fails */}
      <path
        d={pathD}
        fill="none"
        stroke={sourceColor}
        strokeWidth={linkWidth}
        strokeOpacity={0.3}
        style={{ pointerEvents: 'none' }}
      />
      {/* Percentage label on link */}
      {linkWidth > 8 && (
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
const CustomTooltip = ({ active, payload, containerStyle, labelColor, valueColor }: any) => {
  if (!active || !payload || !payload.length) return null
  
  const data = payload[0].payload
  if (!data.source || !data.target) return null
  
  return (
    <div style={containerStyle}>
      <Text fs={12} style={{ color: labelColor }}>
        {data.source.name} → {data.target.name}
      </Text>
      <Text fs={11} style={{ color: valueColor }}>
        {data.value}% of fee
      </Text>
    </div>
  )
}

type Props = {
  title?: string
}

export const FeeFlowChart: FC<Props> = ({
  title = "Fee Flow",
}) => {
  const { themeProps: theme } = useTheme()
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
      <SChartHeader>
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
            margin={{ top: 10, right: 110, bottom: 10, left: 120 }}
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
