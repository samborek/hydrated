import { Box, Grid, Paper, Stack, Text, Icon } from "@galacticcouncil/ui/components"
import { Link } from "@tanstack/react-router"
import { FC, useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import { useAssets } from "@/providers/assetsProvider"
import { MultiplyActions } from "./components/MultiplyActions"
import { MultiplyStrategyOverview } from "./components/MultiplyStrategyOverview"
import { useBorrowAssetsData, useSupplyAssetsData } from "@galacticcouncil/money-market/hooks"

export type MultiplyDetailPageProps = {
    strategyId: string
}

export const MultiplyDetailPage: FC<MultiplyDetailPageProps> = ({ strategyId }) => {
    const { tokens } = useAssets()
    const { data: supplyAssets } = useSupplyAssetsData({ showAll: true })
    const { data: borrowAssets } = useBorrowAssetsData()

    // Parse strategyId (format: CollateralSymbol-DebtSymbol-Index)
    const [collateralSymbol, debtSymbol] = strategyId?.split("-") || ["DOT", "USDC"]

    const assets = useMemo(() => {
        // Fallback or empty arrays
        const sAssets = supplyAssets?.length ? supplyAssets : []
        const bAssets = borrowAssets?.length ? borrowAssets : []

        let collateral = sAssets.find(a => a.symbol === collateralSymbol) as any
        if (!collateral) {
            const token = tokens.find(t => t.symbol === collateralSymbol)
            collateral = { ...token, symbol: collateralSymbol }
        }

        let debt = bAssets.find(a => a.symbol === debtSymbol) as any
        if (!debt) {
            const token = tokens.find(t => t.symbol === debtSymbol)
            debt = { ...token, symbol: debtSymbol }
        }

        return { collateral, debt }
    }, [collateralSymbol, debtSymbol, supplyAssets, borrowAssets, tokens])

    return (
        <Stack gap={30}>
            <Link to="/borrow/multiply" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, color: 'white' }}>
                <Icon component={ArrowLeft} size={20} />
                <Text>Back to Multiply</Text>
            </Link>

            <Box>
                <Grid
                    columnTemplate={["1fr", null, "1fr 380px"]}
                    gap={20}
                    alignItems="start"
                >
                    {/* Left Panel - Overview */}
                    <MultiplyStrategyOverview
                        collateralAsset={assets.collateral}
                        debtAsset={assets.debt}
                    />

                    {/* Right Panel - Actions */}
                    <Paper p={20}>
                        <MultiplyActions
                            collateralAsset={assets.collateral}
                            debtAsset={assets.debt}
                        />
                    </Paper>
                </Grid>
            </Box>
        </Stack>
    )
}
