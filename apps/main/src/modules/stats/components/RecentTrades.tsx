import styled from "@emotion/styled"
import { ArrowRightLong } from "@galacticcouncil/ui/assets/icons"
import {
  Button,
  DataTable,
  Flex,
  Icon,
  Table,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils"
import { ColumnDef, SortDirection, SortingState } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FC, useMemo, useState } from "react"

import { AssetLogo } from "@/components/AssetLogo"

const STableWrapper = styled.div`
  margin: 0 -16px;
  border-radius: inherit;
  overflow: hidden;
`

const SDesktopView = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`

const SMobileView = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
  }
`

const SMobileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.details.separators};

  &:last-child {
    border-bottom: none;
  }
`

// Asset ID mapping for logos
const ASSET_IDS: Record<string, string> = {
  DOT: "5",
  HDX: "0",
  USDC: "22",
  USDT: "10",
  WETH: "20",
  WBTC: "11",
  ASTR: "14",
  GLMR: "15",
  CFG: "16",
}

// Swap flow component matching trade module pattern
const SwapFlow: FC<{
  fromAmount: string
  fromAsset: string
  toAmount: string
  toAsset: string
}> = ({ fromAmount, fromAsset, toAmount, toAsset }) => (
  <Flex gap={12} align="center">
    <Flex gap={getTokenPx("scales.paddings.s")} align="center">
      <AssetLogo id={ASSET_IDS[fromAsset] || "0"} size="small" />
      <Text fw={500} fs={12} color={getToken("text.high")}>
        {fromAmount} {fromAsset}
      </Text>
    </Flex>
    <Icon
      size={16}
      component={ArrowRightLong}
      color={getToken("icons.onContainer")}
    />
    <Flex gap={getTokenPx("scales.paddings.s")} align="center">
      <AssetLogo id={ASSET_IDS[toAsset] || "0"} size="small" />
      <Text fw={500} fs={12} color={getToken("text.high")}>
        {toAmount} {toAsset}
      </Text>
    </Flex>
  </Flex>
)

type Trade = {
  account: string
  fromAmount: string
  fromAsset: string
  toAmount: string
  toAsset: string
  value: number // USD value for sorting
  date: string
}

// Mock data - replace with real API
const mockTrades: Trade[] = [
  {
    account: "7PUGav...JPq5NK",
    fromAmount: "212.425",
    fromAsset: "DOT",
    toAmount: "3,500",
    toAsset: "HDX",
    value: 1549.7,
    date: "02/01/2025, 16:21",
  },
  {
    account: "7XKRfa...LMn8PQ",
    fromAmount: "1,500",
    fromAsset: "USDC",
    toAmount: "2.1",
    toAsset: "DOT",
    value: 1500.0,
    date: "02/01/2025, 16:18",
  },
  {
    account: "7PUGav...JPq5NK",
    fromAmount: "0.05",
    fromAsset: "WETH",
    toAmount: "165",
    toAsset: "USDC",
    value: 165.0,
    date: "02/01/2025, 16:15",
  },
  {
    account: "7BCDef...KLm9RS",
    fromAmount: "500",
    fromAsset: "HDX",
    toAmount: "0.88",
    toAsset: "DOT",
    value: 6.38,
    date: "02/01/2025, 16:12",
  },
  {
    account: "7PQRst...YZa2BC",
    fromAmount: "100",
    fromAsset: "USDT",
    toAmount: "100.05",
    toAsset: "USDC",
    value: 100.0,
    date: "02/01/2025, 16:09",
  },
  {
    account: "7DEFgh...MNp4QR",
    fromAmount: "2.5",
    fromAsset: "DOT",
    toAmount: "4,100",
    toAsset: "HDX",
    value: 18.13,
    date: "02/01/2025, 16:05",
  },
  {
    account: "7GHIjk...OPq6ST",
    fromAmount: "0.001",
    fromAsset: "WBTC",
    toAmount: "94.5",
    toAsset: "USDC",
    value: 94.5,
    date: "02/01/2025, 16:02",
  },
  {
    account: "7JKLmn...RSt8UV",
    fromAmount: "1,000",
    fromAsset: "ASTR",
    toAmount: "65",
    toAsset: "USDC",
    value: 65.0,
    date: "02/01/2025, 15:58",
  },
  {
    account: "7MNOpq...UVw0XY",
    fromAmount: "250",
    fromAsset: "GLMR",
    toAmount: "55",
    toAsset: "USDC",
    value: 55.0,
    date: "02/01/2025, 15:55",
  },
  {
    account: "7PQRst...XYz2AB",
    fromAmount: "150",
    fromAsset: "CFG",
    toAmount: "57",
    toAsset: "USDC",
    value: 57.0,
    date: "02/01/2025, 15:52",
  },
  {
    account: "7ABCde...FGh1IJ",
    fromAmount: "5.0",
    fromAsset: "DOT",
    toAmount: "8,200",
    toAsset: "HDX",
    value: 36.45,
    date: "02/01/2025, 15:48",
  },
  {
    account: "7KLMno...PQr2ST",
    fromAmount: "0.02",
    fromAsset: "WETH",
    toAmount: "66",
    toAsset: "USDC",
    value: 66.0,
    date: "02/01/2025, 15:45",
  },
  {
    account: "7UVWxy...ZAb3CD",
    fromAmount: "2,000",
    fromAsset: "HDX",
    toAmount: "3.5",
    toAsset: "DOT",
    value: 25.52,
    date: "02/01/2025, 15:42",
  },
  {
    account: "7EFGhi...JKl4MN",
    fromAmount: "500",
    fromAsset: "USDC",
    toAmount: "0.69",
    toAsset: "DOT",
    value: 500.0,
    date: "02/01/2025, 15:38",
  },
  {
    account: "7OPQrs...TUv5WX",
    fromAmount: "0.0005",
    fromAsset: "WBTC",
    toAmount: "47.25",
    toAsset: "USDC",
    value: 47.25,
    date: "02/01/2025, 15:35",
  },
]

const formatUsdValue = (value: number): string => {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export const RecentTrades: FC = () => {
  const { themeProps: theme } = useTheme()
  const [sorting, setSorting] = useState<SortingState>([])
  const [mobilePage, setMobilePage] = useState(1)
  const pageSize = 10

  const toggleSort = (id: string) => {
    setSorting((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (!existing) return [{ id, desc: false }]
      if (!existing.desc) return [{ id, desc: true }]
      return []
    })
  }

  const getSortDirection = (id: string): false | SortDirection => {
    const entry = sorting.find((item) => item.id === id)
    if (!entry) return false
    return entry.desc ? "desc" : "asc"
  }

  const sortedMobileTrades = useMemo(() => {
    const sortEntry = sorting[0]
    if (!sortEntry) return mockTrades

    return [...mockTrades].sort((a, b) => {
      let comparison = 0
      if (sortEntry.id === "value") {
        comparison = a.value - b.value
      } else if (sortEntry.id === "account") {
        comparison = a.account.localeCompare(b.account)
      }
      return sortEntry.desc ? -comparison : comparison
    })
  }, [sorting])

  const mobileTrades = useMemo(() => {
    const start = (mobilePage - 1) * pageSize
    const end = start + pageSize
    return sortedMobileTrades.slice(start, end)
  }, [mobilePage, sortedMobileTrades])

  const totalMobilePages = Math.ceil(sortedMobileTrades.length / pageSize)

  const columns: ColumnDef<Trade>[] = [
    {
      accessorKey: "account",
      header: "Account",
      cell: ({ getValue }) => (
        <Text color={theme.details.values.positive}>
          {getValue() as string}
        </Text>
      ),
    },
    {
      id: "trade",
      header: "",
      cell: ({ row }) => (
        <SwapFlow
          fromAmount={row.original.fromAmount}
          fromAsset={row.original.fromAsset}
          toAmount={row.original.toAmount}
          toAsset={row.original.toAsset}
        />
      ),
    },
    {
      accessorKey: "value",
      header: "Trade Value",
      cell: ({ getValue }) => formatUsdValue(getValue() as number),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue }) => (
        <Flex align="center" gap={4}>
          <Text color={theme.text.medium}>{getValue() as string}</Text>
          <Text color={theme.text.low}>→</Text>
        </Flex>
      ),
    },
  ]

  return (
    <STableWrapper>
      <SDesktopView>
        <DataTable
          data={mockTrades}
          columns={columns}
          paginated
          pageSize={pageSize}
          size="large"
          onRowClick={() => {}}
          sorting={sorting}
          onSortingChange={setSorting}
          enableSortingRemoval
        />
      </SDesktopView>
      <SMobileView>
        <TableContainer
          sx={{
            mb: theme.scales.paddings.s,
            borderBottom: `1px solid ${theme.details.borders}`,
          }}
        >
          <Table size="large" borderless>
            <TableHeader>
              <TableRow>
                <TableHead
                  canSort
                  sortDirection={getSortDirection("account")}
                  onSort={() => toggleSort("account")}
                  style={{ width: "40%" }}
                >
                  Trade
                </TableHead>
                <TableHead
                  canSort
                  sortDirection={getSortDirection("value")}
                  onSort={() => toggleSort("value")}
                  style={{ textAlign: "right" }}
                >
                  Value
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </TableContainer>
        {mobileTrades.map((trade, i) => (
          <SMobileItem key={i}>
            <Flex direction="column" gap={6}>
              {/* Asset Pair */}
              <SwapFlow
                fromAmount={trade.fromAmount}
                fromAsset={trade.fromAsset}
                toAmount={trade.toAmount}
                toAsset={trade.toAsset}
              />
              {/* Date */}
              <Text fs={12} color={theme.text.low}>
                {trade.date}
              </Text>
            </Flex>
            {/* Value */}
            <Text
              fs={13}
              fw={500}
              color="text.high"
              style={{ whiteSpace: "nowrap", marginLeft: 12 }}
            >
              {formatUsdValue(trade.value)}
            </Text>
          </SMobileItem>
        ))}
        {totalMobilePages > 1 && (
          <Flex gap={8} justify="center" sx={{ mt: 16 }}>
            <Button
              size="small"
              variant="tertiary"
              outline
              disabled={mobilePage === 1}
              onClick={() => setMobilePage((p) => p - 1)}
              sx={{ px: 10 }}
            >
              <Icon
                size={16}
                component={ChevronLeft}
                display={["block", "none"]}
              />
              <Text as="span" display={["none", "inline"]}>
                Prev
              </Text>
            </Button>
            <Text fs={14} color="text.medium" sx={{ alignSelf: "center" }}>
              Page {mobilePage} of {totalMobilePages}
            </Text>
            <Button
              size="small"
              variant="tertiary"
              outline
              disabled={mobilePage === totalMobilePages}
              onClick={() => setMobilePage((p) => p + 1)}
              sx={{ px: 10 }}
            >
              <Text as="span" display={["none", "inline"]}>
                Next
              </Text>
              <Icon
                size={16}
                component={ChevronRight}
                display={["block", "none"]}
              />
            </Button>
          </Flex>
        )}
      </SMobileView>
    </STableWrapper>
  )
}
