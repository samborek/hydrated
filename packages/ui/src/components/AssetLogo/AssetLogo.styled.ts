import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { linearScale } from "@galacticcouncil/utils"

import { Logo, LogoSize } from "@/components/Logo"
import { ThemeProps } from "@/theme"
import { createVariants } from "@/utils"

import { Icon } from "../Icon"
import { Image } from "../Image"
import { AssetLogoDecoration } from "./AssetLogo"

// Logo diameters in rem for responsive scaling
export const LOGO_DIAMETER = {
  "extra-small": 0.75, // 12px at 16px base
  small: 1.125, // 18px
  medium: 1.5, // 24px
  large: 2.25, // 36px
} as const

// Overlaps in rem
const LOGO_OVERLAP = {
  "extra-small": 0.125, // 2px
  small: 0.25, // 4px
  medium: 0.375, // 6px
  large: 0.5, // 8px
} as const

// Decoration thickness in rem
const DECOR_THICKNESS = {
  "extra-small": 0.0625, // 1px
  small: 0.09375, // 1.5px
  medium: 0.09375, // 1.5px
  large: 0.125, // 2px
} as const

// Decoration padding in rem
const DECOR_PADDING = {
  "extra-small": 0.0625, // 1px
  small: 0.09375, // 1.5px
  medium: 0.09375, // 1.5px
  large: 0.125, // 2px
} as const

const getATokenDecorationStyles = (
  theme: ThemeProps,
  thickness: number,
  padding: number,
) => {
  const backdropColor = theme.surfaces.themeBasePalette.background
  return css`
    ${SAssetLogo} {
      border: ${padding}rem solid ${backdropColor};
      background: ${backdropColor};
    }

    &::before {
      content: "";
      position: absolute;
      inset: -${thickness}rem;
      background: linear-gradient(to right, #39a5ff, #0063b5 50%, transparent);
    }
  `
}

const calculateCircleOffset = (
  percentage: number,
  diameter: number,
): number => {
  const radius = diameter / 2
  const offset = linearScale([0, 50], [0, radius])(percentage)
  return radius - offset
}

const getCirclePosition = (
  percentage: number,
  diameter: number,
  thickness: number,
  overlap: number,
): string => {
  const offset = calculateCircleOffset(
    percentage,
    diameter - thickness * 2 - overlap * 2,
  )
  return `calc(${percentage}% - ${offset}rem)`
}

const generateATokenMask = (
  count: number,
  diameter: number,
  overlap: number,
  thickness: number,
): string => {
  const maskDiameter = diameter + thickness * 2
  const maskRadius = maskDiameter / 2

  const positions = Array.from({ length: count }, (_, i) => {
    const step = 100 / (count + 1)
    return step * (i + 1)
  })

  const masks = positions.map(
    (position) =>
      `radial-gradient(
      circle ${maskRadius}rem at ${getCirclePosition(position, diameter, thickness, overlap)},
      black 0%,
      black 98%,
      transparent 100%
    )`,
  )

  return masks.join(", ")
}

const decorations = (thickness: number, padding: number) =>
  createVariants<AssetLogoDecoration>((theme) => ({
    none: css``,
    atoken: css`
      ${getATokenDecorationStyles(theme, thickness, padding)}
    `,
  }))

export const SAssetLogo = styled(Logo)()

export const SAssetChainLogo = styled(Image)<{ size: LogoSize }>(({
  size,
  theme,
}) => {
  const backdropColor = theme.surfaces.themeBasePalette.background
  const borderSize = ["medium", "large"].includes(size) ? 0.125 : 0.0625 // 2px or 1px in rem
  return css`
    --border-size: ${borderSize}rem;
    display: flex;

    position: absolute;
    right: -10%;
    top: -10%;

    z-index: 1;

    width: 50%;
    height: 50%;

    border-radius: ${theme.radii.full}px;
    border: var(--border-size) solid ${backdropColor};
    background: ${backdropColor};
  `
})

export const SAssetBadge = styled(Icon)<{
  type: "red" | "yellow"
}>(({ theme, type }) => {
  const colorMap = {
    red: theme.colors.utility.warningPrimary[500],
    yellow: theme.colors.utility.warningSecondary[500],
  }

  return css`
    display: flex;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.85));
    color: ${colorMap[type]};
  `
})

export const SBadgeSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -10%;
  bottom: -10%;

  z-index: 1;

  width: 50%;
  height: 50%;
`

export const SDecorationContainer = styled.div<{
  size: LogoSize
  count: number
  decoration?: AssetLogoDecoration
}>(({ decoration = "none", count, size }) => {
  const overlap = LOGO_OVERLAP[size]
  const thickness = DECOR_THICKNESS[size]
  const padding = DECOR_PADDING[size]
  const diameter = LOGO_DIAMETER[size]
  return [
    css`
      font-size: ${diameter}rem;
      position: relative;
      display: inline-flex;
      width: fit-content;
      flex-shrink: 0;

      > :not(:first-of-type) {
        margin-left: -${overlap}rem;
      }
    `,
    decorations(thickness, padding)(decoration),
    decoration === "atoken" &&
      css`
        &::before {
          mask-image: ${generateATokenMask(
            count,
            diameter,
            overlap,
            thickness,
          )};
        }
      `,
  ]
})
