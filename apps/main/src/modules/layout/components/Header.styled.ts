import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { mq } from "@galacticcouncil/ui/theme"

import { TOP_NAVBAR_BREAKPOINT } from "@/modules/layout/constants"

export const HEADER_HEIGHT = "4rem"
export const HEADER_HEIGHT_MOBILE = "3.5rem"

type SHeaderProps = {
  $hidden?: boolean
}

export const SHeader = styled.header<SHeaderProps>(
  ({ theme, $hidden }) => css`
    position: sticky;
    top: 0;
    z-index: ${theme.zIndices.header};
    height: ${HEADER_HEIGHT_MOBILE};

    display: grid;
    grid-template-columns: 1fr auto;

    align-items: center;
    gap: 2.5rem;

    width: 100%;
    padding: 0 0.5rem;
    border-bottom: 1px solid;
    border-color: ${theme.details.separators};
    background: ${theme.surfaces.themeBasePalette.background};

    transition: transform 0.3s linear;
    transform: translateY(${$hidden ? "-100%" : "0"});

    svg:first-of-type {
      width: 1.25rem;
      height: 1.25rem;
    }

    ${mq(TOP_NAVBAR_BREAKPOINT)} {
      height: ${HEADER_HEIGHT};
      grid-template-columns: auto 1fr auto;
      padding: 0 1.875rem;
      padding-right: 0.9375rem;

      svg:first-of-type {
        width: 6.5625rem;
        height: 1.375rem;
      }
    }
  `,
)
