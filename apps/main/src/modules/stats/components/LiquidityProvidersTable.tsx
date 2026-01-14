import styled from "@emotion/styled"
import { css } from "@galacticcouncil/ui/utils"
import { DataTable, Text, Flex } from "@galacticcouncil/ui/components"
import { createColumnHelper } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import { FC, useMemo } from "react"

type LiquidityProvider = {
    id: string
    account: string
    position: string
    positionAsset: string
    totalValueLocked: string
    share: string
}

// Mock data for liquidity providers
const generateMockProviders = (): LiquidityProvider[] => {
    const providers: LiquidityProvider[] = []
    for (let i = 0; i < 45; i++) {
        providers.push({
            id: `provider-${i}`,
            account: `7PJGaV...JPqS6K`,
            position: "212 425",
            positionAsset: "HDX",
            totalValueLocked: "$1 113 698",
            share: "90%",
        })
    }
    return providers
}

const columnHelper = createColumnHelper<LiquidityProvider>()

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
  `
)

const SExternalLinkIcon = styled.div`
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`

export const LiquidityProvidersTable: FC = () => {
    const data = useMemo(() => generateMockProviders(), [])

    const columns = useMemo(() => [
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
        columnHelper.accessor("position", {
            header: "Position",
            cell: (info) => (
                <Flex gap={4} align="baseline">
                    <Text fs={13} fw={500} color="text.high">
                        {info.getValue()}
                    </Text>
                    <Text fs={13} color="text.medium">
                        {info.row.original.positionAsset}
                    </Text>
                </Flex>
            ),
        }),
        columnHelper.accessor("totalValueLocked", {
            header: "Total value locked",
            cell: (info) => (
                <Text fs={13} fw={500} color="text.high">
                    {info.getValue()}
                </Text>
            ),
        }),
        columnHelper.accessor("share", {
            header: "%Share",
            cell: (info) => (
                <Flex gap={12} align="center" justify="space-between">
                    <Text fs={13} fw={500} color="text.high">
                        {info.getValue()}
                    </Text>
                    <SExternalLinkIcon>
                        <ExternalLink size={14} />
                    </SExternalLinkIcon>
                </Flex>
            ),
        }),
    ], [])

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
