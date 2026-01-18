import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { mq } from "@galacticcouncil/ui/theme"

import { TOP_NAVBAR_BREAKPOINT } from "@/modules/layout/constants"

export const HEADER_HEIGHT = 64
export const HEADER_HEIGHT_MOBILE = 56

type SHeaderProps = {
  $hidden?: boolean
}

export const SHeader = styled.header<SHeaderProps>(
  ({ theme, $hidden }) => css`
    position: sticky;
    top: 0;
    z-index: ${theme.zIndices.header};
    height: ${HEADER_HEIGHT_MOBILE}px;

    display: grid;
    grid-template-columns: 1fr auto;

    align-items: center;
    gap: 40px;

    width: 100%;
    padding: 0 ${theme.scales.paddings.base}px;
    border-bottom: 1px solid;
    border-color: ${theme.details.separators};
    background: ${theme.surfaces.themeBasePalette.background};

    transition: transform 0.3s ease-in-out;
    transform: translateY(${$hidden ? "-100%" : "0"});

    ${mq(TOP_NAVBAR_BREAKPOINT)} {
      height: ${HEADER_HEIGHT}px;
      grid-template-columns: auto 1fr auto;
      padding: 0px 30px;
      padding-right: 15px;
    }
  `,
)
