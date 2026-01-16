import styled from "@emotion/styled"
import { SectionHeader } from "@galacticcouncil/ui/components"
import { css } from "@galacticcouncil/ui/utils"
import { useParams } from "@tanstack/react-router"

import { Breadcrumb } from "@/components/Breadcrumb"
import { AssetHeader } from "@/modules/stats/components/AssetHeader"
import { AssetPriceChart } from "@/modules/stats/components/AssetPriceChart"
import { AssetStatsPanel } from "@/modules/stats/components/AssetStatsPanel"
import { LiquidityProvidersTable } from "@/modules/stats/components/LiquidityProvidersTable"
import { TransactionsTable } from "@/modules/stats/components/TransactionsTable"

// Custom content wrapper with 1300px max-width for asset detail pages
const SAssetDetailContent = styled.div(
  ({ theme }) => css`
    max-width: 1300px;
    margin: 0 auto;
    padding-inline: ${theme.scales.paddings.m}px;

    @media (min-width: 1024px) {
      padding-inline: 30px;
    }
  `,
)

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0;
`

const SSection = styled.section(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.secondary}px;
  `,
)

const SChartLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const SBreadcrumbWrapper = styled.div(
  ({ theme }) => css`
    padding: 8px 0;
    border-bottom: 1px solid ${theme.details.separators};
  `,
)

// Mock asset data - will be replaced with API call
const MOCK_ASSETS: Record<
  string,
  {
    id: string
    name: string
    symbol: string
    tvl: string
    price: string
    volume24h: string
    pol: string
    apr: string
    omnipoolShare: string
  }
> = {
  hdx: {
    id: "0",
    name: "Hydration",
    symbol: "HDX",
    tvl: "$10,301,874",
    price: "$0.456",
    volume24h: "$10,301,874",
    pol: "$10,301,874",
    apr: "2.02-29.75%",
    omnipoolShare: "1.95%",
  },
  dot: {
    id: "5",
    name: "Polkadot",
    symbol: "DOT",
    tvl: "$45,234,567",
    price: "$7.85",
    volume24h: "$5,432,123",
    pol: "$12,345,678",
    apr: "5.5-12.3%",
    omnipoolShare: "15.2%",
  },
  usdc: {
    id: "22",
    name: "USD Coin",
    symbol: "USDC",
    tvl: "$28,765,432",
    price: "$1.00",
    volume24h: "$8,765,432",
    pol: "$5,432,100",
    apr: "3.2-8.5%",
    omnipoolShare: "12.5%",
  },
  eth: {
    id: "20",
    name: "Ethereum",
    symbol: "ETH",
    tvl: "$35,678,901",
    price: "$2,456.78",
    volume24h: "$12,345,678",
    pol: "$8,901,234",
    apr: "4.5-15.2%",
    omnipoolShare: "18.7%",
  },
  ztg: {
    id: "12",
    name: "Zeitgeist",
    symbol: "ZTG",
    tvl: "$2,097,914",
    price: "$0.08",
    volume24h: "$897,914",
    pol: "$497,914",
    apr: "3.1-8.2%",
    omnipoolShare: "1.2%",
  },
  ibtc: {
    id: "11",
    name: "Interlay BTC",
    symbol: "iBTC",
    tvl: "$94,250,000",
    price: "$94,250",
    volume24h: "$4,250,000",
    pol: "$2,097,914",
    apr: "4.5-12.3%",
    omnipoolShare: "8.5%",
  },
  dai: {
    id: "18",
    name: "Dai",
    symbol: "DAI",
    tvl: "$2,097,914",
    price: "$1.00",
    volume24h: "$1,097,914",
    pol: "$597,914",
    apr: "3.2-7.5%",
    omnipoolShare: "2.1%",
  },
  usdt: {
    id: "10",
    name: "Tether",
    symbol: "USDT",
    tvl: "$15,432,100",
    price: "$1.00",
    volume24h: "$5,432,100",
    pol: "$2,432,100",
    apr: "3.0-7.2%",
    omnipoolShare: "5.5%",
  },
  weth: {
    id: "20",
    name: "Wrapped Ether",
    symbol: "WETH",
    tvl: "$12,456,789",
    price: "$3,250",
    volume24h: "$3,250,000",
    pol: "$1,250,000",
    apr: "4.0-11.5%",
    omnipoolShare: "6.2%",
  },
  wbtc: {
    id: "21",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    tvl: "$25,500,000",
    price: "$94,500",
    volume24h: "$5,500,000",
    pol: "$3,500,000",
    apr: "4.2-10.8%",
    omnipoolShare: "10.5%",
  },
  astr: {
    id: "14",
    name: "Astar",
    symbol: "ASTR",
    tvl: "$897,914",
    price: "$0.065",
    volume24h: "$297,914",
    pol: "$197,914",
    apr: "3.8-9.5%",
    omnipoolShare: "0.8%",
  },
  glmr: {
    id: "15",
    name: "Moonbeam",
    symbol: "GLMR",
    tvl: "$697,914",
    price: "$0.22",
    volume24h: "$197,914",
    pol: "$147,914",
    apr: "3.5-8.8%",
    omnipoolShare: "0.6%",
  },
  cfg: {
    id: "16",
    name: "Centrifuge",
    symbol: "CFG",
    tvl: "$597,914",
    price: "$0.38",
    volume24h: "$147,914",
    pol: "$97,914",
    apr: "3.2-8.2%",
    omnipoolShare: "0.5%",
  },
}

export const AssetDetailPage = () => {
  const { asset } = useParams({ from: "/stats/asset/$asset" })

  const assetData = MOCK_ASSETS[asset.toLowerCase()] ?? MOCK_ASSETS.hdx!

  // Breadcrumbs: OVERVIEW / OMNIPOOL / {ASSET}
  const crumbs = [
    { label: "Overview", path: "/stats/overview" },
    { label: "Omnipool", path: "/stats/amm" },
  ]

  return (
    <>
      <SBreadcrumbWrapper>
        <SAssetDetailContent>
          <Breadcrumb crumbs={crumbs} />
        </SAssetDetailContent>
      </SBreadcrumbWrapper>
      <SAssetDetailContent>
        <SPageContainer>
          {/* Asset Header */}
          <AssetHeader
            name={assetData.name}
            symbol={assetData.symbol}
            tvl={assetData.tvl}
            assetId={assetData.id}
          />

          {/* Chart + Stats Panel */}
          <SChartLayout>
            <SSection>
              <AssetPriceChart symbol={assetData.symbol} />
            </SSection>
            <AssetStatsPanel
              price={assetData.price}
              assetId={assetData.id}
              volume24h={assetData.volume24h}
              pol={assetData.pol}
              apr={assetData.apr}
              omnipoolShare={assetData.omnipoolShare}
            />
          </SChartLayout>

          {/* Transactions */}
          <SSection>
            <SectionHeader>Transactions</SectionHeader>
            <TransactionsTable />
          </SSection>

          {/* Top Liquidity Providers */}
          <SSection>
            <SectionHeader>Top 10 liquidity providers</SectionHeader>
            <LiquidityProvidersTable />
          </SSection>
        </SPageContainer>
      </SAssetDetailContent>
    </>
  )
}
