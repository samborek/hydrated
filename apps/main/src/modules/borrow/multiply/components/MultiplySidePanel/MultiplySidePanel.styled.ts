import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Paper, Separator } from "@galacticcouncil/ui/components"

export const SMultiplyFormContainer = styled(Paper)(
  ({ theme }) => css`
    --multiply-section-padding-inline: ${theme.containers.paddings.primary}px;
    --multiply-section-inset-inline: calc(var(--multiply-section-padding-inline) * -1);

    padding: 0 var(--multiply-section-padding-inline);
    overflow-x: hidden;
  `,
)

export const SMultiplySectionSeparator = styled(Separator)`
  margin-inline: var(--multiply-section-inset-inline);
`
