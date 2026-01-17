import {
  DataTable,
  Paper,
  TableContainer,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"

import { AssetLogo } from "@/components/AssetLogo"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 0 12px 0;
`

const SAssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SAssetLogoStack = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:first-of-type) {
    margin-left: -8px;
  }
`

// Color-coded section title component
const SSectionTitle = styled.h2<{ color?: string }>(
  ({ theme, color }) => css`
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: ${theme.fontFamilies1.primary};
    font-size: 20px;
    font-weight: 500;
    color: ${theme.text.high};
    margin: 0;
    padding-top: 12px;
    padding-bottom: 4px;

    &::before {
      content: "";
      width: 4px;
      height: 24px;
      background: ${color || theme.colors.skyBlue["600"]};
      border-radius: 2px;
    }
  `,
)

// Asset ID mapping
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
  HUSDT: "10",
  HUSDC: "22",
  HUSDe: "22",
  HUSDs: "22",
  vDOT: "5",
  iBTC: "11",
}

// Types
type OmnipoolAsset = {
  id: string
  symbol: string
  tvl: string
  volume24h: string
  fees: string
  apy: string
}

type PoolData = {
  name: string
  assets: string[]
  tvl: string
  volume24h: string
  fees: string
  apy: string
}

// Omnipool assets data
const omnipoolAssets: OmnipoolAsset[] = [
  {
    id: "5",
    symbol: "DOT",
    tvl: "$2.8M",
    volume24h: "$850K",
    fees: "$4,250",
    apy: "8.2%",
  },
  {
    id: "0",
    symbol: "HDX",
    tvl: "$1.5M",
    volume24h: "$320K",
    fees: "$1,600",
    apy: "12.5%",
  },
  {
    id: "22",
    symbol: "USDC",
    tvl: "$2.1M",
    volume24h: "$520K",
    fees: "$2,600",
    apy: "5.8%",
  },
  {
    id: "20",
    symbol: "WETH",
    tvl: "$1.8M",
    volume24h: "$280K",
    fees: "$1,400",
    apy: "4.2%",
  },
  {
    id: "11",
    symbol: "WBTC",
    tvl: "$1.2M",
    volume24h: "$180K",
    fees: "$900",
    apy: "3.5%",
  },
  {
    id: "14",
    symbol: "ASTR",
    tvl: "$450K",
    volume24h: "$95K",
    fees: "$475",
    apy: "15.2%",
  },
  {
    id: "15",
    symbol: "GLMR",
    tvl: "$320K",
    volume24h: "$68K",
    fees: "$340",
    apy: "11.8%",
  },
]

// Stableswap pools data
const stableswapPools: PoolData[] = [
  {
    name: "4pool",
    assets: ["HUSDT", "HUSDC", "HUSDe", "HUSDs"],
    tvl: "$3.2M",
    volume24h: "$1.2M",
    fees: "$2,400",
    apy: "4.2%",
  },
  {
    name: "USDC-USDT",
    assets: ["USDC", "USDT"],
    tvl: "$2.0M",
    volume24h: "$600K",
    fees: "$1,200",
    apy: "3.1%",
  },
]

// XYK pools data
const xykPools: PoolData[] = [
  {
    name: "HDX-DOT",
    assets: ["HDX", "DOT"],
    tvl: "$800K",
    volume24h: "$200K",
    fees: "$600",
    apy: "12.5%",
  },
  {
    name: "HDX-USDC",
    assets: ["HDX", "USDC"],
    tvl: "$600K",
    volume24h: "$150K",
    fees: "$450",
    apy: "9.8%",
  },
  {
    name: "DOT-USDC",
    assets: ["DOT", "USDC"],
    tvl: "$400K",
    volume24h: "$50K",
    fees: "$150",
    apy: "5.2%",
  },
  {
    name: "WETH-USDC",
    assets: ["WETH", "USDC"],
    tvl: "$350K",
    volume24h: "$85K",
    fees: "$255",
    apy: "7.8%",
  },
]

