import {
  Flex,
  Paper,
  SectionHeader,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Text,
} from "@galacticcouncil/ui/components"
import { formatNumber } from "@galacticcouncil/utils"
import { useSearch } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { useAssets } from "@/providers/assetsProvider"

import {
  ORDER_BOOK_HEADER_HEIGHT_PX,
  ORDER_BOOK_ROW_HEIGHT,
  ORDER_BOOK_ROW_HEIGHT_PX,
  ORDER_BOOK_TABLE_MIN_HEIGHT_PX,
  SOrderBookControls,
  SOrderBookPrice,
  SOrderBookRow,
  SOrderBookSize,
  SOrderBookTableWrapper,
  SOrderBookTotal,
} from "./OrderBook.styled"

const DECIMAL_PRECISION_OPTIONS = [
  { key: "0.01", label: "0.01" },
  { key: "0.1", label: "0.1" },
  { key: "1", label: "1" },
  { key: "10", label: "10" },
  { key: "100", label: "100" },
] as const

export const MIN_ORDERS_PER_SIDE = 6

const ASKS_SEED = [
  { price: 1989.1, size: 102584, total: 606564, percentage: 70 },
  { price: 1988.9, size: 50612, total: 503979, percentage: 35 },
  { price: 1988.8, size: 20283, total: 453368, percentage: 15 },
  { price: 1988.7, size: 33684, total: 433085, percentage: 22 },
  { price: 1988.5, size: 85851, total: 399401, percentage: 55 },
]

const BIDS_SEED = [
  { price: 1987.2, size: 33658, total: 33658, percentage: 25 },
  { price: 1987.1, size: 38484, total: 72142, percentage: 30 },
  { price: 1987.0, size: 69843, total: 141985, percentage: 50 },
  { price: 1986.9, size: 17505, total: 159490, percentage: 12 },
  { price: 1986.8, size: 41746, total: 201236, percentage: 35 },
]

function repeatToLength<T>(arr: readonly T[], minLength: number): T[] {
  const out: T[] = []
  while (out.length < minLength) {
    out.push(...arr)
  }
  return out.slice(0, minLength)
}

const ASKS = repeatToLength(ASKS_SEED, MIN_ORDERS_PER_SIDE)
const BIDS = repeatToLength(BIDS_SEED, MIN_ORDERS_PER_SIDE)

/** Convert the precision step (e.g. "0.01") into fraction digits count */
function precisionToFractionDigits(precision: string): number {
  const num = Number(precision)
  if (num >= 1) return 0
  return Math.max(0, -Math.floor(Math.log10(num)))
}

/** Round a price to the nearest step (e.g. step 0.1 → 1988.73 becomes 1988.7) */
function roundToStep(price: number, step: number): number {
  return Math.round(price / step) * step
}

export type OrderBookProps = {
  variant?: "full" | "compact"
  /** Number of ask/bid rows to show per side (min {@link MIN_ORDERS_PER_SIDE}) */
  ordersPerSide?: number
}

