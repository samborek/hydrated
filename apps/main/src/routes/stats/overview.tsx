import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { SectionHeader } from "@galacticcouncil/ui/components"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { RecentTrades } from "@/modules/stats/components/RecentTrades"
import { TVLCompositionChart } from "@/modules/stats/components/TVLCompositionChart"
import { VolumeChart } from "@/modules/stats/components/VolumeChart"
import { FeesStackedChart } from "@/modules/stats/components/FeesStackedChart"

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

const SChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

function PlatformOverview() {
  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-18}>Hydration Dashboard</SectionHeader>

      {/* Key Metrics */}
      <StatsHeader />

      {/* TVL Chart - Full width */}
      <SSection>
        <TVLCompositionChart title="Hydration TVL" value="$183.59M" />
      </SSection>

      {/* Volume + Fees Charts - Side by side */}
      <SChartsGrid>
        <SSection>
          <VolumeChart title="24h Volume" value="$10.3M" />
        </SSection>
        <SSection>
          <FeesStackedChart title="Protocol Fees" />
        </SSection>
      </SChartsGrid>

      {/* Recent Trades */}
      <SSection>
        <SectionHeader>Recent trades</SectionHeader>
        <RecentTrades />
      </SSection>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/overview")({
  component: PlatformOverview,
})

