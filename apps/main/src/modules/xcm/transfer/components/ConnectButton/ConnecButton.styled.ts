import { Button } from "@galacticcouncil/ui/components"
import { css, styled, toRem } from "@galacticcouncil/ui/utils"

export const SConnectButton = styled(Button)(
  ({ theme }) => css`
    padding: ${toRem(theme.scales.paddings.xs)} ${toRem(theme.scales.paddings.base)}
      ${toRem(theme.scales.paddings.xs)} ${toRem(theme.scales.paddings.s)};
    font-size: ${theme.paragraphSize.p6};
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
  `,
)
