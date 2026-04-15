import { SectionHeader } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { useAggregatedPlatformStats } from "@/modules/stats/hooks/useAggregatedPlatformStats"
import { useGhoReserveData, useBorrowReserves } from "@/api/borrow"
import { formatUSD } from "@/api/stats"
import { getGhoReserve } from "@galacticcouncil/money-market/utils"
import { MainContent } from "@/modules/layout/components/Content"
import { AssetLogo } from "@/components/AssetLogo"
import { Flex, Text } from "@galacticcouncil/ui/components"

import { HollarSupplyBreakdown } from "@/modules/stats/components/HollarSupplyBreakdown"
import { HollarPegChart, PEG_CONFIG, HOLLAR_ASSET_ID } from "@/modules/stats/components/HollarPegChart"
import { HollarCollateralBacking } from "@/modules/stats/components/HollarCollateralBacking"

const SPageContainer = styled(MainContent)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;

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

const SPegStatsRow = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 2px;
  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`

function HollarStats() {
  const { themeProps: theme } = useTheme()
  const { stats: aggregatedStats, isLoading: isAggLoading } = useAggregatedPlatformStats()
  const { data: gho, isLoading: isLoadingGho } = useGhoReserveData()
  const { data: reserves, isLoading: isLoadingReserves } = useBorrowReserves()

  const { ghoBorrowApyRange } = gho ?? {}
  const ghoReserve = reserves?.formattedReserves ? getGhoReserve(reserves.formattedReserves) : null

  const mmBorrowedUSD = gho?.formattedGhoReserveData?.aaveFacilitatorBucketLevel ?? 0
  const hsmBorrowedUSD = 3_300_000
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
      isLoading,
    },
    {
      label: "Hollar Price",
      value: `$${hollarPrice.toFixed(4)}`,
      valueColor: isPegged ? theme.details.values.positive : theme.colors.utility.warningSecondary[500],
      isLoading,
    },
    { label: "Total Borrowed", value: formatUSD(mmBorrowedUSD), isLoading },
    { label: "Total from HSM",  value: formatUSD(hsmBorrowedUSD), isLoading },
    { label: "Borrow APY",      value: formattedApy, isLoading },
  ]

  const pegStats = PEG_CONFIG.map((config) => ({
    label: config.label,
    value: config.spot,
    customLabel: (
      <Flex gap={6} align="center">
        <AssetLogo id={[HOLLAR_ASSET_ID, config.assetId]} size="small" />
        <Text
          fs={11}
          fw={500}
          color="text.medium"
          css={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
        >
          {config.label}
        </Text>
      </Flex>
    ),
    valueColor: config.color,
  }))

  return (
    <SPageContainer>
      {/* Section 1 - Main metrics */}
      <StatsHeader stats={stats} />

      {/* Section 2 - Supply Breakdown */}
      <SSection>
        <HollarSupplyBreakdown totalBorrowedValue={mmBorrowedUSD} totalHsmValue={hsmBorrowedUSD} isLoading={isLoading} />
      </SSection>

      {/* Section 3 - Peg spot prices (above chart container) */}
      <SPegStatsRow>
        <StatsHeader stats={pegStats} justify="flex-start" gap={40} sx={{ py: 0 }} />
      </SPegStatsRow>

      {/* Section 4 - Hollar Peg Chart */}
      <SSection>
        <HollarPegChart />
      </SSection>

      {/* Section 5 - Collateral Backing */}
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
