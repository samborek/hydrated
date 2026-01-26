import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Box } from "@galacticcouncil/ui/components"

export const SDetailedLink = styled(Box)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.625rem;

    width: 20rem;

    padding: 1rem;
    border-radius: ${theme.scales.cornerRadius.l}px;

    text-decoration: none;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
      svg {
        color: ${theme.icons.primary};
      }
    }
  `,
)
