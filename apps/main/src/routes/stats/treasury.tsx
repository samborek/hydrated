import { SectionHeader } from "@galacticcouncil/ui/components"
import { css, styled } from "@galacticcouncil/ui/utils"
import { useTheme } from "@galacticcouncil/ui/theme"
import { createFileRoute } from "@tanstack/react-router"

import { MainContent } from "@/modules/layout/components/Content"
import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"
import { TreasuryCompositionChart } from "@/modules/stats/components/TreasuryCompositionChart"
import {
  TreasuryAssetsTable,
  ALL_TREASURY_ASSETS,
} from "@/modules/stats/components/TreasuryAssetsTable"

const SPageContainer = styled(MainContent)`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 24px;
`

const SSection = styled.section(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.primary}px;

    @media (max-width: 480px) {
      padding: ${theme.containers.paddings.secondary}px;
    }
  `,
)

// Desktop: paddingTop 28px, no horizontal padding
// Mobile (≤480px): paddingTop 16px, paddingBottom 12px — matches Figma mobile sectionHeader/variants
const SHeader = styled(SectionHeader)`
  && {
    padding-top: ${({ theme }) => theme.scales.paddings.xxl}px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 480px) {
    && {
      padding-top: ${({ theme }) => theme.scales.paddings.l}px;
      padding-bottom: ${({ theme }) => theme.containers.paddings.tertiary}px;
    }
  }
`

const SAssetsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

  const mid = Math.ceil(ALL_TREASURY_ASSETS.length / 2)
  const treasuryAssets = ALL_TREASURY_ASSETS.slice(0, mid)
  const liquidityAssets = ALL_TREASURY_ASSETS.slice(mid)

  return (
    <SPageContainer>
      <StatsHeader stats={stats} />

      <div>
        <SHeader>Treasury</SHeader>

        <SSection>
          <TreasuryCompositionChart />
        </SSection>

        <SSection style={{ marginTop: 20 }}>
          <TreasuryChart title="Treasury Value History" value="$13.3M" />
        </SSection>
      </div>

      <SAssetsGrid>
        <div>
          <SHeader>Treasury assets</SHeader>
          <SSection>
            <TreasuryAssetsTable assets={treasuryAssets} columnLabel="Asset" />
          </SSection>
        </div>

        <div>
          <SHeader>Liquidity positions</SHeader>
          <SSection>
            <TreasuryAssetsTable assets={liquidityAssets} columnLabel="Account" />
          </SSection>
        </div>
      </SAssetsGrid>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/treasury")({
  component: TreasuryStats,
})
