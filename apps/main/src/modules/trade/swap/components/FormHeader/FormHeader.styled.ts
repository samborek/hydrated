import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Box, Flex, Icon } from "@galacticcouncil/ui/components"
import { getTokenRem } from "@galacticcouncil/ui/utils"

export const SHeaderTab = styled(Box)<{ readonly disabled?: boolean }>(
  ({ theme, disabled }) => css`
    color: ${theme.text.low};

    padding-block: ${getTokenRem("scales.paddings.base")(theme as any)};
    padding-inline: ${getTokenRem("scales.paddings.m")(theme as any)};
    border-radius: ${getTokenRem("scales.cornerRadius.xxl")(theme as any)};

    font-weight: ${theme.base.medium};
    font-size: ${getTokenRem("paragraphSize.p3")(theme as any)};
    line-height: ${getTokenRem("lineHeight.m")(theme as any)};
    text-decoration: none;

    cursor: pointer;

    ${disabled &&
    css`
      pointer-events: none;
    `}

    &[data-status="active"] {
      color: ${theme.text.high};
    }

    &:hover {
      color: ${theme.text.high};
      background: ${theme.buttons.secondary.low.rest};
    }
  `,
)

export const SFormHeader = styled(Flex)(
  ({ theme }) => css`
    padding: ${getTokenRem("containers.paddings.secondary")(theme as any)} 0;
  `,
)

export const SSettingsIcon = styled(Icon)(
  ({ theme }) => css`
    cursor: pointer;

    color: ${theme.icons.onContainer};

    transition: ${theme.transitions.colors};

    &:hover {
      color: ${theme.icons.onSurfaceHover};
    }
  `,
)
