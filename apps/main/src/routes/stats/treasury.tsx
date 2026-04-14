import { SectionHeader } from "@galacticcouncil/ui/components"
import { css, styled } from "@galacticcouncil/ui/utils"
import { useTheme } from "@galacticcouncil/ui/theme"
import { createFileRoute } from "@tanstack/react-router"

import { MainContent } from "@/modules/layout/components/Content"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"

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

function TreasuryStats() {
  const { themeProps: theme } = useTheme()

  const treasuryColor = theme.colors.accent?.["600"] || theme.details.values.positive

  const stats = [
    {
      label: "Total Treasury Value",
      value: "$2,852,500",
      valueColor: treasuryColor,
    },
    { label: "LP Positions Value", value: "$1,200,000" },
    { label: "Staked Assets Value", value: "$225,000" },
  ]

  return (
    <SPageContainer>
      <StatsHeader stats={stats} />

      <div>
        <SectionHeader>Treasury</SectionHeader>
        <SSection style={{ marginTop: 16 }}>
          <TreasuryChart title="Treasury Value History" value="$2.85M" />
        </SSection>
      </div>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/treasury")({
  component: TreasuryStats,
})
