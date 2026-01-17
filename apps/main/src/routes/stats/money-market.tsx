import {
  SectionHeader,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { MarketsTable } from "@/modules/stats/components/MarketsTable"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { SupplyBorrowChart } from "@/modules/stats/components/SupplyBorrowChart"

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

    @media (max-width: 576px) {
      padding: ${hasHeader ? 0 : theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px;
    }
  `,
)

function MoneyMarketStats() {
  const { themeProps: theme } = useTheme()
  const stats = [
    {
      label: "Total Value Locked",
      value: "$12.6M",
      valueColor: theme.colors.utility.warningPrimary["500"],
    },
    {
      label: "Total Supplied",
      value: "$12.6M",
      valueColor: theme.details.values.positive,
    },
    {
      label: "Total Borrowed",
      value: "$7.5M",
      valueColor: theme.colors.utility.warningPrimary["500"],
    },
    {
      label: "Liquidations (24h)",
      value: "$45,230",
      valueColor: theme.details.values.negative,
    },
  ]

  return (
    <SPageContainer>
      <StatsHeader stats={stats} />

      <div>
        <SectionHeader>Supply / Borrow History</SectionHeader>
        <SSection>
          <SupplyBorrowChart />
      </SSection>
      </div>

      <div>
        <SectionHeader>Markets</SectionHeader>
        <SSection style={{ paddingTop: 0, overflow: "hidden" }}>
        <MarketsTable />
      </SSection>
      </div>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/money-market")({
  component: MoneyMarketStats,
})
