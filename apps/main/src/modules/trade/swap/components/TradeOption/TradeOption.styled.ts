import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { getTokenRem } from "@galacticcouncil/ui/utils"

export const STradeOptionSkeleton = styled.div(
  ({ theme }) => css`
    display: grid;

    border: 1px solid ${theme.buttons.outlineDark.onOutline};
    border-radius: ${getTokenRem("scales.cornerRadius.m")(theme as any)};
    padding: ${getTokenRem("scales.paddings.l")(theme as any)}
      ${getTokenRem("scales.paddings.m")(theme as any)};
  `,
)

export const STradeOptionContainer = styled.button<{ active: boolean }>(
  ({ theme, active }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${getTokenRem("scales.paddings.base")(theme as any)};

    border: 1px solid ${theme.buttons.outlineDark.onOutline};
    border-radius: ${getTokenRem("scales.cornerRadius.m")(theme as any)};

    padding: ${getTokenRem("scales.paddings.l")(theme as any)}
      ${getTokenRem("scales.paddings.m")(theme as any)};

    cursor: pointer;

    transition: ${theme.transitions.colors};

    ${active
      ? css`
          background-color: ${theme.buttons.secondary.outline.fill};
          border-color: ${theme.buttons.secondary.outline.outline};
        `
      : css`
          &:hover:not(:disabled) {
            background-color: ${theme.buttons.outlineDark.rest};
          }
        `}

    &:disabled {
      cursor: unset;
      opacity: 0.6;
    }
  `,
)
