import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { getTokenRem } from "@galacticcouncil/ui/utils"

export const STradeOptionSkeleton = styled.div(
  ({ theme }) => css`
    display: grid;

    border: 1px solid ${theme.buttons.outlineDark.onOutline};
    border-radius: ${getTokenRem("scales.cornerRadius.m")(theme)};
    padding: ${getTokenRem("scales.paddings.l")(theme)}
      ${getTokenRem("scales.paddings.m")(theme)};
  `,
)

export const STradeOptionContainer = styled.button<{ active: boolean }>(
  ({ theme, active }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${getTokenRem("scales.paddings.base")(theme)};

    border: 1px solid ${theme.buttons.outlineDark.onOutline};
    border-radius: ${getTokenRem("scales.cornerRadius.m")(theme)};

    padding: ${getTokenRem("scales.paddings.l")(theme)}
      ${getTokenRem("scales.paddings.m")(theme)};

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
