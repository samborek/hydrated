import styled from "@emotion/styled"
import { DataTable, Flex, Text } from "@galacticcouncil/ui/components"
import { css } from "@galacticcouncil/ui/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import { FC, useMemo } from "react"

type Transaction = {
  id: string
  account: string
  action: string
  volume: string
  date: string
}

// Mock data for transactions
const generateMockTransactions = (): Transaction[] => {
  const actions = ["Swap", "Add liquidity", "Remove liquidity", "Swap", "Swap"]
  const transactions: Transaction[] = []
  for (let i = 0; i < 20; i++) {
    transactions.push({
      id: `tx-${i}`,
      account: `7PJGaV...JPqS6K`,
      action: actions[i % actions.length]!,
      volume: "$1,234.56",
      date: "02/01/2025, 16:21",
    })
  }
  return transactions
}

const columnHelper = createColumnHelper<Transaction>()

const STableWrapper = styled.div`
  margin: 0 -16px;
`

const SAccountCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SAccountIcon = styled.div(
  ({ theme }) => css`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.surfaces.containers.low.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  `,
)

const SExternalLinkIcon = styled.div`
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const TransactionsTable: FC = () => {
  const data = useMemo(() => generateMockTransactions(), [])

  const columns = useMemo(
    () => [
      columnHelper.accessor("account", {
        header: "Account",
        cell: (info) => (
          <SAccountCell>
            <SAccountIcon>👤</SAccountIcon>
            <Text fs={13} color="text.high">
              {info.getValue()}
            </Text>
          </SAccountCell>
        ),
      }),
      columnHelper.accessor("action", {
        header: "Action",
        cell: (info) => (
          <Text fs={13} color="text.high">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("volume", {
        header: "Volume",
        cell: (info) => (
          <Text fs={13} fw={500} color="text.high">
            {info.getValue()}
          </Text>
        ),
      }),
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => (
          <Flex gap={12} align="center" justify="space-between">
            <Text fs={13} color="text.medium">
              {info.getValue()}
            </Text>
            <SExternalLinkIcon>
              <ExternalLink size={14} />
            </SExternalLinkIcon>
          </Flex>
        ),
      }),
    ],
    [],
  )

  return (
    <STableWrapper>
      <DataTable
        data={data}
        columns={columns}
        paginated
        pageSize={10}
        size="medium"
      />
    </STableWrapper>
  )
}
