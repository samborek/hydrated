import { useBorrowAssetsData, useSupplyAssetsData } from "@galacticcouncil/money-market/hooks"
import { Button, DataTable, Flex, Grid, SectionHeader, Text } from "@galacticcouncil/ui/components"
import { useBreakpoints, useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { FC, useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { AssetLogo } from "@/components/AssetLogo"
import { getAssetIdFromAddress } from "@galacticcouncil/utils"

const SSection = styled.section(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.secondary}px;
    margin-bottom: 20px;
  `
)

const SLoopCard = styled.div(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
    }
  `
)

const SBadge = styled.div(
    ({ theme }) => css`
    background: ${theme.colors.azureBlue[500]};
    color: ${theme.colors.azureBlue[900]};
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    width: fit-content;
  `
)

// Mock Strategies Config
const STRATEGIES = [
    { collateral: 'DOT', debt: 'USDC', leverage: 3 },
    { collateral: 'WETH', debt: 'USDC', leverage: 2.5 },
    { collateral: 'WBTC', debt: 'USDC', leverage: 2.5 },
    { collateral: 'DOT', debt: 'USDT', leverage: 3 },
]

type StrategyRow = {
    id: string
    collateralAsset: any
    debtAsset: any
    leverage: number
    netApy: number // Mocked calculation
}

export const MultiplyView: FC = () => {
    const { themeProps: theme } = useTheme()
    const { gte } = useBreakpoints()

    const { data: supplyAssets } = useSupplyAssetsData({ showAll: true })
    const { data: borrowAssets } = useBorrowAssetsData()

    const strategies = useMemo(() => {
        if (!supplyAssets || !borrowAssets) return []

        return STRATEGIES.map((s, idx) => {
            const collateral = supplyAssets.find(a => a.symbol === s.collateral)
            const debt = borrowAssets.find(a => a.symbol === s.debt)

            if (!collateral || !debt) return null

            // Mock APY calc: SupplyAPY + (SupplyAPY - BorrowAPY) * (Lev - 1)
            // This is a rough estimation of "Looping" APY
            const supplyApy = Number(collateral.supplyAPY) || 0
            const borrowApy = Number(debt.variableBorrowRate) || 0
            const netApy = supplyApy + (supplyApy - borrowApy) * (s.leverage - 1)

            return {
                id: `${s.collateral}-${s.debt}-${idx}`,
                collateralAsset: collateral,
                debtAsset: debt,
                leverage: s.leverage,
                netApy
            }
        }).filter(Boolean) as StrategyRow[]
    }, [supplyAssets, borrowAssets])

    const columnHelper = createColumnHelper<StrategyRow>()

    const columns = [
        columnHelper.accessor("collateralAsset", {
            header: "Strategy",
            cell: ({ row }) => {
                const s = row.original
                return (
                    <Flex align="center" gap={12}>
                        <Flex>
                            <AssetLogo id={getAssetIdFromAddress(s.collateralAsset.underlyingAsset)} size="medium" />
                            <div style={{ marginLeft: -10 }}>
                                <AssetLogo id={getAssetIdFromAddress(s.debtAsset.underlyingAsset)} size="medium" />
                            </div>
                        </Flex>
                        <Flex direction="column">
                            <Text fw={600} fs={14}>{s.collateralAsset.symbol} / {s.debtAsset.symbol}</Text>
                            <Text fs={12} color={theme.text.low}>Loop {s.collateralAsset.symbol}</Text>
                        </Flex>
                    </Flex>
                )
            }
        }),
        columnHelper.accessor("netApy", {
            header: "Net APY",
            cell: ({ getValue }) => (
                <Text color={theme.details.values.positive} fw={600}>
                    {getValue().toFixed(2)}%
                </Text>
            )
        }),
        columnHelper.accessor("leverage", {
            header: "Max Leverage",
            cell: ({ getValue }) => (
                <Text>{getValue()}x</Text>
            )
        }),
        columnHelper.display({
            id: "actions",
            header: "",
            cell: () => (
                <Button size="small" variant="secondary">Multiply</Button>
            )
        })
    ]

    return (
        <Flex direction="column" gap={24}>
            {/* Featured Loops */}
            <div>
                <Text fs={18} fw={600} mb={16} font="primary">Featured Loops</Text>
                <Grid columns={gte("md") ? 3 : 1} gap={16}>
                    {strategies.slice(0, 3).map((s) => (
                        <SLoopCard key={"feat-" + s.id}>
                            <Flex justify="space-between" align="center">
                                <Flex>
                                    <AssetLogo id={getAssetIdFromAddress(s.collateralAsset.underlyingAsset)} size="large" />
                                    <div style={{ marginLeft: -12 }}>
                                        <AssetLogo id={getAssetIdFromAddress(s.debtAsset.underlyingAsset)} size="large" />
                                    </div>
                                </Flex>
                                <SBadge>Up to {s.leverage}x</SBadge>
                            </Flex>
                            <div style={{ marginTop: 8 }}>
                                <Text fs={18} fw={600}>{s.collateralAsset.symbol} Loop</Text>
                                <Text fs={13} color={theme.text.low}>Borrow {s.debtAsset.symbol} to leverage {s.collateralAsset.symbol}</Text>
                            </div>
                            <Flex justify="space-between" align="flex-end" mt={12}>
                                <div>
                                    <Text fs={11} color={theme.text.low} mb={2}>Net APY</Text>
                                    <Text fs={20} fw={700} color={theme.details.values.positive} style={{ fontFamily: 'Gazpacho' }}>
                                        {s.netApy.toFixed(2)}%
                                    </Text>
                                </div>
                            </Flex>
                        </SLoopCard>
                    ))}
                </Grid>
            </div>

            {/* Strategies List */}
            <SSection>
                <SectionHeader>Strategies</SectionHeader>
                <DataTable
                    data={strategies}
                    columns={columns}
                    onRowClick={() => { }} // TODO: Navigate to details
                />
            </SSection>
        </Flex>
    )
}
