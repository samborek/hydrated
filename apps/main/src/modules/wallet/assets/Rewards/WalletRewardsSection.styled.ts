import { Stack } from "@galacticcouncil/ui/components"
import { mq } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"

export const SWalletRewardsSection = styled(Stack)(
  ({ theme }) => css`
    padding-inline: ${theme.space.base};
    padding-block: ${theme.space.base};
    border-radius: 16px;
    border: 1px solid ${theme.details.separators};

    ${mq("sm")} {
      padding-inline: ${theme.space.l};
      padding-block: ${theme.space.l};
    }
  `,
)

export const SWalletRewardsGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.space.base};

    ${mq("sm")} {
      grid-template-columns: 1fr;
    }
  `,
)
