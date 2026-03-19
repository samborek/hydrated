import { useAggregatedMarketStats, useMarketAssetsData } from "@galacticcouncil/money-market/hooks"
import {
  AssetLogo as BaseAssetLogo,
  Box,
  Button,
  Chip,
  DataTable,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalHeader,
  Separator,
  Stack,
  Text,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  ValueStats,
} from "@galacticcouncil/ui/components"
import { useBreakpoints, useTheme } from "@galacticcouncil/ui/theme"
import { css, getTokenPx, styled } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { useNavigate } from "@tanstack/react-router"
import { createColumnHelper } from "@tanstack/react-table"
import { ChevronRight, LayoutGrid, List, Percent, AlertTriangle } from "lucide-react"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import bullStrategyIcon from "@/assets/strategies/bull_strategy.svg"
import bearStrategyIcon from "@/assets/strategies/bear_strategy.svg"
import directionUpIcon from "@/assets/strategies/direction_up.svg"
import directionDownIcon from "@/assets/strategies/direction_down.svg"
import eurcLogo from "@/assets/strategies/eurc_logo.svg"
import decentralLogo from "@/assets/strategies/decentral_logo.svg"
import primeLogo from "@/assets/strategies/prime_logo.svg"
import gdotLogo from "@/assets/strategies/gdot_logo.svg"

import primeLogoPng from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { MultiplyOpenPositionModalContent } from "@/modules/borrow/multiply/components/MultiplyOpenPositionModalContent"
import { MultiplyPositionsTile } from "@/modules/borrow/multiply/components/MultiplyPositionsTile"
import { PositionsIndicator } from "@/modules/borrow/multiply/components/PositionsIndicator"
import { useMultiplySimulationStore } from "@/modules/borrow/multiply/states/useMultiplySimulationStore"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"
import { useAssets } from "@/providers/assetsProvider"

const SSection = styled.section(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.scales.cornerRadius.xl}px;
    padding: 0px;
    margin-bottom: ${theme.scales.paddings.xl}px;
    overflow: hidden;

    /* Adjust table row padding here */
    & table tbody td {
      padding-top: ${theme.scales.paddings.m}px;
      padding-bottom: ${theme.scales.paddings.m}px;
    }
  `,
)




const SLoopCard = styled.div(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.scales.cornerRadius.xl}px;
    padding: ${theme.scales.paddings.m}px ${theme.scales.paddings.l}px
      ${theme.scales.paddings.xl}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 320px;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
    text-decoration: none;
    color: inherit;
    height: 100%;
    overflow: hidden;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
      border-color: ${theme.details.borders};
      box-shadow: 0 4px 12px ${theme.details.borders}30;
      transform: translateY(-1px);
    }
  `,
)

const SInfoSeparator = styled.div(
  ({ theme }) => css`
    width: 1px;
    align-self: stretch;
    background: ${theme.details.separators};
    flex-shrink: 0;
  `,
)

type FeaturedStrategyConfig = {
  id: string
  strategyName: string
  description: string
  type: "rwa-loop" | "bull" | "bear" | "partnership"
  collateral: string
  debt: string
  leverage: number
}

const FEATURED_STRATEGIES: FeaturedStrategyConfig[] = [
  // Row 1
  {
    id: "prime-loop",
    strategyName: "Prime",
    description:
      "PRIME Multiply is a simple leveraged yield product that gives you increased exposure to PRIME yields, while retaining 100% PRIME exposure.",
    type: "rwa-loop",
    collateral: "PRIME",
    debt: "HUSD",
    leverage: 4,
  },
  {
    id: "gdot-loop",
    strategyName: "GDOT",
    description:
      "DOT but on steroids. GDOT tracks the price of DOT while earning yield from multiple sources (staking, borrowing, liquidity fees, borrowing).",
    type: "rwa-loop",
    collateral: "GDOT",
    debt: "USDC",
    leverage: 4,
  },
  {
    id: "decentral",
    strategyName: "Decentral",
    description:
      "Decentral offers a unique solution for creators seeking immediate cash flow by purchasing their unpaid invoices at a discounted rate.",
    type: "partnership",
    collateral: "USDC",
    debt: "HUSD",
    leverage: 4,
  },
  // Row 2
  {
    id: "eurc-loop",
    strategyName: "EURC",
    description:
      "Leverage your EURC holdings with RWA-backed yield strategies. Earn enhanced returns on Euro-denominated stablecoin positions.",
    type: "rwa-loop",
    collateral: "EURC",
    debt: "HUSD",
    leverage: 4,
  },
  {
    id: "crypto-bull",
    strategyName: "Crypto Bull",
    description:
      "Take a bullish stance on tBTC or ETH using your USDC, USDT, or HUSD. Enhance your leverage to amplify your directional outlook on the market.",
    type: "bull",
    collateral: "WETH",
    debt: "USDC",
    leverage: 4,
  },
  {
    id: "crypto-bear",
    strategyName: "Crypto Bear",
    description:
      "Take a bearish position on tBTC or ETH with your USDC, USDT, or HUSD. Reduce your leverage to align with your negative outlook on the market.",
    type: "bear",
    collateral: "WBTC",
    debt: "USDC",
    leverage: 4,
  },
]

