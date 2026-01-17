import { SectionHeader } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { FeesOverviewChart } from "@/modules/stats/components/FeesOverviewChart"
import { HollarFeesChart } from "@/modules/stats/components/HollarFeesChart"
import { LiquidityFeesChart } from "@/modules/stats/components/LiquidityFeesChart"
import { SupplyBorrowFeesChart } from "@/modules/stats/components/SupplyBorrowFeesChart"
import { TradingFeesChart } from "@/modules/stats/components/TradingFeesChart"

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`

const SSection = styled.section<{ hasHeader?: boolean }>(
  ({ theme, hasHeader }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.primary}px;

    @media (max-width: 576px) {
      padding: ${hasHeader ? 0 : theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px;
    }
  `,
)

function FeesStats() {
  const { themeProps: theme } = useTheme()

  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-18}>
        Fees & Revenue
      </SectionHeader>

      {/* Overview Chart - Stacked Bar Chart */}
      <SSection hasHeader style={{ paddingBottom: theme.scales.paddings.m }}>
        <FeesOverviewChart />
      </SSection>

      {/* Trading Fees / Revenue Section */}
      <SSection hasHeader>
        <SectionHeader>Trading Fees</SectionHeader>
        <TradingFeesChart />
      </SSection>

      {/* Liquidity Fees Section */}
      <SSection hasHeader>
        <SectionHeader>Liquidity / Withdraw Fees</SectionHeader>
        <LiquidityFeesChart />
      </SSection>

      {/* Supply & Borrow Fees Section */}
      <SSection hasHeader>
        <SectionHeader>Supply & Borrow Fees</SectionHeader>
        <SupplyBorrowFeesChart />
      </SSection>

      {/* Hollar Fees Section */}
      <SSection hasHeader>
        <SectionHeader>Hollar Fees</SectionHeader>
        <HollarFeesChart />
      </SSection>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/fees")({
  component: FeesStats,
})
