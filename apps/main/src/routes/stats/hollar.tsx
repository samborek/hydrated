import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { SectionHeader, Text } from "@galacticcouncil/ui/components"
import { HollarSupplyChart } from "@/modules/stats/components/HollarSupplyChart"

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

const SMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`

const SMetricCard = styled.div(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.accent};
    border: 1px solid ${theme.details.borders};
    border-radius: 8px;
    padding: 16px;
  `
)

const SReservesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const SCollateralGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SCollateralCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 16px;
`

const SProgressBar = styled.div<{ $value: number; $color: string }>`
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $value }) => $value}%;
    background: ${({ $color }) => $color};
    border-radius: 4px;
  }
`

const reserves = [
  { asset: 'HUSDT', value: '$2.1M', percentage: '25%', color: '#26A17B' },
  { asset: 'HUSDC', value: '$1.8M', percentage: '27%', color: '#2775CA' },
  { asset: 'HUSDe', value: '$1.5M', percentage: '29%', color: '#8B5CF6' },
  { asset: 'HUSDs', value: '$1.2M', percentage: '19%', color: '#F4B731' },
]

const collaterals = [
  { asset: 'HUSDT', current: '$1.2M', cap: '$2M', percentage: 60, apy: '4.2%', color: '#26A17B' },
  { asset: 'HUSDC', current: '$0.8M', cap: '$2M', percentage: 40, apy: '3.8%', color: '#2775CA' },
  { asset: 'HUSDe', current: '$0.6M', cap: '$1.5M', percentage: 40, apy: '5.1%', color: '#8B5CF6' },
  { asset: 'HUSDs', current: '$0.7M', cap: '$1.5M', percentage: 47, apy: '4.5%', color: '#F4B731' },
]

function HollarStats() {
  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>Hollar (HUSD)</SectionHeader>

      <SMetricsGrid>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total Hollar Supply</Text>
          <Text fs={28} fw={700} color="#8B5CF6" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$8.5M</Text>
        </SMetricCard>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total Borrowed</Text>
          <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>$5.2M</Text>
        </SMetricCard>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total from HSM</Text>
          <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>$3.3M</Text>
        </SMetricCard>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Hollar Peg</Text>
          <Text fs={24} fw={700} color="#4CAF50" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$1.0001</Text>
        </SMetricCard>
      </SMetricsGrid>

      <SSection>
        <HollarSupplyChart title="Hollar Supply History" value="$8.5M" />
      </SSection>

      <SSection>
        <SectionHeader>Stablepool Reserves</SectionHeader>
        <SReservesGrid>
          {reserves.map((reserve) => (
            <SMetricCard key={reserve.asset}>
              <Text fs={14} fw={500} color={reserve.color}>{reserve.asset}</Text>
              <Text fs={18} fw={600} style={{ marginTop: 8 }}>{reserve.value}</Text>
              <Text fs={12} color="rgba(255,255,255,0.5)">{reserve.percentage} of pool</Text>
            </SMetricCard>
          ))}
        </SReservesGrid>
      </SSection>

      <SSection>
        <SectionHeader>HSM Collateral Caps</SectionHeader>
        <SCollateralGrid>
          {collaterals.map((col) => (
            <SCollateralCard key={col.asset}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text fw={500} color={col.color}>{col.asset}</Text>
                <Text fs={12} color="rgba(255,255,255,0.5)">{col.current} / {col.cap}</Text>
              </div>
              <SProgressBar $value={col.percentage} $color={col.color} />
              <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginTop: 4 }}>APY: {col.apy}</Text>
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

