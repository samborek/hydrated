import { FormError, NumberInput } from "@galacticcouncil/ui/components"
import { css, styled, toRem } from "@galacticcouncil/ui/utils"

export const SNumberInput = styled(NumberInput)(({ theme }) => [
  css`
    text-align: right;
    font-size: ${theme.paragraphSize.p2};

    padding-inline: 0;

    transition: ${theme.transitions.colors};
  `,
])

export const SFormError = styled(FormError)(
  ({ theme }) => css`
    text-align: right;
    margin-left: auto;
    position: absolute;
    bottom: -${toRem(theme.scales.paddings.m)};
    right: 0;
    white-space: nowrap;
    pointer-events: none;
  `,
)
