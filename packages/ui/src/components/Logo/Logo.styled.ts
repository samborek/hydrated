import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { mapValues } from "remeda"

import { createVariants } from "@/utils"

import { Icon } from "../Icon"
import { Image } from "../Image"
import { LogoSize } from "./Logo"

// Logo sizes in rem for responsive scaling
export const LOGO_SIZES = {
  "extra-small": 0.75, // 12px at 16px base
  small: 1.125, // 18px
  medium: 1.5, // 24px
  large: 2.25, // 36px
} as const

const sizes = createVariants(() =>
  mapValues(
    LOGO_SIZES,
    (size) => css`
      width: ${size}rem;
      height: ${size}rem;
      font-size: ${size}rem;
    `,
  ),
)

export const SLogo = styled(Image, {
  shouldForwardProp: (prop) => prop !== "size",
})<{
  size: LogoSize
}>(({ size, theme }) => [
  sizes(size),
  css`
    position: relative;
    border-radius: ${theme.radii.full}px;
  `,
])

export const SLogoPlaceholder = styled(Icon, {
  shouldForwardProp: (prop) => prop !== "size",
})<{
  size: LogoSize
}>(({ size, theme }) => [
  css`
    display: inline-flex;
    border-radius: ${theme.radii.full}px;
    padding: 2px;
    color: ${theme.text.low};
    background-color: ${theme.surfaces.themeBasePalette.surfaceHigh};
  `,
  sizes(size),
])
