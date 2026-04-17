import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Flex, Text } from "@galacticcouncil/ui/components"
import { AssetLogo } from "@/components/AssetLogo"
import { useEffect, useState } from "react"
import type { TooltipContentProps } from "recharts"

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
    gap: ${theme.scales.paddings.s}px;
    position: relative;
    border-radius: ${theme.radii.lg}px;
    background-color: ${theme.details.tooltips};
    border: 1px solid rgba(124, 127, 138, 0.2);
    padding: ${theme.scales.paddings.l}px;
    box-shadow: 0px 8px 30px 0px rgba(41, 41, 60, 0.41);
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: translateY(4px) scale(0.98);
    transition:
      opacity 180ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 180ms cubic-bezier(0.22, 1, 0.36, 1);

    &[data-state="visible"] {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `,
)

/** Spread onto every Recharts <Tooltip> to disable position animation and pin near cursor */
export const chartTooltipProps = {
  isAnimationActive: false,
  offset: 14,
  allowEscapeViewBox: { x: true, y: true },
  wrapperStyle: {
    transition: "none",
    pointerEvents: "none" as const,
    zIndex: 9999,
  },
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

type TooltipCoordinate = Pick<TooltipContentProps<number, string>, "coordinate">["coordinate"]

type ChartTooltipContentWithPositionProps = ChartTooltipContentProps & {
  coordinate?: TooltipCoordinate
  onPositionChange?: (position: { x: number; y: number } | null) => void
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
  const [renderedPayload, setRenderedPayload] = useState(payload)
  const [isVisible, setIsVisible] = useState(Boolean(active && payload?.length))

  useEffect(() => {
    if (active && payload?.length) {
      setRenderedPayload(payload)
      setIsVisible(true)
      return
    }

    setIsVisible(false)
    const timeout = globalThis.setTimeout(() => {
      setRenderedPayload(undefined)
    }, 180)

    return () => globalThis.clearTimeout(timeout)
  }, [active, payload])

  const content = renderedPayload ?? payload

  if (!content?.length) return null

  return (
    <SChartTooltipContainer data-state={isVisible ? "visible" : "hidden"}>
      <Text fs={12} fw={500} color="text.high">
        {labelFormatter(label || "")}
      </Text>
      {content.map((entry) => (
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

export const ChartTooltipContentWithPosition = ({
  coordinate,
  onPositionChange,
  ...props
}: ChartTooltipContentWithPositionProps) => {
  useEffect(() => {
    if (!coordinate || !onPositionChange) {
      onPositionChange?.(null)
      return
    }

    onPositionChange({
      x: coordinate.x + 16,
      y: coordinate.y,
    })
  }, [coordinate, onPositionChange])

  return <ChartTooltipContent {...props} />
}

/**
 * Cursor style for hover effect on bar/area charts
 * Matches list element hover background
 */
export const chartCursorStyle = { fill: "rgba(255, 255, 255, 0.04)" }