// Column definitions
const omnipoolColumns: ColumnDef<OmnipoolAsset>[] = [
  {
    accessorKey: "symbol",
    header: "Asset",
    cell: ({ row }) => (
      <SAssetCell>
        <AssetLogo id={row.original.id} size="medium" />
        <Text fw={500}>{row.original.symbol}</Text>
      </SAssetCell>
    ),
  },
  { accessorKey: "tvl", header: "TVL" },
  { accessorKey: "volume24h", header: "24h Volume" },
  { accessorKey: "fees", header: "24h Fees" },
  {
    accessorKey: "apy",
    header: "APY",
    cell: ({ getValue }) => <Text color="#45D678">{getValue() as string}</Text>,
  },
]

const poolColumns: ColumnDef<PoolData>[] = [
  {
    accessorKey: "name",
    header: "Pool",
    cell: ({ row }) => (
      <SAssetCell>
        <SAssetLogoStack>
          {row.original.assets.map((asset) => (
            <AssetLogo key={asset} id={ASSET_IDS[asset] || "0"} size="small" />
          ))}
        </SAssetLogoStack>
        <Text fw={500}>{row.original.name}</Text>
      </SAssetCell>
    ),
  },
  { accessorKey: "tvl", header: "TVL" },
  { accessorKey: "volume24h", header: "24h Volume" },
  { accessorKey: "fees", header: "24h Fees" },
  {
    accessorKey: "apy",
    header: "APY",
    cell: ({ getValue }) => <Text color="#45D678">{getValue() as string}</Text>,
  },
]

function AMMStats() {
  const { themeProps: theme } = useTheme()
  const omnipoolStats = [
    {
      label: "Total Value Locked",
      value: "$10.75M",
      valueColor: theme.colors.skyBlue["600"],
    },
    { label: "24h Volume", value: "$2.36M" },
    { label: "Total Volume", value: "$892.5M" },
    {
      label: "24h Fees",
      value: "$11,775",
      valueColor: theme.details.values.positive,
    },
  ]

  const stableswapStats = [
    {
      label: "Total Value Locked",
      value: "$5.2M",
      valueColor: theme.colors.successGreen["500"],
    },
    { label: "24h Volume", value: "$1.8M" },
    { label: "Total Volume", value: "$245.8M" },
    {
      label: "24h Fees",
      value: "$3,600",
      valueColor: theme.details.values.positive,
    },
  ]

  const xykStats = [
    {
      label: "Total Value Locked",
      value: "$2.15M",
      valueColor: theme.colors.lavender["700"],
    },
    { label: "24h Volume", value: "$485K" },
    { label: "Total Volume", value: "$58.2M" },
    {
      label: "24h Fees",
      value: "$1,455",
      valueColor: theme.details.values.positive,
    },
  ]

  return (
    <SPageContainer>
      {/* ===== OMNIPOOL SECTION ===== */}
      <SSectionTitle color={theme.colors.skyBlue["600"]}>
        Omnipool
      </SSectionTitle>

      <StatsHeader stats={omnipoolStats} />

      <TableContainer as={Paper}>
        <DataTable
          data={omnipoolAssets}
          columns={omnipoolColumns}
          paginated
          pageSize={5}
          size="large"
        />
      </TableContainer>

      {/* ===== STABLESWAP SECTION ===== */}
      <SSectionTitle color={theme.colors.successGreen["500"]}>
        Stableswap
      </SSectionTitle>

      <StatsHeader stats={stableswapStats} />

      <TableContainer as={Paper}>
        <DataTable data={stableswapPools} columns={poolColumns} size="large" />
      </TableContainer>

      {/* ===== XYK POOLS SECTION ===== */}
      <SSectionTitle color={theme.colors.lavender["700"]}>
        Isolated Pools (XYK)
      </SSectionTitle>

      <StatsHeader stats={xykStats} />

      <TableContainer as={Paper}>
        <DataTable data={xykPools} columns={poolColumns} size="large" />
      </TableContainer>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/amm")({
  component: AMMStats,
})
