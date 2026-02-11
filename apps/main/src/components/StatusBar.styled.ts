import { mq } from "@galacticcouncil/ui/theme"
import { css } from "@galacticcouncil/ui/utils"
import styled from "@emotion/styled"

export const SStatusBar = styled.div(
  ({ theme }) => css`
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    gap: 0;
    align-items: center;
    z-index: 1001;

    ${mq("max-sm")} {
      right: ${theme.space.xs};
      bottom: calc(3.75rem + ${theme.space.xs});
    }
  `,
)
