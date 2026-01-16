import styled from "@emotion/styled"
import { ArrowRightLong } from "@galacticcouncil/ui/assets/icons"
import { DataTable, Flex, Icon, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils"
import { ColumnDef } from "@tanstack/react-table"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"

const STableWrapper = styled.div`
  margin: 0 -16px;
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
  value: string
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
    value: "212.425 HDX",
    date: "02/01/2025, 16:21",
  },
  {
    account: "7XKRfa...LMn8PQ",
    fromAmount: "1,500",
    fromAsset: "USDC",
    toAmount: "2.1",
    toAsset: "DOT",
    value: "1,500 USDC",
    date: "02/01/2025, 16:18",
  },
  {
    account: "7PUGav...JPq5NK",
    fromAmount: "0.05",
    fromAsset: "WETH",
    toAmount: "165",
    toAsset: "USDC",
    value: "165 USDC",
    date: "02/01/2025, 16:15",
  },
  {
    account: "7BCDef...KLm9RS",
    fromAmount: "500",
    fromAsset: "HDX",
    toAmount: "0.88",
    toAsset: "DOT",
    value: "6.38 USD",
    date: "02/01/2025, 16:12",
  },
  {
    account: "7PQRst...YZa2BC",
    fromAmount: "100",
    fromAsset: "USDT",
    toAmount: "100.05",
    toAsset: "USDC",
    value: "100 USD",
    date: "02/01/2025, 16:09",
  },
  {
    account: "7DEFgh...MNp4QR",
    fromAmount: "2.5",
    fromAsset: "DOT",
    toAmount: "4,100",
    toAsset: "HDX",
    value: "18.13 USD",
    date: "02/01/2025, 16:05",
  },
  {
    account: "7GHIjk...OPq6ST",
    fromAmount: "0.001",
    fromAsset: "WBTC",
    toAmount: "94.5",
    toAsset: "USDC",
    value: "94.5 USDC",
    date: "02/01/2025, 16:02",
  },
  {
    account: "7JKLmn...RSt8UV",
    fromAmount: "1,000",
    fromAsset: "ASTR",
    toAmount: "65",
    toAsset: "USDC",
    value: "65 USDC",
    date: "02/01/2025, 15:58",
  },
  {
    account: "7MNOpq...UVw0XY",
    fromAmount: "250",
    fromAsset: "GLMR",
    toAmount: "55",
    toAsset: "USDC",
    value: "55 USDC",
    date: "02/01/2025, 15:55",
  },
  {
    account: "7PQRst...XYz2AB",
    fromAmount: "150",
    fromAsset: "CFG",
    toAmount: "57",
    toAsset: "USDC",
    value: "57 USDC",
    date: "02/01/2025, 15:52",
  },
]

export const RecentTrades: FC = () => {
  const { themeProps: theme } = useTheme()

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
      <DataTable
        data={mockTrades}
        columns={columns}
        paginated
        pageSize={5}
        size="large"
        onRowClick={() => {}}
      />
    </STableWrapper>
  )
}