export const OrderBook = ({
  variant = "full",
  ordersPerSide = MIN_ORDERS_PER_SIDE,
}: OrderBookProps) => {
  const { t } = useTranslation(["common", "trade"])
  const { assetIn: assetInId, assetOut: assetOutId } = useSearch({
    from: "/trade/_history",
  })
  const { getAssetWithFallback } = useAssets()

  const assetIn = getAssetWithFallback(assetInId)
  const assetOut = getAssetWithFallback(assetOutId)

  const [decimalPrecision, setDecimalPrecision] = useState<string>("0.01")
  const [token, setToken] = useState<string>(assetOut.id)

  useEffect(() => {
    setToken(assetOut.id)
  }, [assetOut.id])

  const tokenOptions = useMemo(
    () => [
      { key: assetIn.id, label: assetIn.symbol },
      { key: assetOut.id, label: assetOut.symbol },
    ],
    [assetIn, assetOut],
  )

  const selectedToken = getAssetWithFallback(token)
  const priceFractionDigits = precisionToFractionDigits(decimalPrecision)
  const precisionStep = Number(decimalPrecision)

  // When the selected token is the quote asset (assetOut), show raw size/total.
  // When the selected token is the base asset (assetIn), convert by dividing by price.
  const isBaseDenomination = token === assetIn.id

  const visibleAsks = ASKS.slice(
    0,
    Math.max(MIN_ORDERS_PER_SIDE, ordersPerSide),
  )
  const visibleBids = BIDS.slice(
    0,
    Math.max(MIN_ORDERS_PER_SIDE, ordersPerSide),
  )

  const convertSize = (value: number, price: number) =>
    isBaseDenomination ? value / price : value

  const convertPrice = (price: number) =>
    isBaseDenomination ? 1 / price : price

  // Price header shows which asset the price is denominated in
  const priceAssetSymbol = isBaseDenomination ? assetIn.symbol : assetOut.symbol

  const totalRows = visibleAsks.length + 1 + visibleBids.length
  const rowHeightPx =
    Number.parseFloat(ORDER_BOOK_ROW_HEIGHT) || ORDER_BOOK_ROW_HEIGHT_PX
  const contentHeight = ORDER_BOOK_HEADER_HEIGHT_PX + totalRows * rowHeightPx
  const wrapperMinHeight = Math.max(
    ORDER_BOOK_TABLE_MIN_HEIGHT_PX,
    contentHeight,
  )

  const content = (
    <>
      {variant === "full" && <SectionHeader title="Order book" noTopPadding />}
      <SOrderBookControls>
        <Select
          value={decimalPrecision}
          onValueChange={setDecimalPrecision}
          items={[...DECIMAL_PRECISION_OPTIONS]}
        />
        <Select value={token} onValueChange={setToken} items={tokenOptions} />
      </SOrderBookControls>
      <SOrderBookTableWrapper style={{ minHeight: wrapperMinHeight }}>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>
                  {t("common:price")} ({priceAssetSymbol})
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  Size ({selectedToken.symbol})
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>
                  Total ({selectedToken.symbol})
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleAsks.map((ask, i) => (
                <SOrderBookRow key={i} type="ask" percentage={ask.percentage}>
                  <SOrderBookPrice type="ask">
                    {formatNumber(
                      isBaseDenomination
                        ? convertPrice(ask.price)
                        : roundToStep(ask.price, precisionStep),
                      "en-US",
                      {
                        minimumFractionDigits: isBaseDenomination ? 8 : priceFractionDigits,
                        maximumFractionDigits: isBaseDenomination ? 8 : priceFractionDigits,
                      },
                    )}
                  </SOrderBookPrice>
                  <SOrderBookSize>
                    {formatNumber(convertSize(ask.size, ask.price), "en-US", {
                      maximumFractionDigits: isBaseDenomination ? 2 : 0,
                    })}
                  </SOrderBookSize>
                  <SOrderBookTotal>
                    {formatNumber(convertSize(ask.total, ask.price), "en-US", {
                      maximumFractionDigits: isBaseDenomination ? 2 : 0,
                    })}
                  </SOrderBookTotal>
                </SOrderBookRow>
              ))}
              <TableRow data-orderbook-row="spread">
                <TableCell colSpan={3} sx={{ py: 0 }}>
                  <Flex align="center" justify="center" gap="base">
                    <Text fs="p6" color="text.medium">
                      Spread
                    </Text>
                    <Text fs="p6" color="text.high">
                      0.6 (0.030%)
                    </Text>
                  </Flex>
                </TableCell>
              </TableRow>
              {visibleBids.map((bid, i) => (
                <SOrderBookRow key={i} type="bid" percentage={bid.percentage}>
                  <SOrderBookPrice type="bid">
                    {formatNumber(
                      isBaseDenomination
                        ? convertPrice(bid.price)
                        : roundToStep(bid.price, precisionStep),
                      "en-US",
                      {
                        minimumFractionDigits: isBaseDenomination ? 8 : priceFractionDigits,
                        maximumFractionDigits: isBaseDenomination ? 8 : priceFractionDigits,
                      },
                    )}
                  </SOrderBookPrice>
                  <SOrderBookSize>
                    {formatNumber(convertSize(bid.size, bid.price), "en-US", {
                      maximumFractionDigits: isBaseDenomination ? 2 : 0,
                    })}
                  </SOrderBookSize>
                  <SOrderBookTotal>
                    {formatNumber(convertSize(bid.total, bid.price), "en-US", {
                      maximumFractionDigits: isBaseDenomination ? 2 : 0,
                    })}
                  </SOrderBookTotal>
                </SOrderBookRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SOrderBookTableWrapper>
    </>
  )

  if (variant === "compact") return content

  return <Paper p="xl">{content}</Paper>
}
