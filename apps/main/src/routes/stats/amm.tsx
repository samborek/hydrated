import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { Button, Flex, SectionHeader, Text } from "@galacticcouncil/ui/components"
import { useState } from "react"
import { VolumeChart } from "@/modules/stats/components/VolumeChart"

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

const SPoolsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SPoolItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }
`

type AMMType = 'omnipool' | 'stableswap' | 'xyk'

const ammData = {
    omnipool: {
        tvl: '$10.3M',
        volume24h: '$2.5M',
        fees24h: '$12,500',
        color: '#3B82F6',
        pools: [
            { name: 'Omnipool', assets: 'DOT, HDX, USDC, WETH, WBTC, +12', tvl: '$10.3M', volume: '$2.5M', apy: '8.5%' },
        ]
    },
    stableswap: {
        tvl: '$5.2M',
        volume24h: '$1.8M',
        fees24h: '$3,600',
        color: '#22C55E',
        pools: [
            { name: '4pool', assets: 'HUSDT, HUSDC, HUSDe, HUSDs', tvl: '$3.2M', volume: '$1.2M', apy: '4.2%' },
            { name: 'USDC-USDT', assets: 'USDC, USDT', tvl: '$2.0M', volume: '$0.6M', apy: '3.1%' },
        ]
    },
    xyk: {
        tvl: '$1.8M',
        volume24h: '$0.4M',
        fees24h: '$1,200',
        color: '#A855F7',
        pools: [
            { name: 'HDX-DOT', assets: 'HDX, DOT', tvl: '$0.8M', volume: '$0.2M', apy: '12.5%' },
            { name: 'HDX-USDC', assets: 'HDX, USDC', tvl: '$0.6M', volume: '$0.15M', apy: '9.8%' },
            { name: 'DOT-USDC', assets: 'DOT, USDC', tvl: '$0.4M', volume: '$0.05M', apy: '5.2%' },
        ]
    }
}

function AMMStats() {
    const [activeTab, setActiveTab] = useState<AMMType>('omnipool')
    const data = ammData[activeTab]

    return (
        <SPageContainer>
            <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>AMM Dashboard</SectionHeader>

            <Flex gap={8} sx={{ marginBottom: 24 }}>
                <Button
                    variant={activeTab === 'omnipool' ? 'secondary' : 'tertiary'}
                    outline={activeTab !== 'omnipool'}
                    onClick={() => setActiveTab('omnipool')}
                >
                    Omnipool
                </Button>
                <Button
                    variant={activeTab === 'stableswap' ? 'secondary' : 'tertiary'}
                    outline={activeTab !== 'stableswap'}
                    onClick={() => setActiveTab('stableswap')}
                >
                    Stableswap
                </Button>
                <Button
                    variant={activeTab === 'xyk' ? 'secondary' : 'tertiary'}
                    outline={activeTab !== 'xyk'}
                    onClick={() => setActiveTab('xyk')}
                >
                    XYK Pools
                </Button>
            </Flex>

            <SMetricsGrid>
                <SMetricCard>
                    <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>TVL</Text>
                    <Text fs={28} fw={700} color={data.color} style={{ fontFamily: 'Gazpacho, sans-serif' }}>{data.tvl}</Text>
                </SMetricCard>
                <SMetricCard>
                    <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Volume (24h)</Text>
                    <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>{data.volume24h}</Text>
                </SMetricCard>
                <SMetricCard>
                    <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginBottom: 8 }}>Fees (24h)</Text>
                    <Text fs={24} fw={700} style={{ fontFamily: 'Gazpacho, sans-serif' }}>{data.fees24h}</Text>
                </SMetricCard>
            </SMetricsGrid>

            <SSection>
                <VolumeChart title="Volume History" value={data.volume24h} />
            </SSection>

            <SSection>
                <SectionHeader>
                    {activeTab === 'omnipool' ? 'Composition' : 'Pools'}
                </SectionHeader>
                <SPoolsList>
                    {data.pools.map((pool, i) => (
                        <SPoolItem key={i}>
                            <div>
                                <Text fw={500} fs={16}>{pool.name}</Text>
                                <Text fs={12} color="rgba(255,255,255,0.5)" style={{ marginTop: 4 }}>{pool.assets}</Text>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <Text fw={600}>{pool.tvl}</Text>
                                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                                    <Text fs={12} color="rgba(255,255,255,0.5)">Vol: {pool.volume}</Text>
                                    <Text fs={12} color="#4CAF50">APY: {pool.apy}</Text>
                                </div>
                            </div>
                        </SPoolItem>
                    ))}
                </SPoolsList>
            </SSection>
        </SPageContainer>
    )
}

export const Route = createFileRoute("/stats/amm")({
    component: AMMStats,
})

