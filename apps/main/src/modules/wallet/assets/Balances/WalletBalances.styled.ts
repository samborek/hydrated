import { mq } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"

export const SWalletBalances = styled.div(
  ({ theme }) => css`
    display: grid;
    row-gap: ${theme.space.s};
    min-width: 0;
    overflow: hidden;

    padding: ${theme.containers.paddings.secondary};
    border-radius: 16px;
    border: 1px solid ${theme.details.borders};

    background: ${theme.surfaces.containers.high.primary};

    grid-template-rows: 1fr auto auto;

    ${mq("md")} {
      padding: ${theme.containers.paddings.primary};

      grid-template-rows: auto;
      grid-template-columns: 1fr auto auto;
      column-gap: ${theme.space.xl};
    }
  `,
)

export const SWalletBalancesStats = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.space.base};

    ${mq("md")} {
      grid-template-columns: 1fr;
    }
  `,
)
