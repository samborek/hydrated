import { css } from "@emotion/react"
import styled from "@emotion/styled"

export const SLimitPriceSection = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.base};
    padding-block: ${theme.containers.paddings.primary};
  `,
)

export const SLimitPriceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SPresetButtonsRow = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space.s};
  `,
)

export const SPresetButton = styled.button<{ readonly isActive?: boolean }>(
  ({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    padding-inline: ${theme.space.base};
    border-radius: 20px;
    border: 1px solid ${theme.buttons.secondary.low.borderRest};
    background: ${isActive
      ? theme.buttons.secondary.low.hover
      : theme.buttons.secondary.low.rest};
    color: ${theme.text.high};
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
    transition: ${theme.transitions.colors};
    white-space: nowrap;

    &:hover {
      background: ${theme.buttons.secondary.low.hover};
    }
  `,
)

export const SLimitPriceRow = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.space.m};
    padding-top: ${theme.space.s};
  `,
)

export const SRateSwitcher = styled.button(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: 1px solid ${theme.buttons.secondary.low.borderRest};
    border-radius: 30px;
    color: ${theme.text.high};
    cursor: pointer;
    padding: ${theme.space.base} ${theme.space.m};
    flex-shrink: 0;
    transition: ${theme.transitions.colors};

    &:hover {
      background: ${theme.buttons.secondary.low.hover};
    }
  `,
)

export const SSwapIconButton = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: ${theme.text.medium};
  `,
)

export const SPriceInput = styled.input(
  ({ theme }) => css`
    flex: 1;
    min-width: 0;
    text-align: right;
    background: transparent;
    border: none;
    outline: none;
    color: ${theme.text.high};
    font-size: ${theme.fontSizes.p2};
    font-weight: 600;
    font-family: inherit;

    &::placeholder {
      color: ${theme.text.low};
    }

    /* Hide number input spinners */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  `,
)

export const STPSLSection = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-block: ${theme.space.base};
  `,
)

export const STPSLToggleRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const STPSLPriceSection = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space.l};
    padding-top: ${theme.space.base};
    padding-bottom: ${theme.space.l};
  `,
)

export const STPSLPriceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18px;
`

export const STPSLPriceRow = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.space.m};
  `,
)

export const STPSLPriceLabel = styled.button(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: ${theme.space.base} ${theme.space.m};
    border-radius: 30px;
    border: 1px solid ${theme.buttons.secondary.low.borderRest};
    background: transparent;
    color: ${theme.text.high};
    font-size: ${theme.fontSizes.p3};
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      background: ${theme.buttons.secondary.low.hover};
    }
  `,
)

