import { SectionHeader } from "@galacticcouncil/ui/components"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { FeesOverviewChart } from "@/modules/stats/components/FeesOverviewChart"
import { HollarFeesChart } from "@/modules/stats/components/HollarFeesChart"
import { LiquidityFeesChart } from "@/modules/stats/components/LiquidityFeesChart"
import { ProtocolRevenueFlowChart } from "@/modules/stats/components/ProtocolRevenueFlowChart"
import { SupplyBorrowFeesChart } from "@/modules/stats/components/SupplyBorrowFeesChart"
import { TradingFeesChart } from "@/modules/stats/components/TradingFeesChart"

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;

  @media (max-width: 576px) {
    gap: 8px;
  }
`

const SSection = styled.section<{ hasHeader?: boolean }>(
  ({ theme, hasHeader }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.primary}px;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;

    @media (max-width: 576px) {
      padding: ${hasHeader ? 0 : theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px;
    }
  `,
)

const SFeesOverviewGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(320px, 42vw, 620px);
    gap: ${theme.scales.paddings.l}px;
    width: 100%;
    min-width: 0;

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
  `,
)

function FeesStats() {
  return (
    <SPageContainer>
      {/* Overview Chart - Stacked Bar Chart + Revenue Flow */}
      <div>
        <SectionHeader>Fees & Revenue</SectionHeader>
        <SFeesOverviewGrid>
          <SSection>
            <FeesOverviewChart />
          </SSection>
          <SSection>
            <ProtocolRevenueFlowChart title="Where fees go" />
          </SSection>
        </SFeesOverviewGrid>
      </div>

      {/* Trading Fees / Revenue Section */}
      <div>
        <SectionHeader>Trading Fees</SectionHeader>
        <SSection>
          <TradingFeesChart />
        </SSection>
      </div>

      {/* Liquidity Fees Section */}
      <div>
        <SectionHeader>Liquidity / Withdraw Fees</SectionHeader>
        <SSection>
          <LiquidityFeesChart />
        </SSection>
      </div>

      {/* Supply & Borrow Fees Section */}
      <div>
        <SectionHeader>Supply & Borrow Fees</SectionHeader>
        <SSection>
          <SupplyBorrowFeesChart />
        </SSection>
      </div>

      {/* Hollar Fees Section */}
      <div>
        <SectionHeader>Hollar Fees</SectionHeader>
        <SSection>
          <HollarFeesChart />
        </SSection>
      </div>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/fees")({
  component: FeesStats,
})
