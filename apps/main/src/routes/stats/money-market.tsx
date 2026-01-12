import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { SectionHeader, Text } from "@galacticcouncil/ui/components"
import { AssetLogo } from "@/components/AssetLogo"
import { SupplyBorrowChart } from "@/modules/stats/components/SupplyBorrowChart"

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

const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  th {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
  
  tbody tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`

const SAssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SProgressBar = styled.div<{ $value: number }>`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  width: 100px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $value }) => $value}%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    border-radius: 4px;
  }
`

// Mock data with real asset IDs
const mockMarkets = [
  { id: '5', asset: 'DOT', supply: '$2.5M', borrow: '$1.2M', utilization: 48, supplyApy: '3.2%', borrowApy: '5.8%' },
  { id: '22', asset: 'USDC', supply: '$5.1M', borrow: '$3.8M', utilization: 75, supplyApy: '4.5%', borrowApy: '7.2%' },
  { id: '20', asset: 'WETH', supply: '$1.8M', borrow: '$0.9M', utilization: 50, supplyApy: '2.8%', borrowApy: '4.9%' },
  { id: '21', asset: 'WBTC', supply: '$3.2M', borrow: '$1.6M', utilization: 50, supplyApy: '2.5%', borrowApy: '4.5%' },
]

function MoneyMarketStats() {
  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>Money Market</SectionHeader>

      <SMetricsGrid>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total Value Locked</Text>
          <Text fs={28} fw={700} color="#F59E0B" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$12.6M</Text>
        </SMetricCard>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total Supplied</Text>
          <Text fs={24} fw={700} color="#22C55E" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$12.6M</Text>
        </SMetricCard>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total Borrowed</Text>
          <Text fs={24} fw={700} color="#F59E0B" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$7.5M</Text>
        </SMetricCard>
        <SMetricCard>
          <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Liquidations (24h)</Text>
          <Text fs={24} fw={700} color="#EF4444" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$45,230</Text>
        </SMetricCard>
      </SMetricsGrid>

      <SSection>
        <SupplyBorrowChart title="Supply / Borrow History" />
      </SSection>

      <SSection>
        <SectionHeader>Markets</SectionHeader>
        <STable>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Total Supply</th>
              <th>Total Borrow</th>
              <th>Utilization</th>
              <th>Supply APY</th>
              <th>Borrow APY</th>
            </tr>
          </thead>
          <tbody>
            {mockMarkets.map((market, i) => (
              <tr key={i}>
                <td>
                  <SAssetCell>
                    <AssetLogo id={market.id} size="small" />
                    <Text fw={500}>{market.asset}</Text>
                  </SAssetCell>
                </td>
                <td>{market.supply}</td>
                <td>{market.borrow}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <SProgressBar $value={market.utilization} />
                    <Text fs={12}>{market.utilization}%</Text>
                  </div>
                </td>
                <td><Text color="#4CAF50">{market.supplyApy}</Text></td>
                <td><Text color="#FF9800">{market.borrowApy}</Text></td>
              </tr>
            ))}
          </tbody>
        </STable>
      </SSection>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/money-market")({
  component: MoneyMarketStats,
})

