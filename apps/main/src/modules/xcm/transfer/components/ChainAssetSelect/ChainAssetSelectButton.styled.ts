import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Button } from "@galacticcouncil/ui/components"
import { toRem } from "@galacticcouncil/ui/utils"

// Height derived from base padding scale (scales.paddings.xxxl + scales.paddings.s = 32 + 4 + 2 = 38)
export const SButton = styled(Button)<{
  hasSelection: boolean
  disabled: boolean
}>(
  ({ theme, hasSelection, disabled }) => css`
    width: fit-content;
    display: inline-flex;
    padding-inline: ${toRem(theme.scales.paddings.base)};
    padding-block: ${toRem(theme.scales.paddings.s)};
    height: calc(
      ${toRem(theme.scales.paddings.xxxl)} + ${toRem(theme.scales.paddings.s)} +
        ${toRem(theme.scales.paddings.xs)}
    );

    ${hasSelection &&
    css`
      background: transparent;
      border: ${theme.scales.border.base}px solid
        ${theme.buttons.secondary.low.borderRest};
    `}

    ${disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
  `,
)
