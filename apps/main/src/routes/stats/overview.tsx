import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { MultiMetricChart } from "@/modules/stats/components/MultiMetricChart"
import { ProductCards } from "@/modules/stats/components/ProductCards"
import { useAggregatedPlatformStats } from "@/modules/stats/hooks/useAggregatedPlatformStats"
import { formatUSD } from "@/api/stats"
import { MainContent } from "@/modules/layout/components/Content"

const SPageContainer = styled(MainContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.scales.paddings.l}px;
  padding-bottom: ${({ theme }) => theme.scales.paddings.l}px;
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



function PlatformOverview() {
  const { stats: aggregatedStats, isLoading } = useAggregatedPlatformStats()

  const stats = [
    {
      label: "Total Value Locked",
      value: formatUSD(aggregatedStats.totalTvl),
      isLoading
    },
    { 
      label: "24h Volume", 
      value: formatUSD(aggregatedStats.totalVolume),
      isLoading 
    },
    { 
      label: "Capital Efficiency", 
      value: `${aggregatedStats.capitalEfficiency.toFixed(2)}%`,
      isLoading 
    },
    { 
      label: "Protocol Revenue (24h)", 
      value: formatUSD(aggregatedStats.protocolRevenue),
      isLoading 
    },
    { 
      label: "HDX Price", 
      value: `$${aggregatedStats.hdxPrice.toFixed(4)}`,
      bottomLabel: `${aggregatedStats.hdxChange > 0 ? "+" : ""}${aggregatedStats.hdxChange}%`,
      isLoading 
    },
    { 
      label: "Hollar Supply", 
      value: formatUSD(aggregatedStats.hollarSupply),
      isLoading 
    },
  ]

  return (
    <SPageContainer>
      {/* Key Metrics */}
      <StatsHeader stats={stats} />

      {/* Multi Metric Interactive Chart */}
      <SSection>
        <MultiMetricChart />
      </SSection>

      {/* Protocol Products Overview */}
      <ProductCards />

    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/overview")({
  component: PlatformOverview,
})
