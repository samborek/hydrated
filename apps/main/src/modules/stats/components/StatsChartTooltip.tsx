import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Flex, Text } from "@galacticcouncil/ui/components"
import { AssetLogo } from "@/components/AssetLogo"

/**
 * Styled tooltip container matching Figma "breakdown" tooltip variant
 * - Background: --details/tooltips (#212837)
 * - Border: 1.162px solid rgba(124,127,138,0.2)
 * - Shadow: 0px 8px 30px rgba(41,41,60,0.41)
 * - Border-radius: 8px
 * - Padding: 16px horizontal, 12px vertical
 */
export const SChartTooltipContainer = styled.div(
  ({ theme }) => css`
    display: grid;
    align-items: start;
    gap: 8px;
    border-radius: ${theme.radii.lg}px;
    background-color: ${theme.details.tooltips};
    border: 1px solid rgba(124, 127, 138, 0.2);
    padding: ${theme.containers.paddings.secondary}px;
    box-shadow: 0px 8px 30px 0px rgba(41, 41, 60, 0.41);
    animation: tooltipFadeIn 0.12s ease-out both;
    pointer-events: none;

    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: scale(0.97);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
)

/** Spread onto every Recharts <Tooltip> to disable position animation and pin near cursor */
export const chartTooltipProps = {
  isAnimationActive: false,
  offset: 14,
  wrapperStyle: { transition: "none", pointerEvents: "none" as const },
} as const

type TooltipPayloadItem = {
  name: string
  value: number
  color: string
  dataKey: string
  assetId?: string
}

type ChartTooltipContentProps = {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string | number
  valueFormatter?: (value: number, name: string) => string
  labelFormatter?: (label: string | number) => string
  nameFormatter?: (name: string) => string
}

/**
 * Reusable chart tooltip content component matching Figma design
 * Uses Figma specs: 10px uppercase labels, 12px values
 */
export const ChartTooltipContent = ({
  active,
  payload,
  label,
  valueFormatter = (v) => v.toFixed(2),
  labelFormatter = (l) => String(l),
  nameFormatter = (n) => n,
}: ChartTooltipContentProps) => {
  if (!active || !payload?.length) return null

  return (
    <SChartTooltipContainer>
      <Text fs={12} fw={500} color="text.high">
        {labelFormatter(label || "")}
      </Text>
      {payload.map((entry) => (
        <Flex key={entry.dataKey} gap={8} align="center">
          {entry.assetId ? (
            <AssetLogo id={entry.assetId} size="small" />
          ) : (
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: entry.color,
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
          )}
          <Flex
            justify="space-between"
            gap={16}
            sx={{ flex: 1, minWidth: 100 }}
          >
            <Text
              fs={10}
              fw={500}
              color="text.medium"
              css={{ textTransform: "uppercase", letterSpacing: "0.02em" }}
            >
              {nameFormatter(entry.name)}
            </Text>
            <Text fs={12} fw={500} color="text.high">
              {valueFormatter(entry.value, entry.name)}
            </Text>
          </Flex>
        </Flex>
      ))}
    </SChartTooltipContainer>
  )
}

/**
 * Cursor style for hover effect on bar/area charts
 * Matches list element hover background
 */
export const chartCursorStyle = { fill: "rgba(255, 255, 255, 0.04)" }
