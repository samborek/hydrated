import { SectionHeader } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { useAggregatedPlatformStats } from "@/modules/stats/hooks/useAggregatedPlatformStats"
import { useGhoReserveData, useBorrowReserves } from "@/api/borrow"
import { formatUSD } from "@/api/stats"
import { getGhoReserve } from "@galacticcouncil/money-market/utils"

import { HollarSupplyBreakdown } from "@/modules/stats/components/HollarSupplyBreakdown"
import { HollarPegChart } from "@/modules/stats/components/HollarPegChart"
import { HollarCollateralBacking } from "@/modules/stats/components/HollarCollateralBacking"

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



function HollarStats() {
  const { themeProps: theme } = useTheme()
  const { stats: aggregatedStats, isLoading: isAggLoading } = useAggregatedPlatformStats()
  const { data: gho, isLoading: isLoadingGho } = useGhoReserveData()
  const { data: reserves, isLoading: isLoadingReserves } = useBorrowReserves()

  const { ghoBorrowApyRange } = gho ?? {}
  const ghoReserve = reserves?.formattedReserves ? getGhoReserve(reserves.formattedReserves) : null

  const mmBorrowedUSD = ghoReserve ? parseFloat(ghoReserve.totalDebtUSD) : 0
  const hsmBorrowedUSD = aggregatedStats?.hollarSupply > mmBorrowedUSD ? aggregatedStats.hollarSupply - mmBorrowedUSD : 0
  const hollarPrice = ghoReserve ? parseFloat(ghoReserve.priceInUSD) : 1

  const isPegged = hollarPrice >= 0.999 && hollarPrice <= 1.001
  const isLoading = isAggLoading || isLoadingGho || isLoadingReserves

  const formattedApy = ghoBorrowApyRange
    ? Array.isArray(ghoBorrowApyRange)
      ? `${ghoBorrowApyRange[0]}% – ${ghoBorrowApyRange[1]}%`
      : `${ghoBorrowApyRange}%`
    : "0%"

  const stats = [
    {
      label: "Total Hollar Supply",
      value: formatUSD(aggregatedStats?.hollarSupply || 0),
      valueColor: theme.colors.lavender["700"],
      isLoading
    },
    {
      label: "Hollar Price",
      value: `$${hollarPrice.toFixed(4)}`,
      valueColor: isPegged ? theme.details.values.positive : theme.colors.utility.warningSecondary[500],
      isLoading
    },
    { 
      label: "Total Borrowed", 
      value: formatUSD(mmBorrowedUSD),
      isLoading 
    },
    { 
      label: "Total from HSM", 
      value: formatUSD(hsmBorrowedUSD),
      isLoading 
    },
    {
      label: "Borrow APY",
      value: formattedApy,
      isLoading
    },
  ]

  return (
    <SPageContainer>
      {/* Section 1 - Main metrics */}
      <StatsHeader stats={stats} />

      {/* Section 2 - Supply Breakdown */}
      <SSection>
        <HollarSupplyBreakdown totalBorrowedValue={mmBorrowedUSD} totalHsmValue={hsmBorrowedUSD} />
      </SSection>

      {/* Section 3 - Hollar Peg Chart */}
      <SSection>
        <HollarPegChart />
      </SSection>

      {/* Section 4 - Collateral Backing */}
      <div>
        <SectionHeader>Collateral Backing</SectionHeader>
        <HollarCollateralBacking />
      </div>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/hollar")({
  component: HollarStats,
})
