import { SectionHeader } from "@galacticcouncil/ui/components"
import { css, styled } from "@galacticcouncil/ui/utils"
import { useTheme } from "@galacticcouncil/ui/theme"
import { createFileRoute } from "@tanstack/react-router"

import { MainContent } from "@/modules/layout/components/Content"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"
import { TreasuryCompositionChart } from "@/modules/stats/components/TreasuryCompositionChart"
import { TreasuryAssetsTable } from "@/modules/stats/components/TreasuryAssetsTable"

const SPageContainer = styled(MainContent)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;

  @media (max-width: 576px) {
    gap: 8px;
  }
`

const SSection = styled.section(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.primary}px;

    @media (max-width: 576px) {
      padding: ${theme.containers.paddings.secondary}px;
    }
  `,
)

const SDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.details.borders};
  margin: 4px 0;
`

function TreasuryStats() {
  const { themeProps: theme } = useTheme()

  const treasuryColor = theme.secondaryColors.pink.coralPink

  const stats = [
    {
      label: "Total Treasury Value",
      value: "$13.3M",
      valueColor: treasuryColor,
    },
    { label: "LP Positions Value", value: "$2.0M" },
    { label: "Staked Assets Value", value: "$225K" },
  ]

  return (
    <SPageContainer>
      <StatsHeader stats={stats} />

      <div>
        <SectionHeader>Treasury</SectionHeader>

        <SSection style={{ marginTop: 16 }}>
          <TreasuryCompositionChart />
          <SDivider style={{ margin: "24px 0" }} />
          <TreasuryChart title="Treasury Value History" value="$13.3M" />
        </SSection>
      </div>

      <div>
        <SectionHeader>Treasury Assets</SectionHeader>
        <SSection style={{ marginTop: 16 }}>
          <TreasuryAssetsTable />
        </SSection>
      </div>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/treasury")({
  component: TreasuryStats,
})
