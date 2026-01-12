import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { SectionHeader, Text } from "@galacticcouncil/ui/components"
import { AssetLogo } from "@/components/AssetLogo"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"

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

// Mock data with real asset IDs
const mockAssets = [
    { id: '5', asset: 'DOT', balance: '125,000', value: '$562,500', type: 'Native' },
    { id: '0', asset: 'HDX', balance: '50,000,000', value: '$615,000', type: 'Native' },
    { id: '22', asset: 'USDC', balance: '250,000', value: '$250,000', type: 'Stablecoin' },
    { id: '10', asset: 'USDT', balance: '150,000', value: '$150,000', type: 'Stablecoin' },
    { id: '5', asset: 'DOT Staked', balance: '50,000', value: '$225,000', type: 'Staked' },
]

function TreasuryStats() {
    return (
        <SPageContainer>
            <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>Treasury</SectionHeader>

            <SMetricsGrid>
                <SMetricCard>
                    <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Total Treasury Value</Text>
                    <Text fs={28} fw={700} color="#22C55E" style={{ fontFamily: 'Gazpacho, sans-serif' }}>$2,852,500</Text>
                </SMetricCard>
                <SMetricCard>
                    <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>LP Positions Value</Text>
                    <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>$1,200,000</Text>
                </SMetricCard>
                <SMetricCard>
                    <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Staked Assets Value</Text>
                    <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>$225,000</Text>
                </SMetricCard>
            </SMetricsGrid>

            <SSection>
                <TreasuryChart title="Treasury Value History" value="$2.85M" />
            </SSection>

            <SSection>
                <SectionHeader>Assets & Positions</SectionHeader>
                <STable>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Balance</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockAssets.map((asset, i) => (
                            <tr key={i}>
                                <td>
                                    <SAssetCell>
                                        <AssetLogo id={asset.id} size="small" />
                                        <Text fw={500}>{asset.asset}</Text>
                                    </SAssetCell>
                                </td>
                                <td><Text color="rgba(255,255,255,0.6)">{asset.type}</Text></td>
                                <td>{asset.balance}</td>
                                <td><Text fw={500}>{asset.value}</Text></td>
                            </tr>
                        ))}
                    </tbody>
                </STable>
            </SSection>
        </SPageContainer>
    )
}

export const Route = createFileRoute("/stats/treasury")({
    component: TreasuryStats,
})

