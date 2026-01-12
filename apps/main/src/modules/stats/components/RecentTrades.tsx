import styled from "@emotion/styled"
import { DataTable, Flex, Text } from "@galacticcouncil/ui/components"
import { FC } from "react"
import { ColumnDef } from "@tanstack/react-table"

const STradeFlow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SAssetBadge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${({ $color }) => $color ? `${$color}20` : 'rgba(255, 255, 255, 0.1)'};
  font-size: 12px;
`

const SArrow = styled.span`
  color: rgba(255, 255, 255, 0.3);
`

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
  { account: '7PUGav...JPq5NK', fromAmount: '212.425', fromAsset: 'DOT', toAmount: '3,500', toAsset: 'HDX', value: '212.425 HDX', date: '02/01/2025, 16:21' },
  { account: '7XKRfa...LMn8PQ', fromAmount: '1,500', fromAsset: 'USDC', toAmount: '2.1', toAsset: 'DOT', value: '1,500 USDC', date: '02/01/2025, 16:18' },
  { account: '7PUGav...JPq5NK', fromAmount: '0.05', fromAsset: 'WETH', toAmount: '165', toAsset: 'USDC', value: '165 USDC', date: '02/01/2025, 16:15' },
  { account: '7BCDef...KLm9RS', fromAmount: '500', fromAsset: 'HDX', toAmount: '0.88', toAsset: 'DOT', value: '6.38 USD', date: '02/01/2025, 16:12' },
  { account: '7PQRst...YZa2BC', fromAmount: '100', fromAsset: 'USDT', toAmount: '100.05', toAsset: 'USDC', value: '100 USD', date: '02/01/2025, 16:09' },
  { account: '7DEFgh...MNp4QR', fromAmount: '2.5', fromAsset: 'DOT', toAmount: '4,100', toAsset: 'HDX', value: '18.13 USD', date: '02/01/2025, 16:05' },
  { account: '7GHIjk...OPq6ST', fromAmount: '0.001', fromAsset: 'WBTC', toAmount: '94.5', toAsset: 'USDC', value: '94.5 USDC', date: '02/01/2025, 16:02' },
  { account: '7JKLmn...RSt8UV', fromAmount: '1,000', fromAsset: 'ASTR', toAmount: '65', toAsset: 'USDC', value: '65 USDC', date: '02/01/2025, 15:58' },
  { account: '7MNOpq...UVw0XY', fromAmount: '250', fromAsset: 'GLMR', toAmount: '55', toAsset: 'USDC', value: '55 USDC', date: '02/01/2025, 15:55' },
  { account: '7PQRst...XYz2AB', fromAmount: '150', fromAsset: 'CFG', toAmount: '57', toAsset: 'USDC', value: '57 USDC', date: '02/01/2025, 15:52' },
]

const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: 'account',
    header: 'Account',
    cell: ({ getValue }) => (
      <Text color="#4CAF50">{getValue() as string}</Text>
    ),
  },
  {
    id: 'trade',
    header: '',
    cell: ({ row }) => (
      <STradeFlow>
        <SAssetBadge $color="#4CAF50">
          🟢 {row.original.fromAmount} {row.original.fromAsset}
        </SAssetBadge>
        <SArrow>→</SArrow>
        <SAssetBadge $color="#E6007A">
          🔴 {row.original.toAmount} {row.original.toAsset}
        </SAssetBadge>
      </STradeFlow>
    ),
  },
  {
    accessorKey: 'value',
    header: 'Trade Value',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => (
      <Flex align="center" gap={4}>
        <Text color="rgba(255,255,255,0.5)">{getValue() as string}</Text>
        <Text color="rgba(255,255,255,0.4)">→</Text>
      </Flex>
    ),
  },
]

export const RecentTrades: FC = () => {
  return (
    <DataTable
      data={mockTrades}
      columns={columns}
      paginated
      pageSize={5}
      size="medium"
    />
  )
}

