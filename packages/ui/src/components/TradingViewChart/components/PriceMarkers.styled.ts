import { css, styled } from "@/utils"

export const SPriceMarkerLine = styled.div(
  ({ theme }) => css`
    position: absolute;
    left: 0;
    right: 50px;

    height: 1px;
    border-top: 1px dashed ${theme.details.values.positive};

    pointer-events: none;
    z-index: 1;
  `,
)

export const SPriceMarkerTag = styled.div(
  ({ theme }) => css`
    position: absolute;
    right: 0;
    transform: translateY(-50%);

    padding: 4px 8px;
    border-radius: 4px;
    border: none;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;

    background-color: ${theme.details.values.positive};
    color: ${theme.text.contrast};

    cursor: default;
    z-index: 2;
  `,
)
