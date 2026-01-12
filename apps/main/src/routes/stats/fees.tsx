import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { SectionHeader } from "@galacticcouncil/ui/components"
import { FeesOverviewChart } from "@/modules/stats/components/FeesOverviewChart"
import { TradingFeesChart } from "@/modules/stats/components/TradingFeesChart"
import { LiquidityFeesChart } from "@/modules/stats/components/LiquidityFeesChart"
import { SupplyBorrowFeesChart } from "@/modules/stats/components/SupplyBorrowFeesChart"
import { HollarFeesChart } from "@/modules/stats/components/HollarFeesChart"

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`

const SSection = styled.section(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.secondary}px;
  `
)

function FeesStats() {
    return (
        <SPageContainer>
            <SectionHeader as="h1" sx={{ p: 0 }} mb={-18}>
                Fees & Revenue
            </SectionHeader>

            {/* Overview Chart - Stacked Bar Chart */}
            <SSection>
                <FeesOverviewChart />
            </SSection>

            {/* Trading Fees / Revenue Section */}
            <SSection>
                <SectionHeader>Trading Fees</SectionHeader>
                <TradingFeesChart />
            </SSection>

            {/* Liquidity Fees Section */}
            <SSection>
                <SectionHeader>Liquidity / Withdraw Fees</SectionHeader>
                <LiquidityFeesChart />
            </SSection>

            {/* Supply & Borrow Fees Section */}
            <SSection>
                <SectionHeader>Supply & Borrow Fees</SectionHeader>
                <SupplyBorrowFeesChart />
            </SSection>

            {/* Hollar Fees Section */}
            <SSection>
                <SectionHeader>Hollar Fees</SectionHeader>
                <HollarFeesChart />
            </SSection>
        </SPageContainer>
    )
}

export const Route = createFileRoute("/stats/fees")({
    component: FeesStats,
})
