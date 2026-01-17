import { SectionHeader } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { FeesStackedChart } from "@/modules/stats/components/FeesStackedChart"
import { RecentTrades } from "@/modules/stats/components/RecentTrades"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { TVLCompositionChart } from "@/modules/stats/components/TVLCompositionChart"
import { VolumeChart } from "@/modules/stats/components/VolumeChart"

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

const SChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

function PlatformOverview() {
  const { themeProps: theme } = useTheme()

  const stats = [
    {
      label: "Total Value Locked",
      value: "$183.59M",
      valueColor: theme.secondaryColors.pink.coralPink,
    },
    { label: "24h Volume", value: "$10.3M" },
    { label: "Fee APY (7D)", value: "2.02-29.75%" }, // <--- Edit this line
    { label: "Transactions (24h)", value: "12,453" },
    { label: "Protocol Revenue (24h)", value: "$45.2K" },
  ]

  return (
    <SPageContainer>
      {/* Key Metrics */}
      <StatsHeader stats={stats} />

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
      <div>
        <SectionHeader>Recent trades</SectionHeader>
        <SSection style={{ paddingTop: 0 }}>
        <RecentTrades />
      </SSection>
      </div>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/overview")({
  component: PlatformOverview,
})
