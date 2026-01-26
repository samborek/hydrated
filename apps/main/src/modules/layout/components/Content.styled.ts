import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Box } from "@galacticcouncil/ui/components"
import { mq } from "@galacticcouncil/ui/theme"

export const SContent = styled(Box)(
  () => css`
    --layout-gutter: 0.5rem;
    --layout-bottom-safe-area: 0.625rem;

    max-width: 81.25rem;

    ${mq("lg")} {
      --layout-gutter: 1.875rem;
      --layout-bottom-safe-area: 2.5rem;
    }

    margin: 0 auto;

    padding-inline: var(--layout-gutter);
  `,
)

export const SMainContent = styled(SContent)`
  display: flex;
  flex-direction: column;
  padding-top: 0;
  padding-bottom: var(--layout-bottom-safe-area);
`
