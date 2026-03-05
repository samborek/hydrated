import { SectionHeader, Button } from "@galacticcouncil/ui/components"
import { mq, useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"
import { Fragment, useCallback, useEffect, useState } from "react"
import { Flex, Separator, Text } from "@galacticcouncil/ui/components"
import { AssetLogo } from "@/components/AssetLogo"
import { AssetLabel } from "@galacticcouncil/ui/components"
import {
  HOLLAR_ASSET_ID,
  SUSDE_ASSET_ID,
  SUSDS_ASSET_ID,
  USDT_ASSET_ID,
} from "@galacticcouncil/utils"

import { FeesOverviewChart } from "@/modules/stats/components/FeesOverviewChart"
import { ProtocolRevenueFlowChart } from "@/modules/stats/components/ProtocolRevenueFlowChart"

import { StatsHeader } from "@/modules/stats/components/StatsHeader"
import { TVLCompositionChart } from "@/modules/stats/components/TVLCompositionChart"
import { VolumeChart } from "@/modules/stats/components/VolumeChart"
import { OmnipoolTable } from "@/modules/stats/components/OmnipoolTable"
import { MarketsTable } from "@/modules/stats/components/MarketsTable"
import { SupplyBorrowChart } from "@/modules/stats/components/SupplyBorrowChart"
import { HollarSupplyChart } from "@/modules/stats/components/HollarSupplyChart"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"
import { getFeeColors } from "@/modules/stats/utils/feeColors"

import { MainContent } from "@/modules/layout/components/Content"
import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
} from "@/modules/layout/components/Header.styled"
import { TOP_NAVBAR_BREAKPOINT } from "@/modules/layout/constants"
import { useScrollDirection } from "@/hooks/useScrollDirection"

const SPageContainer = styled(MainContent)`
  gap: 20px;
  padding-bottom: 20px;

  @media (max-width: 576px) {
    gap: 8px;
  }
`

type SStickyNavProps = { $headerVisible?: boolean }

const SStickyNav = styled.div<SStickyNavProps>(
  ({ theme, $headerVisible }) => css`
    position: sticky;
    top: ${$headerVisible ? HEADER_HEIGHT_MOBILE : 0};
    z-index: ${theme.zIndices.header - 1};
    background: ${theme.surfaces.themeBasePalette.background};
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: calc(-1 * var(--layout-gutter));
    margin-right: calc(-1 * var(--layout-gutter));
    padding-left: var(--layout-gutter);
    padding-right: var(--layout-gutter);
    border-bottom: 1px solid ${theme.details.separators};
    overflow-x: auto;
    transition: top 0.3s linear;

    &::-webkit-scrollbar { display: none; }
    scrollbar-width: none;

    ${mq(TOP_NAVBAR_BREAKPOINT)} {
      top: ${$headerVisible ? HEADER_HEIGHT : 0};
    }
  `,
)

const SNavFlex = styled.div`
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
`

const STAT_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "amm", label: "AMM" },
  { id: "fees", label: "Fees & Revenue" },
  { id: "money-market", label: "Lending" },
  { id: "hollar", label: "Hollar" },
  { id: "treasury", label: "Treasury" },
] as const

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



const SFeesOverviewGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(320px, 42vw, 620px);
    gap: ${theme.scales.paddings.l}px;
    width: 100%;
    min-width: 0;

    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
    }
  `,
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
    background: transparent;
    border: 1px solid ${theme.details.borders} !important;
    border-radius: 8px;
    padding: 16px;
  `,
)

const SProgressBar = styled.div<{ $value: number; $color: string }>(
  ({ theme, $value, $color }) => css`
    height: 24px;
    background: ${theme.surfaces.containers.dim.dimOnBg};
    border-radius: 30px;
    overflow: hidden;
    margin-top: 8px;

    &::after {
      content: "";
      display: block;
      height: 100%;
      width: ${$value}%;
      background: ${$color};
      border-radius: 30px;
    }
  `,
)

const reserves = [
  {
    id: [HOLLAR_ASSET_ID, USDT_ASSET_ID],
    asset: "HUSDT",
    name: "Hydrated Tether",
    value: "$2.1M",
    percentage: "25%",
    color: "#26A17B",
  },
  {
    id: [HOLLAR_ASSET_ID, "22"],
    asset: "HUSDC",
    name: "Hydrated USDC",
    value: "$1.8M",
    percentage: "27%",
    color: "#2775CA",
  },
  {
    id: [HOLLAR_ASSET_ID, SUSDE_ASSET_ID],
    asset: "HUSDe",
    name: "Hydrated USDe",
    value: "$1.5M",
    percentage: "29%",
    color: "#8B5CF6",
  },
  {
    id: [HOLLAR_ASSET_ID, SUSDS_ASSET_ID],
    asset: "HUSDs",
    name: "Hydrated USDS",
    value: "$1.2M",
    percentage: "19%",
    color: "#F4B731",
  },
]

