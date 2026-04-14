import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Flex, Separator, Text, ValueStats } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { Fragment } from "react"
import { formatUSD } from "@/api/stats"

import { useAggregatedPlatformStats } from "../hooks/useAggregatedPlatformStats"
import iconMoneyMarket from "@/assets/icons/icon-money-market.png"
import iconHollar from "@/assets/icons/icon-hollar.png"
import iconStaking from "@/assets/icons/icon-staking.png"
import iconTrading from "@/assets/icons/icon-trading.png"

const SGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.scales.paddings.l}px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SCard = styled.div`
  background: ${({ theme }) => theme.surfaces.containers.high.primary};
  border: 1px solid ${({ theme }) => theme.details.borders};
  border-radius: 16px;
  padding: ${({ theme }) => theme.scales.paddings.l}px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.surfaces.containers.high.hover};
  }
`

const SPegDot = styled.span<{ $stable: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ theme, $stable }) =>
    $stable ? theme.accents.success.emphasis : theme.accents.warning.emphasis};
`

const SIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surfaces.containers.dim.dimOnBg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex-shrink: 0;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`

export const ProductCards = () => {
  const { themeProps: theme } = useTheme()
  const { stats, isLoading } = useAggregatedPlatformStats()

  const products = [
    {
      title: "Money Market",
      desc: "Lend and borrow assets on Hydration",
      icon: iconMoneyMarket,
      route: "/borrow/markets",
      metrics: [
        { label: "Market Size", value: isLoading ? "-" : formatUSD(stats.borrowTvl) },
        { label: "Utilization", value: isLoading ? "-" : `${stats.borrowUtilization.toFixed(1)}%` },
      ]
    },
    {
      title: "Hollar",
      desc: "Hydration's native multi-collateral stablecoin",
      icon: iconHollar,
      route: "/borrow",
      metrics: [
        { label: "Total Supply", value: isLoading ? "-" : formatUSD(stats.hollarSupply) },
        {
          label: "Peg Status",
          value: isLoading ? "-" : (stats.hollarPeg >= 0.99 && stats.hollarPeg <= 1.01 ? "Stable" : "Depegged"),
          isStable: !isLoading && stats.hollarPeg >= 0.99 && stats.hollarPeg <= 1.01,
        },
      ]
    },
    {
      title: "Staking",
      desc: "Earn rewards by securing the network",
      icon: iconStaking,
      route: "/staking",
      metrics: [
        { label: "General APY", value: isLoading ? "-" : stats.stakingApyStr },
        { label: "Total Staked", value: isLoading ? "-" : `${parseFloat(stats.supplyStaked || "0").toFixed(1)}%` },
      ]
    },
    {
      title: "Trading / AMMs",
      desc: "Omnipool, XYK, and Stableswap",
      icon: iconTrading,
      route: "/liquidity",
      metrics: [
        { label: "TVL", value: isLoading ? "-" : formatUSD(stats.tradingTvl) },
        { label: "24h Volume", value: isLoading ? "-" : formatUSD(stats.totalVolume) },
      ]
    }
  ]

  return (
    <SGrid>
      {products.map((product) => (
        <SCard key={product.title}>
          <SIconWrapper>
            <img src={product.icon} alt={product.title} />
          </SIconWrapper>
          <Text font="primary" fs="h6" fw={500} mb={4}>
            {product.title}
          </Text>
          <Text fs="p4" color={theme.text.low} mb={20} style={{ minHeight: "40px" }}>
            {product.desc}
          </Text>

          <Flex align="center" gap={28} style={{ flex: 1 }}>
            {product.metrics.map((m, index) => (
              <Fragment key={m.label}>
                <ValueStats
                  label={m.label}
                  value={
                    m.isStable !== undefined ? (
                      <Flex align="center" gap={6}>
                        <SPegDot $stable={m.isStable} />
                        {m.value}
                      </Flex>
                    ) : m.value
                  }
                  isLoading={isLoading}
                  size="medium"
                  wrap={true}
                />
                {index < product.metrics.length - 1 && (
                  <Separator orientation="vertical" style={{ height: 24 }} />
                )}
              </Fragment>
            ))}
          </Flex>
        </SCard>
      ))}
    </SGrid>
  )
}