// Rich Strategy Card for Grid View
const SGridCard = styled.div(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.scales.cornerRadius.xl}px;
    padding: ${theme.scales.paddings.xl}px;
    display: flex;
    flex-direction: column;
    gap: ${theme.scales.paddings.l}px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
    }
  `,
)

// Mock Strategies Config - matches Figma "All pairs" table
const STRATEGIES = [
  { collateral: "PRIME", debt: "HUSD", leverage: 3, type: "rwa-loop" as const },
  { collateral: "GDOT", debt: "USDC", leverage: 4, type: "rwa-loop" as const },
  { collateral: "DOT", debt: "DOT", leverage: 3, type: "bull" as const },
  { collateral: "tBTC", debt: "USDC", leverage: 3, type: "bull" as const },
  { collateral: "WETH", debt: "USDC", leverage: 3, type: "bull" as const },
  { collateral: "WBTC", debt: "USDC", leverage: 3, type: "bear" as const },
  { collateral: "USDC", debt: "HUSD", leverage: 4, type: "rwa-loop" as const },
  { collateral: "HUSD", debt: "EURC", leverage: 1, type: "rwa-loop" as const },
  { collateral: "EURC", debt: "HUSD", leverage: 1, type: "rwa-loop" as const },
]

type StrategyRow = {
  id: string
  collateralAsset: any
  debtAsset: any
  leverage: number
  netApy: number // Mocked calculation
  liqAvailable: number
  supplied: number
  strategyName: string
  strategyType: "rwa-loop" | "bull" | "bear"
}

export const MultiplyView: FC = () => {
  const { t: _t } = useTranslation(["common", "borrow"])
  const { themeProps: theme } = useTheme()
  const { gte } = useBreakpoints()
  const { tokens } = useAssets()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const { data: marketAssets } = useMarketAssetsData()

  const strategies = useMemo(() => {
    const assets = marketAssets?.length ? marketAssets : []

    return STRATEGIES.map((s, idx) => {
      const collateralBase = assets.find(
        (a) => a.symbol === s.collateral,
      ) as any
      let collateral: any

      if (collateralBase) {
        collateral = {
          ...collateralBase,
          id: getReserveAssetId(collateralBase),
        }
      } else {
        const token = tokens.find((t) => t.symbol === s.collateral)
        collateral = {
          symbol: s.collateral,
          underlyingAsset: "0x0000000000000000000000000000000000000000",
          supplyAPY: 0.12,
          id: token?.id || "mock-id-c-" + idx,
          ...token,
        }
      }

      const debtBase = assets.find((a) => a.symbol === s.debt) as any
      let debt: any

      if (debtBase) {
        debt = {
          ...debtBase,
          id: getReserveAssetId(debtBase),
        }
      } else {
        const token =
          tokens.find((t) => t.symbol === s.debt) ||
          (s.debt === "HUSD"
            ? tokens.find((t) => t.id === HOLLAR_ASSET_ID)
            : undefined)

        debt = {
          symbol: s.debt,
          underlyingAsset: "0x0000000000000000000000000000000000000001",
          variableBorrowAPY: 0.05,
          id: token?.id || "mock-id-d-" + idx,
          ...token,
        }
      }

      const supplyApy = Number(collateral.supplyAPY) || 0
      const borrowApy = Number(debt.variableBorrowAPY) || 0
      const netApy = Math.max(0,
        (supplyApy + (supplyApy - borrowApy) * (s.leverage - 1)) * 100
      )

      return {
        id: `${s.collateral}-${s.debt}-${idx}`,
        collateralAsset: collateral,
        debtAsset: debt,
        leverage: s.leverage,
        netApy,
        liqAvailable: 12570000,
        supplied: 2400000 + idx * 100000,
        strategyName: collateral.symbol === "EURC" ? "EURC" : `${collateral.symbol} Loop`,
        strategyType: s.type,
      }
    }).filter(Boolean) as StrategyRow[]
  }, [marketAssets, tokens])

  const columnHelper = createColumnHelper<StrategyRow>()

  const debtSymbol = (s: StrategyRow) =>
    s.debtAsset.symbol === "CASH" ? "HUSD" : s.debtAsset.symbol

  const columns = [
    // Asset to Supply column
    columnHelper.display({
      id: "assetToSupply",
      header: "Asset to Supply",
      meta: {
        sx: { width: "14%" },
      },
      cell: ({ row }) => {
        const s = row.original
        const isPrime = s.collateralAsset.symbol === "PRIME"
        const isEurc = s.collateralAsset.symbol === "EURC"
        return (
          <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
            {isPrime ? (
              <BaseAssetLogo
                src={primeLogoPng}
                size="small"
                alt="PRIME"
              />
            ) : isEurc ? (
              <img src={eurcLogo} alt="EURC" style={{ width: 24, height: 24 }} />
            ) : s.collateralAsset.symbol === "HUSD" || s.collateralAsset.symbol === "CASH" ? (
              <AssetLogo id={HOLLAR_ASSET_ID} size="small" />
            ) : (
              <AssetLogo id={s.collateralAsset.id} size="small" />
            )}
            <Text fs="p3" fw={600}>
              {s.collateralAsset.symbol === "CASH" ? "HUSD" : s.collateralAsset.symbol}
            </Text>
          </Flex>
        )
      },
    }),
    // Borrow Token column
    columnHelper.display({
      id: "borrowToken",
      header: "Borrow Token",
      meta: {
        sx: { width: "14%" },
      },
      cell: ({ row }) => {
        const s = row.original
        const isEurc = s.debtAsset.symbol === "EURC"
        return (
          <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
            {s.debtAsset.symbol === "HUSD" || s.debtAsset.symbol === "CASH" ? (
              <AssetLogo id={HOLLAR_ASSET_ID} size="small" />
            ) : isEurc ? (
              <img src={eurcLogo} alt="EURC" style={{ width: 24, height: 24 }} />
            ) : (
              <AssetLogo id={s.debtAsset.id} size="small" />
            )}
            <Text fs="p3" fw={600}>
              {debtSymbol(s)}
            </Text>
          </Flex>
        )
      },
    }),
    // APY column
    columnHelper.accessor("netApy", {
      header: "APY",
      meta: {
        sx: { width: "12%", display: ["none", "table-cell"] },
      },
      cell: ({ getValue }) => (
        <Text color={theme.details.values.positive} fw={500} fs="p4">
          {getValue().toFixed(2)}%
        </Text>
      ),
    }),
    // Max leverage column
    columnHelper.accessor("leverage", {
      header: "Max leverage",
      meta: {
        sx: { width: "12%", display: ["none", "table-cell"] },
      },
      cell: ({ getValue }) => (
        <Text fw={500} fs="p4">
          {getValue().toFixed(2)}x
        </Text>
      ),
    }),
    // Liquidity column
    columnHelper.accessor("liqAvailable", {
      header: "Liquidity",
      meta: {
        sx: { width: "12%", display: ["none", "table-cell"] },
      },
      cell: ({ getValue }) => (
        <Text fw={500} fs="p4">
          {(getValue() / 1000000).toFixed(2)}M
        </Text>
      ),
    }),
    // Type column
    columnHelper.display({
      id: "type",
      header: "Type",
      meta: {
        sx: { width: "14%", display: ["none", "table-cell"] },
      },
      cell: ({ row }) => {
        const s = row.original
        const typeLabels = {
          "rwa-loop": "RWA LOOP",
          "bull": "CRYPTO BULL",
          "bear": "CRYPTO BEAR",
        }
        const typeVariants = {
          "rwa-loop": "info",
          "bull": "green",
          "bear": "danger",
        } as const
        return (
          <Chip
            variant={typeVariants[s.strategyType]}
            size="small"
            rounded
            sx={{ textTransform: "uppercase" }}
          >
            <Text fs="p6" fw={500}>
              {typeLabels[s.strategyType]}
            </Text>
          </Chip>
        )
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const s = row.original
        const isMobile = !gte("sm")
        if (isMobile) {
          return (
            <Flex justify="flex-end" align="center" width="100%">
              <ChevronRight size={20} style={{ color: theme.text.medium }} />
            </Flex>
          )
        }
        return (
          <Flex justify="flex-end" width="100%" gap="0.5rem">
            <Button
              size="small"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedStrategy(s)
              }}
            >
              New position
            </Button>
            <Button
              size="small"
              variant="tertiary"
              onClick={(e) => {
                e.stopPropagation()
                navigate({
                  to: "/borrow/multiply/$strategyId" as any,
                  params: { strategyId: s.id } as any,
                })
              }}
            >
              Details
            </Button>
          </Flex>
        )
      },
      meta: {
        sx: {
          paddingRight: getTokenPx("containers.paddings.primary"),
          width: [40, 220],
        },
      },
    }),
  ]

  const [selectedStrategy, setSelectedStrategy] = useState<StrategyRow | null>(
    null,
  )

  const { data: _marketStats } = useAggregatedMarketStats()
  const { positions } = useMultiplySimulationStore()
  const hasPositions = positions.length > 0

  return (
    <Flex
      direction="column"
      gap={getTokenPx("scales.paddings.m")}
      sx={{ minWidth: 0, overflow: "hidden" }}
    >
      <Flex
        align="center"
        justify="space-between"
        width="100%"
        sx={{ minWidth: 0, flexWrap: "wrap" }}
      >
        <Stack
          direction={["column", null, "row"]}
          justify="flex-start"
          gap={[10, null, 40, 60]}
          separated
        >
          <ValueStats
            label="Total deposits"
            value="$142.50M"
            size="large"
            wrap={[false, false, true]}
          />
          <ValueStats
            label="Active borrows"
            value="$86.20M"
            size="large"
            wrap={[false, false, true]}
          />
        </Stack>
        <PositionsIndicator />
      </Flex>

      {/* Active Positions */}
      <Box sx={{ mt: getTokenPx("scales.paddings.l")(theme as never) }}>
        <MultiplyPositionsTile />
      </Box>

      {/* Featured Strategies */}
      <div>
        <Text
          fs="p1"
          fw={600}
          mt={hasPositions ? getTokenPx("scales.paddings.l") : 0}
          mb={getTokenPx("scales.paddings.l")}
          font="primary"
        >
          Featured strategies
        </Text>
        <Grid
          columns={gte("xl") ? 3 : gte("sm") ? 2 : 1}
          gap={getTokenPx("scales.paddings.l")}
        >
          {FEATURED_STRATEGIES.map((fs) => {
            // Find the matching strategy row for APY data
            const matchedStrategy = strategies.find(
              (s) =>
                s.collateralAsset.symbol === fs.collateral ||
                s.id.startsWith(fs.collateral),
            )
            const netApy = matchedStrategy?.netApy ?? 8.49
            const liqAvailable = matchedStrategy?.liqAvailable ?? 1400000
            const maxLtv = matchedStrategy?.collateralAsset?.baseLTVasCollateral
              ? (Number(matchedStrategy.collateralAsset.baseLTVasCollateral) / 100).toFixed(0)
              : "75"
            const liqThreshold = matchedStrategy?.collateralAsset?.reserveLiquidationThreshold
              ? (Number(matchedStrategy.collateralAsset.reserveLiquidationThreshold) / 100).toFixed(0)
              : "80"

            return (
              <SLoopCard
                key={"feat-" + fs.id}
                onClick={() =>
                  navigate({
                    to: "/borrow/multiply/$strategyId" as any,
                    params: {
                      strategyId: matchedStrategy?.id ?? fs.id,
                    } as any,
                  })
                }
              >
                {/* Content Container */}
                <Flex
                  direction="column"
                  justify="space-between"
                  style={{ flex: 1, minHeight: 0 }}
                >
                  {/* Top: Icon + Chips */}
                  <Flex justify="space-between" align="flex-start">
                    {/* Strategy Icon */}
                    <Box sx={{ position: "relative" }}>
                      {fs.type === "rwa-loop" || fs.type === "partnership" ? (
                        fs.collateral === "PRIME" ? (
                          <img
                            src={primeLogo}
                            alt="PRIME"
                            style={{ width: 65, height: 65 }}
                          />
                        ) : fs.collateral === "GDOT" ? (
                          <img
                            src={gdotLogo}
                            alt="GDOT"
                            style={{ width: 65, height: 65 }}
                          />
                        ) : fs.collateral === "EURC" ? (
                          <img
                            src={eurcLogo}
                            alt="EURC"
                            style={{ width: 65, height: 65 }}
                          />
                        ) : fs.id === "decentral" ? (
                          <img
                            src={decentralLogo}
                            alt="Decentral"
                            style={{ width: 65, height: 65 }}
                          />
                        ) : (
                          <AssetLogo
                            id={matchedStrategy?.collateralAsset?.id}
                            sx={{ width: 65, height: 65 }}
                          />
                        )
                      ) : (
                        <>
                          <img
                            src={
                              fs.type === "bull"
                                ? bullStrategyIcon
                                : bearStrategyIcon
                            }
                            alt={fs.strategyName}
                            style={{ width: 65, height: 65 }}
                          />
                          <img
                            src={
                              fs.type === "bull"
                                ? directionUpIcon
                                : directionDownIcon
                            }
                            alt="direction"
                            style={{
                              width: 25,
                              height: 25,
                              position: "absolute",
                              left: 69,
                              top: 4,
                              transform:
                                fs.type === "bull"
                                  ? "rotate(-90deg)"
                                  : "rotate(90deg) scaleY(-1)",
                            }}
                          />
                        </>
                      )}
                    </Box>

                    {/* Chips */}
                    <Flex
                      direction="column"
                      align="flex-end"
                      gap={getTokenPx("scales.paddings.s")}
                    >
                      {fs.type === "rwa-loop" && (
                        <Chip
                          variant="info"
                          size="medium"
                          rounded
                          sx={{ textTransform: "uppercase" }}
                        >
                          <Text fs="p6" fw={500}>
                            RWA LOOP
                          </Text>
                        </Chip>
                      )}
                      {fs.type === "partnership" && (
                        <Chip
                          variant="info"
                          size="medium"
                          rounded
                          sx={{ textTransform: "uppercase" }}
                        >
                          <Text fs="p6" fw={500}>
                            PARTNERSHIP
                          </Text>
                        </Chip>
                      )}
                      <Chip variant="green" size="medium" rounded>
                        <Text fs="p6" fw={500}>
                          UP TO {fs.leverage}X
                        </Text>
                      </Chip>
                    </Flex>
                  </Flex>

                  {/* Bottom Content */}
                  <Flex
                    direction="column"
                    gap={getTokenPx("scales.paddings.l")}
                  >
                    {/* Info Row: Net APY | Liquidity Available */}
                    <Flex
                      align="center"
                      gap={getTokenPx("scales.paddings.m")}
                    >
                      <Flex direction="column" gap={2}>
                        <Text
                          fs="p6"
                          fw={400}
                          color={theme.text.medium}
                          lh="140%"
                        >
                          Net APY
                        </Text>
                        <Text
                          fw={500}
                          color={theme.details.values.positive}
                          font="primary"
                          sx={{ fontSize: 24, lineHeight: "26px" }}
                        >
                          {netApy.toFixed(2)}%
                        </Text>
                      </Flex>

                      <SInfoSeparator />

                      <Flex direction="column" gap={2}>
                        <Text
                          fs="p6"
                          fw={400}
                          color={theme.text.medium}
                          lh="140%"
                        >
                          Liquidity Available
                        </Text>
                        <Text
                          fw={500}
                          font="primary"
                          sx={{ fontSize: 24, lineHeight: "26px" }}
                        >
                          {(liqAvailable / 1000000).toFixed(1)}m
                        </Text>
                      </Flex>
                    </Flex>

                    {/* Market Context Row */}
                    <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
                      <Text fs="p6" color={theme.text.medium}>
                        TVL: $2.4M
                      </Text>
                      <Text fs="p6" color={theme.text.low}>•</Text>
                      <Text fs="p6" color={theme.text.medium}>
                        Avg Lev: 3.2x
                      </Text>
                    </Flex>

                    {/* Risk Metrics Row */}
                    <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
                      <Text fs="p6" color={theme.text.medium}>
                        Max LTV: {maxLtv}%
                      </Text>
                      <Text fs="p6" color={theme.text.low}>•</Text>
                      <Text fs="p6" color={theme.text.medium}>
                        Liq: {liqThreshold}%
                      </Text>
                    </Flex>

                    {/* Horizontal Separator */}
                    <Separator />

                    {/* Description Container */}
                    <Flex
                      direction="column"
                      gap={getTokenPx("scales.paddings.xs")}
                    >
                      <Text
                        fw={500}
                        font="primary"
                        sx={{ fontSize: 18, lineHeight: "22px" }}
                      >
                        {fs.strategyName}
                      </Text>
                      <Text
                        fs="p5"
                        fw={400}
                        color={theme.text.low}
                        lh="16px"
                      >
                        {fs.description}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </SLoopCard>
            )
          })}
        </Grid>
      </div>

      {/* Strategies List */}
      <Box>
        <Flex
          justify="space-between"
          align="center"
          mt={getTokenPx("scales.paddings.l")}
          mb={getTokenPx("scales.paddings.l")}
        >
          <Text fs="p1" fw={600} font="primary">
            All pairs
          </Text>
          <ToggleGroup
            type="single"
            size="small"
            value={viewMode}
            onValueChange={(value: "list" | "grid") => value && setViewMode(value)}
          >
            <ToggleGroupItem value="list">
              <Tooltip text="List view" side="top" sideOffset={6} asChild>
                <List size={16} />
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="grid">
              <Tooltip text="Grid view" side="top" sideOffset={6} asChild>
                <LayoutGrid size={16} />
              </Tooltip>
            </ToggleGroupItem>
          </ToggleGroup>
        </Flex>

        {viewMode === "list" ? (
          <SSection>
            <DataTable
              data={strategies}
              columns={columns}
              onRowClick={(row) =>
                navigate({
                  to: "/borrow/multiply/$strategyId" as any,
                  params: { strategyId: row.id } as any,
                })
              }
            />
          </SSection>
        ) : (
          <Grid
            columns={gte("md") ? 2 : 1}
            gap={getTokenPx("scales.paddings.l")}
          >
            {strategies.map((s) => (
              <SGridCard key={"grid-" + s.id} onClick={() => setSelectedStrategy(s)}>
                {/* Header: Icon + Name + APY */}
                <Flex justify="space-between" align="start">
                  <Flex gap={getTokenPx("scales.paddings.m")} align="center">
                    {/* Strategy Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 12,
                        background: theme.surfaces.containers.high.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {s.collateralAsset.symbol === "PRIME" ? (
                        <BaseAssetLogo src={primeLogoPng} size="medium" alt="PRIME" />
                      ) : (
                        <AssetLogo id={s.collateralAsset.id} size="medium" />
                      )}
                    </Box>
                    <Flex direction="column" gap={2}>
                      <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
                        <Text fs="p2" fw={600}>
                          {s.strategyName}
                        </Text>
                        <Chip variant="tertiary" size="small">
                          <Text fs="p6" fw={500}>
                            max lev: {s.leverage.toFixed(1)}X
                          </Text>
                        </Chip>
                      </Flex>
                      <Text fs="p5" color={theme.text.medium}>
                        Borrow{" "}
                        {s.debtAsset.symbol === "CASH"
                          ? "HUSD"
                          : s.debtAsset.symbol}{" "}
                        to leverage {s.collateralAsset.symbol}
                      </Text>
                    </Flex>
                  </Flex>

                  {/* APY Section */}
                  <Flex direction="column" align="flex-end" gap={2}>
                    <Text fs="p6" color={theme.text.medium}>
                      APY up to
                    </Text>
                    <Text
                      fs="h6"
                      fw={600}
                      color={theme.details.values.positive}
                      font="primary"
                    >
                      {s.netApy.toFixed(2)}%
                    </Text>
                    <Chip variant="green" size="small" rounded>
                      <Text fs="p6">+ rewards</Text>
                    </Chip>
                  </Flex>
                </Flex>

                <Separator />

                {/* Strategy Description */}
                <Box>
                  <Text fs="p6" fw={600} mb={4} color={theme.text.high}>
                    STRATEGY
                  </Text>
                  <Text fs="p4" color={theme.text.medium} lh="150%">
                    Borrow{" "}
                    {s.debtAsset.symbol === "CASH"
                      ? "HUSD"
                      : s.debtAsset.symbol}{" "}
                    and provide liquidity, using a wide range, to volatile{" "}
                    {s.collateralAsset.symbol}/stablecoins pools
                  </Text>
                </Box>

                {/* Pools Section */}
                <Box>
                  <Text fs="p6" fw={600} mb={8} color={theme.text.high}>
                    POOLS
                  </Text>
                  <Flex gap={getTokenPx("scales.paddings.m")} wrap>
                    {[1, 2, 3, 4].map((poolIdx) => (
                      <Flex key={poolIdx} align="center">
                        {s.collateralAsset.symbol === "PRIME" ? (
                          <BaseAssetLogo
                            src={primeLogoPng}
                            size="extra-small"
                            alt="PRIME"
                          />
                        ) : (
                          <AssetLogo
                            id={s.collateralAsset.id}
                            size="extra-small"
                          />
                        )}
                        <Box sx={{ marginLeft: -4 }}>
                          <AssetLogo id={s.debtAsset.id} size="extra-small" />
                        </Box>
                        <Box sx={{ marginLeft: -4 }}>
                          <AssetLogo
                            id={HOLLAR_ASSET_ID}
                            size="extra-small"
                          />
                        </Box>
                      </Flex>
                    ))}
                  </Flex>
                </Box>

                {/* Risks Section */}
                <Box>
                  <Text fs="p6" fw={600} mb={8} color={theme.text.high}>
                    RISKS
                  </Text>
                  <Flex gap={getTokenPx("scales.paddings.s")}>
                    <Chip variant="tertiary" size="small">
                      <Flex align="center" gap={4}>
                        <Percent size={12} />
                        <Text fs="p6">Interest Rate</Text>
                      </Flex>
                    </Chip>
                    <Chip variant="tertiary" size="small">
                      <Flex align="center" gap={4}>
                        <AlertTriangle size={12} />
                        <Text fs="p6">Liquidation</Text>
                      </Flex>
                    </Chip>
                  </Flex>
                </Box>

                {/* Action Buttons */}
                <Flex gap={getTokenPx("scales.paddings.m")} justify="center">
                  <Button
                    size="small"
                    variant="primary"
                    onClick={(e: any) => {
                      e.stopPropagation()
                      setSelectedStrategy(s)
                    }}
                    sx={{ flex: 1 }}
                  >
                    Open strategy
                  </Button>
                </Flex>
              </SGridCard>
            ))}
          </Grid>
        )}
      </Box>

      {selectedStrategy && (
        <Modal
          open={!!selectedStrategy}
          onOpenChange={() => setSelectedStrategy(null)}
        >
          <ModalHeader
            title="Open position"
            description={`Quickly open ${selectedStrategy.collateralAsset.symbol}/${selectedStrategy.debtAsset.symbol === "CASH" ? "HUSD" : selectedStrategy.debtAsset.symbol} position`}
          />
          <ModalBody>
            <MultiplyOpenPositionModalContent
              collateralAsset={selectedStrategy.collateralAsset}
              debtAsset={selectedStrategy.debtAsset}
              onClose={() => setSelectedStrategy(null)}
            />
          </ModalBody>
        </Modal>
      )}
    </Flex>
  )
}
