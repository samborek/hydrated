import { css, styled } from "@galacticcouncil/ui/utils"
import { mq } from "@galacticcouncil/ui/theme"

export const SAccountSelectLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;

  ${mq("sm")} {
    flex-direction: row;
  }
`

export const SWalletsPanel = styled.div(
  ({ theme }) => css`
    display: none;
    flex-direction: column;
    flex: 0 0 200px;
    gap: ${theme.space.s};
    width: 100%;
    max-width: 200px;
    min-width: 0;
    min-height: 0;
    height: 100%;
    max-height: 100%;
    align-self: stretch;
    padding: ${theme.space.m} ${theme.space.base};
    overflow-x: hidden;
    overflow-y: auto;

    ${mq("sm")} {
      display: flex;
    }
  `
)

export const SWalletsPanelSection = styled.div<{ readonly scrollable?: boolean }>(
  ({ theme, scrollable }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.xs};
    min-height: 0;

    ${scrollable &&
    css`
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    `}
  `
)

export const SWalletsPanelLabel = styled.span(
  ({ theme }) => css`
    font-size: 14px;
    font-weight: 500;
    color: ${theme.text.medium};
    margin-bottom: ${theme.space.base};
  `
)

export const SWalletItem = styled.button<{
  readonly isActive?: boolean
  readonly isMoreWallets?: boolean
}>(
  ({ theme, isActive, isMoreWallets }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.s};
    padding: ${theme.space.base};
    border: 1px solid
      ${isActive ? theme.buttons.secondary.accent.outline : "transparent"};
    border-radius: ${theme.radii.base};
    background: ${isActive
      ? theme.buttons.secondary.accent.rest
      : "transparent"};
    color: ${theme.text.high};
    cursor: pointer;
    transition: all 0.15s ease;
    width: 100%;
    text-align: left;
    font-size: ${theme.fontSizes.p5};
    line-height: 18px;
    font-weight: 500;
    text-decoration: none;
    min-height: 40px;
    flex-shrink: 0;

    &:hover {
      background: ${isActive
        ? theme.buttons.secondary.accent.hover
        : theme.colors.darkBlue.alpha[200]};
    }

    &:disabled {
      cursor: wait;
      opacity: 0.7;
    }

    ${isMoreWallets &&
    css`
      margin-top: ${theme.space.xs};
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    `}

    p {
      line-height: 18px;
      height: 18px;
    }

    > svg:first-of-type,
    > img:first-of-type,
    > div:first-of-type > img,
    > div:first-of-type > svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      border-radius: 50%;
    }
  `
)

export const SWalletStatus = styled.span<{ readonly isConnected?: boolean }>(
  ({ theme, isConnected }) => css`
    font-size: 10px;
    font-weight: 500;
    color: ${isConnected ? theme.text.medium : theme.text.low};
    line-height: 1.2;
  `
)

export const SWalletDisconnect = styled.button(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: transparent;
    color: ${theme.text.medium};
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 1;
      color: ${theme.text.high};
    }

    svg {
      width: 12px;
      height: 12px;
    }
  `
)

export const SAccountListPanel = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: 12px ${theme.space.primary} 20px;
  `
)

export const SAccountListHeader = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space.base};
    margin-bottom: ${theme.space.m};
  `
)

export const SAccountList = styled.div<{ readonly compact?: boolean }>(
  ({ theme, compact }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.s};
    overflow-y: ${compact ? "visible" : "auto"};
    flex: ${compact ? "0 0 auto" : 1};
    min-height: 0;
    margin: 0 -${theme.space.primary};
    padding: 0 ${theme.space.primary};
  `
)

export const SAccountGroup = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.s};

    &:not(:first-of-type) {
      margin-top: ${theme.space.base};
    }
  `
)

export const SAccountGroupHeader = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.space.base} 0 ${theme.space.xs};

    img,
    svg {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `
)
