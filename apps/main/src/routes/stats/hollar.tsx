import { Fragment } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { AssetLabel, Flex, SectionHeader, Separator, Text, ValueStats, ValueStatsValue } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { AssetLogo } from "@/components/AssetLogo"
import { HollarSupplyChart } from "@/modules/stats/components/HollarSupplyChart"

import { HOLLAR_ASSET_ID, SUSDE_ASSET_ID, SUSDS_ASSET_ID, USDT_ASSET_ID } from "@galacticcouncil/utils"

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
    padding: ${theme.scales.paddings.xl}px;
  `
)

const SStatCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const SCollateralGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SCollateralCard = styled.div(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.accent};
    border: 1px solid ${theme.details.borders};
    border-radius: 8px;
    padding: 16px;
  `
)

const SProgressBar = styled.div<{ $value: number; $color: string }>(
  ({ theme, $value, $color }) => css`
    height: 24px;
    background: ${theme.surfaces.containers.dim.dimOnBg};
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;

    &::after {
      content: '';
      display: block;
      height: 100%;
      width: ${$value}%;
      background: ${$color};
      border-radius: 4px;
    }
  `
)

const reserves = [
  { id: [HOLLAR_ASSET_ID, USDT_ASSET_ID], asset: 'HUSDT', name: 'Hydrated Tether', value: '$2.1M', percentage: '25%', color: '#26A17B' },
  { id: [HOLLAR_ASSET_ID, '22'], asset: 'HUSDC', name: 'Hydrated USDC', value: '$1.8M', percentage: '27%', color: '#2775CA' },
  { id: [HOLLAR_ASSET_ID, SUSDE_ASSET_ID], asset: 'HUSDe', name: 'Hydrated USDe', value: '$1.5M', percentage: '29%', color: '#8B5CF6' },
  { id: [HOLLAR_ASSET_ID, SUSDS_ASSET_ID], asset: 'HUSDs', name: 'Hydrated USDS', value: '$1.2M', percentage: '19%', color: '#F4B731' },
]

const collaterals = [
  { id: [HOLLAR_ASSET_ID, USDT_ASSET_ID], asset: 'HUSDT', name: 'Hydrated Tether', current: '$1.2M', cap: '$2M', percentage: 60, apy: '4.2%', color: '#26A17B' },
  { id: [HOLLAR_ASSET_ID, '22'], asset: 'HUSDC', name: 'Hydrated USDC', current: '$0.8M', cap: '$2M', percentage: 40, apy: '3.8%', color: '#2775CA' },
  { id: [HOLLAR_ASSET_ID, SUSDE_ASSET_ID], asset: 'HUSDe', name: 'Hydrated USDe', current: '$0.6M', cap: '$1.5M', percentage: 40, apy: '5.1%', color: '#8B5CF6' },
  { id: [HOLLAR_ASSET_ID, SUSDS_ASSET_ID], asset: 'HUSDs', name: 'Hydrated USDS', current: '$0.7M', cap: '$1.5M', percentage: 47, apy: '4.5%', color: '#F4B731' },
]

function HollarStats() {
  const { themeProps: theme } = useTheme()

  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>Hollar (HUSD)</SectionHeader>

      <Flex gap={20} justify="space-between" sx={{ py: 10, overflowX: 'auto', height: 80 }}>
        <ValueStats
          label="Total Hollar Supply"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: '#8B5CF6' }}>
              $8.5M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Total Borrowed"
          value="$5.2M"
          size="large"
          wrap
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Total from HSM"
          value="$3.3M"
          size="large"
          wrap
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Hollar Peg"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: theme.details.values.positive }}>
              $1.0001
            </ValueStatsValue>
          }
        />
      </Flex>

      <SSection>
        <HollarSupplyChart title="Hollar Supply History" value="$8.5M" />
      </SSection>

      <SSection>
        <SectionHeader mb={Number(theme.scales.paddings.xl)}>Stablepool Reserves</SectionHeader>
        <Flex justify="space-between" gap={0}>
          {reserves.map((reserve, index) => (
            <Fragment key={reserve.asset}>
              <SStatCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AssetLogo id={reserve.id} size="medium" />
                  <AssetLabel symbol={reserve.asset} name={reserve.name} />
                </div>
                <Text fs={22} style={{ marginTop: 8, fontFamily: theme.fontFamilies1.primary }}>{reserve.value}</Text>
                <Text fs={12} color="text.medium">{reserve.percentage} of pool</Text>
              </SStatCard>
              {index < reserves.length - 1 && (
                <Separator orientation="vertical" sx={{ my: 10, mx: 20 }} />
              )}
            </Fragment>
          ))}
        </Flex>
      </SSection>

      <SSection>
        <SectionHeader>HSM Collateral Caps</SectionHeader>
        <SCollateralGrid>
          {collaterals.map((col) => (
            <SCollateralCard key={col.asset}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AssetLogo id={col.id} size="medium" />
                  <AssetLabel symbol={col.asset} name={col.name} />
                </div>
                <Text fs={12} color="text.medium">{col.current} / {col.cap}</Text>
              </div>
              <SProgressBar $value={col.percentage} $color={col.color} />
              <Text fs={12} color="text.medium" style={{ marginTop: 4 }}>APY: {col.apy}</Text>
            </SCollateralCard>
          ))}
        </SCollateralGrid>
      </SSection>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/hollar")({
  component: HollarStats,
})

