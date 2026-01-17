import {
  SectionHeader,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { OmnipoolTable } from "@/modules/stats/components/OmnipoolTable"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"

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

function TreasuryStats() {
  const { themeProps: theme } = useTheme()
  const stats = [
    {
      label: "Total Treasury Value",
      value: "$2,852,500",
      valueColor: theme.details.values.positive,
    },
    { label: "LP Positions Value", value: "$1,200,000" },
    { label: "Staked Assets Value", value: "$225,000" },
  ]

  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>
        Treasury
      </SectionHeader>

      <StatsHeader stats={stats} />

      <SSection>
        <TreasuryChart title="Treasury Value History" value="$2.85M" />
      </SSection>

      <SSection hasHeader>
        <SectionHeader>Omnipool assets</SectionHeader>
        <OmnipoolTable />
      </SSection>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/treasury")({
  component: TreasuryStats,
})
