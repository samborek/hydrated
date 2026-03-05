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
import { GDOT_ERC20_ID, HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { useNavigate } from "@tanstack/react-router"
import { createColumnHelper } from "@tanstack/react-table"
import { ChevronRight, LayoutGrid, List, Percent, AlertTriangle } from "lucide-react"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import bullStrategyIcon from "@/assets/strategies/bull_strategy.svg"
import bearStrategyIcon from "@/assets/strategies/bear_strategy.svg"
import directionUpIcon from "@/assets/strategies/direction_up.svg"
import directionDownIcon from "@/assets/strategies/direction_down.svg"

import primeLogo from "@/assets/tokens/prime.png"
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
    padding: ${theme.scales.paddings.l}px ${theme.scales.paddings.xl}px
      ${theme.scales.paddings.xxl}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 420px;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
    text-decoration: none;
    color: inherit;
    height: 100%;
    overflow: hidden;

    &:hover {
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
  type: "rwa-loop" | "bull" | "bear"
  collateral: string
  debt: string
  leverage: number
}

const FEATURED_STRATEGIES: FeaturedStrategyConfig[] = [
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

// Mock Strategies Config
const STRATEGIES = [
  { collateral: "PRIME", debt: "HUSD", leverage: 8.3 },
  { collateral: "GDOT", debt: "USDC", leverage: 3 },
  { collateral: "WETH", debt: "USDC", leverage: 2.5 },
  { collateral: "WBTC", debt: "USDC", leverage: 2.5 },
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
      const netApy =
        (supplyApy + (supplyApy - borrowApy) * (s.leverage - 1)) * 100

      return {
        id: `${s.collateral}-${s.debt}-${idx}`,
        collateralAsset: collateral,
        debtAsset: debt,
        leverage: s.leverage,
        netApy,
        liqAvailable: 1000000 + idx * 10000,
        supplied: 2400000 + idx * 100000,
        strategyName: `${collateral.symbol} Loop`,
      }
    }).filter(Boolean) as StrategyRow[]
  }, [marketAssets, tokens])

  const columnHelper = createColumnHelper<StrategyRow>()

  const debtSymbol = (s: StrategyRow) =>
    s.debtAsset.symbol === "CASH" ? "HUSD" : s.debtAsset.symbol

  const columns = [
    columnHelper.display({
      id: "pair",
      header: "Pair",
      meta: {
        sx: { width: ["auto", "22%"] },
      },
      cell: ({ row }) => {
        const s = row.original
        const isPrime = s.collateralAsset.symbol === "PRIME"
        const showMarketLabel = gte("sm")
        const pairLabel = `${s.collateralAsset.symbol}/${debtSymbol(s)}`

        return (
          <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
            <Flex
              align="center"
              sx={{
                position: "relative",
                minWidth: 40,
                height: 28,
              }}
            >
              {isPrime ? (
                <BaseAssetLogo
                  src={primeLogo}
                  size="medium"
                  alt="PRIME"
                  sx={{ position: "absolute", left: 0, zIndex: 1 }}
                />
              ) : (
                <AssetLogo
                  id={s.collateralAsset.id}
                  size="medium"
                  sx={{ position: "absolute", left: 0, zIndex: 1 }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  left: 16,
                  zIndex: 0,
                }}
              >
                {s.debtAsset.symbol === "HUSD" || s.debtAsset.symbol === "CASH" ? (
                  <AssetLogo id={HOLLAR_ASSET_ID} size="medium" />
                ) : (
                  <AssetLogo id={s.debtAsset.id} size="medium" />
                )}
              </Box>
            </Flex>
            <Flex direction="column" sx={{ minWidth: 0 }}>
              <Text fs="p3" fw={500}>
                {pairLabel}
              </Text>
              {showMarketLabel && (
                <Text fs="p5" color={theme.text.low} truncate>
                  {s.collateralAsset.symbol === "PRIME" ||
                    s.collateralAsset.symbol === "GDOT"
                    ? "Prime Market"
                    : "Global Market"}
                </Text>
              )}
            </Flex>
          </Flex>
        )
      },
    }),
    columnHelper.accessor("netApy", {
      header: "Max Net APY",
      meta: {
        sx: { width: "12%", display: ["none", "table-cell"] },
      },
      cell: ({ getValue }) => (
        <Text color={theme.details.values.positive} fw={600}>
          {getValue().toFixed(2)}%
        </Text>
      ),
    }),
    columnHelper.accessor("leverage", {
      header: "Max Leverage",
      meta: {
        sx: { width: "12%", display: ["none", "table-cell"] },
      },
      cell: ({ getValue }) => <Text>{getValue().toFixed(2)}x</Text>,
    }),
    columnHelper.accessor("liqAvailable", {
      header: "Liquidity",
      meta: {
        sx: { width: "12%" },
      },
      cell: ({ getValue }) => (
        <Text
          sx={{
            borderBottom: `1px dashed ${theme.text.low}`,
            width: "fit-content",
          }}
        >
          ${(getValue() / 1000).toFixed(2)}k
        </Text>
      ),
    }),
    columnHelper.accessor("supplied", {
      header: "Supplied",
      meta: {
        sx: { width: "12%", display: ["none", "table-cell"] },
      },
      cell: ({ getValue }) => (
        <Text>${(getValue() / 1000000).toFixed(2)}M</Text>
      ),
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
              Open position
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
          Featured Loops
        </Text>
        <Grid
          columns={gte("xl") ? 4 : gte("sm") ? 2 : 1}
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
                      {fs.type === "rwa-loop" ? (
                        fs.collateral === "PRIME" ? (
                          <BaseAssetLogo
                            src={primeLogo}
                            alt="PRIME"
                            sx={{ width: 106, height: 106 }}
                          />
                        ) : (
                          <AssetLogo
                            id={GDOT_ERC20_ID}
                            sx={{ width: 106, height: 106 }}
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
                              left: 52,
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
                    gap={getTokenPx("scales.paddings.xl")}
                  >
                    {/* Info Row: Net APY | Liquidity Available */}
                    <Flex
                      align="center"
                      gap={getTokenPx("scales.paddings.l")}
                    >
                      <Flex direction="column" gap={4}>
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
                          sx={{ fontSize: 28, lineHeight: "30px" }}
                        >
                          {netApy.toFixed(2)}%
                        </Text>
                      </Flex>

                      <SInfoSeparator />

                      <Flex direction="column" gap={4}>
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
                          sx={{ fontSize: 28, lineHeight: "30px" }}
                        >
                          {(liqAvailable / 1000000).toFixed(1)}m
                        </Text>
                      </Flex>
                    </Flex>

                    {/* Horizontal Separator */}
                    <Separator />

                    {/* Description Container */}
                    <Flex
                      direction="column"
                      gap={getTokenPx("scales.paddings.base")}
                    >
                      <Text
                        fw={500}
                        font="primary"
                        sx={{ fontSize: 22, lineHeight: "24px" }}
                      >
                        {fs.strategyName}
                      </Text>
                      <Text
                        fs="p4"
                        fw={400}
                        color={theme.text.low}
                        lh="18px"
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
                        <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
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
                            src={primeLogo}
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
