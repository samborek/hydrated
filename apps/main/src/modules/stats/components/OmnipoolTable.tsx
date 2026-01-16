import styled from "@emotion/styled"
import { DataTable, Flex, Text } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { useNavigate } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { FC, useMemo, useState, useEffect } from "react"
import { AssetLogo } from "@/components/AssetLogo"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

const SAssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const STableWrapper = styled.div`
  margin: 0 -16px;
  overflow-x: auto;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

type OmnipoolAsset = {
  id: string
  symbol: string
  name: string
  price: string
  tvl: string
  volume: string
  apy: string
}

// Mock data with real asset IDs - replace with real API data
const mockAssets: OmnipoolAsset[] = [
  {
    id: "5",
    symbol: "DOT",
    name: "Polkadot",
    price: "$7.25",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "0",
    symbol: "HDX",
    name: "Hydration",
    price: "$0.0123",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "22",
    symbol: "USDC",
    name: "USD Coin",
    price: "$1.00",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "12",
    symbol: "ZTG",
    name: "Zeitgeist",
    price: "$0.08",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "11",
    symbol: "iBTC",
    name: "Interlay BTC",
    price: "$94,250",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "18",
    symbol: "DAI",
    name: "Dai",
    price: "$1.00",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "10",
    symbol: "USDT",
    name: "Tether",
    price: "$1.00",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "20",
    symbol: "WETH",
    name: "Wrapped Ether",
    price: "$3,250",
    tvl: "$2,097,914",
    volume: "$2,097,914",
    apy: "0.45%",
  },
  {
    id: "21",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    price: "$94,500",
    tvl: "$1,897,914",
    volume: "$1,897,914",
    apy: "0.42%",
  },
  {
    id: "14",
    symbol: "ASTR",
    name: "Astar",
    price: "$0.065",
    tvl: "$897,914",
    volume: "$897,914",
    apy: "0.38%",
  },
  {
    id: "15",
    symbol: "GLMR",
    name: "Moonbeam",
    price: "$0.22",
    tvl: "$697,914",
    volume: "$697,914",
    apy: "0.35%",
  },
  {
    id: "16",
    symbol: "CFG",
    name: "Centrifuge",
    price: "$0.38",
    tvl: "$597,914",
    volume: "$597,914",
    apy: "0.32%",
  },
]

const columns: ColumnDef<OmnipoolAsset>[] = [
  {
    accessorKey: "symbol",
    header: "Asset",
    cell: ({ row }) => (
      <SAssetCell>
        <AssetLogo id={row.original.id} size="medium" />
        <div>
          <Text fw={500}>{row.original.symbol}</Text>
        </div>
      </SAssetCell>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "tvl",
    header: "Total Value Locked",
  },
  {
    accessorKey: "volume",
    header: "24h Volume",
  },
  {
    accessorKey: "apy",
    header: "APY",
    cell: ({ getValue }) => (
      <Flex align="center" gap={4}>
        <Text color="#45D678">{getValue() as string}</Text>
        <Text color={getToken("text.low")}>→</Text>
      </Flex>
    ),
  },
]

export const OmnipoolTable: FC = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const tableColumns = useMemo(() => {
    if (isMobile) {
      return columns.filter(col =>
        (col as any).accessorKey === 'symbol' ||
        (col as any).accessorKey === 'volume' ||
        (col as any).accessorKey === 'apy'
      )
    }
    return columns
  }, [isMobile])

  const handleRowClick = (row: OmnipoolAsset) => {
    navigate({
      to: "/stats/asset/$asset",
      params: { asset: row.symbol.toLowerCase() },
    })
  }

  return (
    <STableWrapper>
      <DataTable
        data={mockAssets}
        columns={tableColumns}
        paginated
        pageSize={5}
        size="large"
        onRowClick={handleRowClick}
      />
    </STableWrapper>
  )
}
