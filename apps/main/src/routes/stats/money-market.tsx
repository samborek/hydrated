import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { Flex, SectionHeader, Separator, Text, ValueStats, ValueStatsValue } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
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

const SStatCard = styled.div(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 12px;
    padding: 20px;
  `
)

const STable = styled.table(
  ({ theme }) => css`
    width: 100%;
    border-collapse: collapse;

    th, td {
      text-align: left;
      padding: 12px 16px;
      border-bottom: 1px solid ${theme.details.separators};
    }

    th {
      font-size: 12px;
      color: ${theme.text.medium};
    }

    tbody tr:hover {
      background: ${theme.surfaces.containers.high.hover};
    }
  `
)

const SAssetCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const SProgressBar = styled.div<{ $value: number }>(
  ({ theme, $value }) => css`
    height: 8px;
    background: ${theme.surfaces.containers.dim.dimOnBg};
    border-radius: 4px;
    overflow: hidden;
    width: 100px;

    &::after {
      content: '';
      display: block;
      height: 100%;
      width: ${$value}%;
      background: linear-gradient(90deg, ${theme.details.values.positive}, #8BC34A);
      border-radius: 4px;
    }
  `
)

// Mock data with real asset IDs
const mockMarkets = [
  { id: '5', asset: 'DOT', supply: '$2.5M', borrow: '$1.2M', utilization: 48, supplyApy: '3.2%', borrowApy: '5.8%' },
  { id: '22', asset: 'USDC', supply: '$5.1M', borrow: '$3.8M', utilization: 75, supplyApy: '4.5%', borrowApy: '7.2%' },
  { id: '20', asset: 'WETH', supply: '$1.8M', borrow: '$0.9M', utilization: 50, supplyApy: '2.8%', borrowApy: '4.9%' },
  { id: '21', asset: 'WBTC', supply: '$3.2M', borrow: '$1.6M', utilization: 50, supplyApy: '2.5%', borrowApy: '4.5%' },
]

function MoneyMarketStats() {
  const { themeProps: theme } = useTheme()

  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>Money Market</SectionHeader>

      <Flex gap={20} justify="space-between" sx={{ py: 10, overflowX: 'auto', height: 80 }}>
        <ValueStats
          label="Total Value Locked"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: '#F59E0B' }}>
              $12.6M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Total Supplied"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: theme.details.values.positive }}>
              $12.6M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Total Borrowed"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: '#F59E0B' }}>
              $7.5M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Liquidations (24h)"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: theme.details.values.negative }}>
              $45,230
            </ValueStatsValue>
          }
        />
      </Flex>

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
                <td><Text color={theme.details.values.positive}>{market.supplyApy}</Text></td>
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

