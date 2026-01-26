import { mq } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"

import { TOP_NAVBAR_BREAKPOINT } from "@/modules/layout/constants"

export const SHeaderToolbar = styled.div(
  () => css`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0px;

    ${mq(TOP_NAVBAR_BREAKPOINT)} {
      gap: 1.25rem;
      padding: 0.375rem 0.875rem;
    }
  `,
)
