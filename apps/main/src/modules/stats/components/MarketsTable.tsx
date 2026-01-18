import styled from "@emotion/styled"
import { DataTable, Flex, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css } from "@galacticcouncil/ui/utils"
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

const STableWrapper = styled.div`
  margin: 0 -16px;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: inherit;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const SAssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SProgressBar = styled.div<{ $value: number }>(
    ({ theme, $value }) => css`
    height: 8px;
    background: ${theme.surfaces.containers.dim.dimOnBg};
    border-radius: 4px;
    overflow: hidden;
    width: 100px;

    &::after {
      content: "";
      display: block;
      height: 100%;
      width: ${$value}%;
      background: linear-gradient(
        90deg,
        ${theme.details.values.positive},
        #8bc34a
      );
      border-radius: 4px;
    }
  `,
)

type Market = {
    id: string
    asset: string
    supply: string
    borrow: string
    utilization: number
    supplyApy: string
    borrowApy: string
}

// Mock data with real asset IDs
const mockMarkets: Market[] = [
    {
        id: "5",
        asset: "DOT",
        supply: "$2.5M",
        borrow: "$1.2M",
        utilization: 48,
        supplyApy: "3.2%",
        borrowApy: "5.8%",
    },
    {
        id: "22",
        asset: "USDC",
        supply: "$5.1M",
        borrow: "$3.8M",
        utilization: 75,
        supplyApy: "4.5%",
        borrowApy: "7.2%",
    },
    {
        id: "20",
        asset: "WETH",
        supply: "$1.8M",
        borrow: "$0.9M",
        utilization: 50,
        supplyApy: "2.8%",
        borrowApy: "4.9%",
    },
    {
        id: "21",
        asset: "WBTC",
        supply: "$3.2M",
        borrow: "$1.6M",
        utilization: 50,
        supplyApy: "2.5%",
        borrowApy: "4.5%",
    },
]

export const MarketsTable: FC = () => {
    const { themeProps: theme } = useTheme()
    const isMobile = useIsMobile()

    const columns: ColumnDef<Market>[] = [
        {
            accessorKey: "asset",
            header: "Asset",
            cell: ({ row }) => (
                <SAssetCell>
                    <AssetLogo id={row.original.id} size="small" />
                    <Text fw={500}>{row.original.asset}</Text>
                </SAssetCell>
            ),
        },
        {
            accessorKey: "supply",
            header: "Total Supply",
        },
        {
            accessorKey: "borrow",
            header: "Total Borrow",
        },
        {
            accessorKey: "utilization",
            header: "Utilization",
            cell: ({ getValue, row }) => (
                <Flex gap={8} align="center">
                    <SProgressBar $value={row.original.utilization} />
                    <Text fs={12}>{getValue() as number}%</Text>
                </Flex>
            ),
        },
        {
            accessorKey: "supplyApy",
            header: "Supply APY",
            cell: ({ getValue }) => (
                <Text color={theme.details.values.positive}>
                    {getValue() as string}
                </Text>
            ),
        },
        {
            accessorKey: "borrowApy",
            header: "Borrow APY",
            cell: ({ getValue }) => (
                <Text color="#FF9800">{getValue() as string}</Text>
            ),
        },
    ]

    const tableColumns = useMemo(() => {
        if (isMobile) {
            return columns.filter(col =>
                (col as any).accessorKey === 'asset' ||
                (col as any).accessorKey === 'supply' ||
                (col as any).accessorKey === 'borrow'
            )
        }
        return columns
    }, [isMobile, columns])

    return (
        <STableWrapper>
            <DataTable
                data={mockMarkets}
                columns={tableColumns}
                size="medium"
            />
        </STableWrapper>
    )
}