const collaterals = [
  {
    id: [HOLLAR_ASSET_ID, USDT_ASSET_ID],
    asset: "HUSDT",
    name: "Hydrated Tether",
    current: "$1.2M",
    cap: "$2M",
    percentage: 60,
    apy: "4.2%",
    color: "#26A17B",
  },
  {
    id: [HOLLAR_ASSET_ID, "22"],
    asset: "HUSDC",
    name: "Hydrated USDC",
    current: "$0.8M",
    cap: "$2M",
    percentage: 40,
    apy: "3.8%",
    color: "#2775CA",
  },
  {
    id: [HOLLAR_ASSET_ID, SUSDE_ASSET_ID],
    asset: "HUSDe",
    name: "Hydrated USDe",
    current: "$0.6M",
    cap: "$1.5M",
    percentage: 40,
    apy: "5.1%",
    color: "#8B5CF6",
  },
  {
    id: [HOLLAR_ASSET_ID, SUSDS_ASSET_ID],
    asset: "HUSDs",
    name: "Hydrated USDS",
    current: "$0.7M",
    cap: "$1.5M",
    percentage: 47,
    apy: "4.5%",
    color: "#F4B731",
  },
]

function StatsPage() {
  const { themeProps: theme } = useTheme()
  const { scrollDirection, isAtTop } = useScrollDirection()
  const isHeaderHidden = scrollDirection === "down" && !isAtTop

  const [activeSection, setActiveSection] = useState<string>("overview")

  // Track which section is in view using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    STAT_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const { liquidityFees: supplyColor, supplyBorrowFees: borrowColor, treasury: treasuryColor } =
    getFeeColors(theme)
  const moneyMarketColor = theme.colors.azureBlue[500]

  const overviewStats = [
    {
      label: "Total Value Locked",
      value: "$183.59M",
      valueColor: theme.secondaryColors.pink.coralPink,
    },
    { label: "24h Volume", value: "$10.3M" },
    { label: "Fee APY (7D)", value: "2.02-29.75%" },
    { label: "Transactions (24h)", value: "12,453" },
    { label: "Protocol Revenue (24h)", value: "$45.2K" },
  ]

  const lendingStats = [
    {
      label: "Total Value Locked",
      value: "$12.6M",
      valueColor: moneyMarketColor,
    },
    {
      label: "Total Supplied",
      value: "$12.6M",
      valueColor: supplyColor,
    },
    {
      label: "Total Borrowed",
      value: "$7.5M",
      valueColor: borrowColor,
    },
    {
      label: "Liquidations (24h)",
      value: "$45,230",
      valueColor: theme.details.values.negative,
    },
  ]

  const hollarStats = [
    {
      label: "Total Hollar Supply",
      value: "$8.5M",
      valueColor: theme.colors.lavender["700"],
    },
    { label: "Total Borrowed", value: "$5.2M" },
    { label: "Total from HSM", value: "$3.3M" },
    {
      label: "Hollar Peg",
      value: "$1.0001",
      valueColor: theme.details.values.positive,
    },
  ]

  const treasuryStats = [
    {
      label: "Total Treasury Value",
      value: "$2,852,500",
      valueColor: treasuryColor,
    },
    { label: "LP Positions Value", value: "$1,200,000" },
    { label: "Staked Assets Value", value: "$225,000" },
  ]

  return (
    <SPageContainer>
      <SStickyNav $headerVisible={!isHeaderHidden}>
        <SNavFlex>
          {STAT_SECTIONS.map(({ id, label }) => (
            <Button
              key={id}
              size="small"
              variant={activeSection === id ? "secondary" : "muted"}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </Button>
          ))}
        </SNavFlex>
      </SStickyNav>
      {/* 1. Protocol Overview */}
      <div id="overview">
        <StatsHeader stats={overviewStats} />

        <SSection style={{ marginTop: Number(theme.scales.paddings.l), marginBottom: Number(theme.scales.paddings.l) }}>
          <TVLCompositionChart title="Hydration TVL" value="$183.59M" />
        </SSection>


        <SSection style={{ marginTop: Number(theme.scales.paddings.l) }}>
          <TVLCompositionChart title="Hydration TVL" value="$183.59M" />
        </SSection>

        <SSection style={{ marginTop: Number(theme.scales.paddings.l) }}>
          <VolumeChart title="24h Volume" value="$10.3M" />
        </SSection>

      </div>

      {/* 2. AMM & Liquidity */}
      <div id="amm">
        <SectionHeader pt={theme.scales.paddings.m}>Omnipool Assets</SectionHeader>
        <SSection style={{ paddingTop: 0, paddingBottom: 0 }}>
          <OmnipoolTable />
        </SSection>
      </div>

      {/* 3. Trading & Protocol Fees */}
      <div id="fees">
        <SectionHeader pt={theme.scales.paddings.m}>Fees & Revenue</SectionHeader>
        <SFeesOverviewGrid>
          <SSection>
            <FeesOverviewChart />
          </SSection>
          <SSection>
            <ProtocolRevenueFlowChart title="Where fees go" />
          </SSection>
        </SFeesOverviewGrid>
      </div>

      {/* 4. Lending Market */}
      <div id="money-market">
        <SectionHeader pt={theme.scales.paddings.m}>Lending Market</SectionHeader>
        <StatsHeader stats={lendingStats} />

        <SSection style={{ marginTop: Number(theme.scales.paddings.l) }}>
          <SupplyBorrowChart />
        </SSection>

        <SSection style={{ paddingTop: 0, overflow: "hidden", marginTop: Number(theme.scales.paddings.l) }}>
          <MarketsTable />
        </SSection>
      </div>

      {/* 5. Hollar (Stablecoin) */}
      <div id="hollar">
        <SectionHeader pt={theme.scales.paddings.m}>Hollar</SectionHeader>
        <StatsHeader stats={hollarStats} />

        <SSection style={{ marginTop: Number(theme.scales.paddings.l) }}>
          <HollarSupplyChart title="Hollar Supply History" value="$8.5M" />
        </SSection>

        <SSection style={{ padding: Number(theme.scales.paddings.xl), marginTop: Number(theme.scales.paddings.l) }}>
          <span style={{ fontSize: "16px", fontWeight: 500, fontFamily: theme.fontFamilies1.primary, color: theme.text.high, display: "block", marginBottom: "24px" }}>Stablepool Reserves</span>
          <Flex justify="space-between" gap={0}>
            {reserves.map((reserve, index) => (
              <Fragment key={reserve.asset}>
                <SStatCard>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <AssetLogo id={reserve.id} size="medium" />
                    <AssetLabel symbol={reserve.asset} name={reserve.name} />
                  </div>
                  <Text
                    fs={22}
                    style={{
                      marginTop: 8,
                      fontFamily: theme.fontFamilies1.primary,
                    }}
                  >
                    {reserve.value}
                  </Text>
                  <Text fs={12} color="text.medium">
                    {reserve.percentage} of pool
                  </Text>
                </SStatCard>
                {index < reserves.length - 1 && (
                  <Separator orientation="vertical" sx={{ my: 10, mx: 20 }} />
                )}
              </Fragment>
            ))}
          </Flex>
        </SSection>

        <SSection style={{ padding: Number(theme.scales.paddings.xl), marginTop: Number(theme.scales.paddings.l) }}>
          <span style={{ fontSize: "16px", fontWeight: 500, fontFamily: theme.fontFamilies1.primary, color: theme.text.high, display: "block", marginBottom: "24px" }}>HSM Collateral Caps</span>
          <SCollateralGrid>
            {collaterals.map((col) => (
              <SCollateralCard key={col.asset}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <AssetLogo id={col.id} size="medium" />
                    <AssetLabel symbol={col.asset} name={col.name} />
                  </div>
                  <Text fs={12} color="text.medium">
                    {col.current} / {col.cap}
                  </Text>
                </div>
                <SProgressBar $value={col.percentage} $color={col.color} />
                <Text fs={12} color="text.medium" style={{ marginTop: 4 }}>
                  APY: {col.apy}
                </Text>
              </SCollateralCard>
            ))}
          </SCollateralGrid>
        </SSection>
      </div>

      {/* 6. Treasury */}
      <div id="treasury">
        <SectionHeader pt={theme.scales.paddings.m}>Treasury</SectionHeader>
        <StatsHeader stats={treasuryStats} />

        <SSection style={{ marginTop: Number(theme.scales.paddings.l) }}>
          <TreasuryChart title="Treasury Value History" value="$2.85M" />
        </SSection>
      </div>

    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/")({
  component: StatsPage,
})
