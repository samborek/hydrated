import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { TableCell, TableRow } from "@galacticcouncil/ui/components"

/** Single variable to control order book row/cell min height (rows flex to fill space) */
export const ORDER_BOOK_ROW_HEIGHT = "24px"

/** Font size token key for order book table cells (e.g. "p6") */
export const ORDER_BOOK_FONT_SIZE_TOKEN = "p6" as const

/** Column header (thead) font size – smaller than body */
export const ORDER_BOOK_HEADER_FONT_SIZE = "12px"

/** Min height for the table area so flex distribution has a defined space when order count varies */
export const ORDER_BOOK_TABLE_MIN_HEIGHT = "280px"

/** Min height in px (numeric) for content-height calculation */
export const ORDER_BOOK_TABLE_MIN_HEIGHT_PX = 280

/** Row height in px (numeric) for content-height calculation so container can expand */
export const ORDER_BOOK_ROW_HEIGHT_PX = 24

/** Approximate header row height in px for content-height calculation */
export const ORDER_BOOK_HEADER_HEIGHT_PX = 40

export const SOrderBookControls = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.space.m};
    margin-bottom: ${theme.space.m};
  `,
)

export const SOrderBookTableWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    min-height: ${ORDER_BOOK_TABLE_MIN_HEIGHT};
    align-self: flex-start;
    width: 100%;

    /* Table container sizes to content so wrapper expands with row count/height */
    & > div {
      display: flex;
      flex-direction: column;
      min-height: fit-content;
    }

    table {
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: fit-content;
      border-collapse: collapse;
    }

    thead {
      flex-shrink: 0;
    }

    table thead th,
    table thead td {
      font-size: ${ORDER_BOOK_HEADER_FONT_SIZE};
      padding-block: ${theme.space.s};
      padding-inline: ${theme.space.m};
      vertical-align: middle;
      flex: 0 0 33.333%;
      min-width: 0;
      height: auto;
    }

    tbody {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
    }

    /* Reset base table heights that conflict with compact rows */
    thead tr,
    tbody tr {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      height: ${ORDER_BOOK_ROW_HEIGHT};
    }

    tbody tr[data-orderbook-row="spread"] {
      height: auto;
      min-height: 40px;
      padding-block: ${theme.space.s};
    }

    tbody tr[data-orderbook-row="spread"] td {
      padding-block: ${theme.space.s};
    }

    tbody tr {
      flex: 0 0 auto;
    }

    table tbody td {
      padding-block: 0;
      padding-inline: ${theme.space.s};
      font-size: ${theme.fontSizes[ORDER_BOOK_FONT_SIZE_TOKEN]};
      vertical-align: middle;
      flex: 0 0 33.333%;
      min-width: 0;
      height: auto;
    }
  `,
)

export const SOrderBookRow = styled(TableRow)<{
  type: "ask" | "bid"
  percentage: number
}>(({ theme, type, percentage }) => {
  const askColor = theme.colors?.utility?.red?.["400"] ?? "#ff6868"
  const bidColor = theme.colors?.successGreen?.["500"] ?? "#74C742"
  const color = type === "ask" ? askColor : bidColor
  return css`
    position: relative;
    cursor: pointer;
    min-height: ${ORDER_BOOK_ROW_HEIGHT};

    background: linear-gradient(
      to left,
      color-mix(in srgb, ${color} 10%, transparent) ${percentage}%,
      transparent ${percentage}%
    );

    &:hover {
      background: linear-gradient(
        to left,
        color-mix(in srgb, ${color} 20%, transparent) ${percentage}%,
        rgba(255, 255, 255, 0.05) ${percentage}%
      );
    }

    td {
      padding-block: 0;
      font-size: ${theme.fontSizes[ORDER_BOOK_FONT_SIZE_TOKEN]};
    }
  `
})

export const SOrderBookPrice = styled(TableCell)<{ type: "ask" | "bid" }>(
  ({ theme, type }) => css`
    color: ${type === "ask"
      ? (theme.colors?.utility?.red?.["400"] ?? "#ff6868")
      : (theme.colors?.successGreen?.["500"] ?? "#74C742")};
    font-weight: 500;
  `,
)

export const SOrderBookTotal = styled(TableCell)(
  ({ theme }) => css`
    color: ${theme.text?.medium ?? "inherit"};
    text-align: right;
  `,
)

export const SOrderBookSize = styled(TableCell)(
  ({ theme }) => css`
    color: ${theme.text?.high ?? "inherit"};
    text-align: right;
  `,
)
