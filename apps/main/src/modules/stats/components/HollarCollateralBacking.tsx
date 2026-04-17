import styled from "@emotion/styled"
import { getGhoReserve } from "@galacticcouncil/money-market/utils"
import {
  Flex,
  Text,
  ValueStats,
  ValueStatsValue,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import {
  DOT_ASSET_ID,
  getAssetIdFromAddress,
  SUSDE_ASSET_ID,
  SUSDS_ASSET_ID,
  USDT_ASSET_ID,
  VDOT_ASSET_ID,
} from "@galacticcouncil/utils"
import React, { FC, useState } from "react"
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts"

import { useBorrowReserves, useGhoReserveData } from "@/api/borrow"
import { formatUSD } from "@/api/stats"
import { AssetLogo } from "@/components/AssetLogo"
import { getBackingAssetColor } from "@/modules/stats/utils/backingAssetColors"
import { hollarColors } from "@/modules/stats/utils/hollarColors"

import {
  chartCursorStyle,
  ChartTooltipContentWithPosition,
  chartTooltipProps,
} from "./StatsChartTooltip"

const HSM_ASSET_IDS: Record<string, string> = {
  aUSDT: USDT_ASSET_ID,
  aUSDC: "22",
  sUSDe: SUSDE_ASSET_ID,
  sUSDS: SUSDS_ASSET_ID,
}

const MM_ASSET_IDS: Record<string, string> = {
  USDC: "22",
  USDT: USDT_ASSET_ID,
  WBTC: "11",
  DOT: DOT_ASSET_ID,
  vDOT: VDOT_ASSET_ID,
}

const SBucketsCard = styled.div`
  background: ${({ theme }) => theme.surfaces.containers.high.primary};
  border: 1px solid ${({ theme }) => theme.details.borders};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SBucketRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SProgressBarWrapper = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.surfaces.containers.dim.dimOnBg};
  overflow: hidden;
`

const SProgressBarFill = styled.div<{ $progress: number; $color: string }>`
  height: 100%;
  width: ${({ $progress }) => Math.min(Math.max($progress, 0), 100)}%;
  background: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 0.3s ease;
`

const SDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.details.borders};
  width: 100%;
`

const SGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const SCard = styled.div`
  background: ${({ theme }) => theme.surfaces.containers.high.primary};
  border: 1px solid ${({ theme }) => theme.details.borders};
  border-radius: 16px;
  padding: 28px;
`

const SCardInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: stretch;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

const SDonutInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  pointer-events: none;
`

const SDonutWrapper = styled.div`
  position: relative;
  width: 288px;
  min-height: 288px;
  flex-shrink: 0;
`

const SLegendDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

type SliceMotionConfig = {
  duration: number
  easing: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out"
  hoverExpand: number
  cornerRadius: number
}

export const HOLLAR_SLICE_MOTION = {
  mm: {
    duration: 950,
    easing: "ease-in-out",
    hoverExpand: 4,
    cornerRadius: 8,
  },
  hsm: {
    duration: 650,
    easing: "ease-in-out",
    hoverExpand: 4,
    cornerRadius: 8,
  },
} as const satisfies Record<string, SliceMotionConfig>

const renderHoveredSlice =
  (motion: SliceMotionConfig) =>
  (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + motion.hoverExpand}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={motion.cornerRadius}
      />
    )
  }

export const HollarCollateralBacking: FC = () => {
  const { themeProps: theme } = useTheme()
  const [mmActiveIndex, setMmActiveIndex] = useState<number | null>(null)
  const [hsmActiveIndex, setHsmActiveIndex] = useState<number | null>(null)
  const [mmTooltipPosition, setMmTooltipPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [hsmTooltipPosition, setHsmTooltipPosition] = useState<{
    x: number
    y: number
  } | null>(null)

  const { data: gho } = useGhoReserveData()
  const { data: reserves } = useBorrowReserves()

  // --- MM Facilitator Bucket (❗️ mock fallback until indexer is wired) ---
  const aaveFacilLevel =
    gho?.formattedGhoReserveData?.aaveFacilitatorBucketLevel || 6_200_000
  const aaveFacilMax =
    gho?.formattedGhoReserveData?.aaveFacilitatorBucketMaxCapacity || 15_000_000
  const mmBucketProgress = (aaveFacilLevel / aaveFacilMax) * 100

  // --- HSM Facilitator Bucket (Mocked) ---
  const hsmFacilLevel = 3_300_000
  const hsmFacilMax = 5_000_000
  const hsmBucketProgress = (hsmFacilLevel / hsmFacilMax) * 100

  // --- MM Collateral math ---
  const mmTotalDebt =
    reserves?.formattedReserves?.reduce(
      (acc, r) => acc + parseFloat(r.totalDebtUSD),
      0,
    ) || 0
  const ghoReserve = reserves?.formattedReserves
    ? getGhoReserve(reserves.formattedReserves)
    : null
  const hollarDebtLive = ghoReserve ? parseFloat(ghoReserve.totalDebtUSD) : 0
  const hollarShare = mmTotalDebt > 0 ? hollarDebtLive / mmTotalDebt : 0

  const liveCollaterals = (
    reserves?.formattedReserves
      ?.filter(
        (r) => r.symbol !== "HOLLAR" && parseFloat(r.totalLiquidityUSD) > 0,
      )
      .map((r) => ({
        name: r.symbol,
        assetId: getAssetIdFromAddress(r.underlyingAsset),
        value: parseFloat(r.totalLiquidityUSD) * hollarShare,
      }))
      .sort((a, b) => b.value - a.value) || []
  ).slice(0, 6)

  // ❗️ Mock MM collateral — replace with live data once indexer is wired
  const MOCK_MM_HOLLAR_DEBT = 6_200_000
  const MOCK_MM_COLLATERALS = [
    { name: "USDC", assetId: MM_ASSET_IDS.USDC, value: 5_100_000 },
    { name: "USDT", assetId: MM_ASSET_IDS.USDT, value: 3_800_000 },
    { name: "WBTC", assetId: MM_ASSET_IDS.WBTC, value: 1_900_000 },
    { name: "DOT", assetId: MM_ASSET_IDS.DOT, value: 1_200_000 },
    { name: "vDOT", assetId: MM_ASSET_IDS.vDOT, value: 700_000 },
    { name: "tBTC", assetId: undefined, value: 600_000 },
  ]

  const hasLiveData =
    liveCollaterals.length > 0 && liveCollaterals.some((c) => c.value > 0)
  const mmCollaterals = hasLiveData ? liveCollaterals : MOCK_MM_COLLATERALS
  const hollarDebt = hasLiveData ? hollarDebtLive : MOCK_MM_HOLLAR_DEBT

  const mmTotalCollateral = mmCollaterals.reduce((acc, c) => acc + c.value, 0)
  const mmOvercollateralization =
    hollarDebt > 0 ? (mmTotalCollateral / hollarDebt).toFixed(2) : "–"

  // --- HSM Collateral (Mocked) ---
  const hsmCollaterals = [
    { name: "aUSDT", assetId: HSM_ASSET_IDS.aUSDT, value: hsmFacilLevel * 0.4 },
    { name: "aUSDC", assetId: HSM_ASSET_IDS.aUSDC, value: hsmFacilLevel * 0.3 },
    { name: "sUSDe", assetId: HSM_ASSET_IDS.sUSDe, value: hsmFacilLevel * 0.2 },
    { name: "sUSDS", assetId: HSM_ASSET_IDS.sUSDS, value: hsmFacilLevel * 0.1 },
  ]
  const hsmTotal = hsmCollaterals.reduce((acc, c) => acc + c.value, 0)

  const mmColor = hollarColors.buckets.mm
  const mmHoveredSlice = renderHoveredSlice(HOLLAR_SLICE_MOTION.mm)
  const hsmHoveredSlice = renderHoveredSlice(HOLLAR_SLICE_MOTION.hsm)
  const getMmColor = (assetId?: string, symbol?: string, index?: number) =>
    getBackingAssetColor({ assetId, symbol, index })
  const getHsmColor = (assetId?: string, symbol?: string, index?: number) =>
    getBackingAssetColor({ assetId, symbol, index })
  const clearMmHover = () => setMmActiveIndex(null)
  const clearHsmHover = () => setHsmActiveIndex(null)

  return (
    <Flex direction="column" gap={24}>
      {/* Facilitator Buckets — unified card */}
      <SBucketsCard>
        <Text fs={16} fw={600} font="primary" color="text.primary">
          Facilitator Buckets
        </Text>

        <SBucketRow>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={8}>
              <SLegendDot $color={mmColor} />
              <Text fs={14} fw={500} color="text.primary">
                Money Market
              </Text>
            </Flex>
            <Flex align="center" gap={6}>
              <Text
                fs={13}
                fw={600}
                color="text.primary"
                style={{ fontFamily: "Gazpacho, sans-serif" }}
              >
                {formatUSD(aaveFacilLevel)}
              </Text>
              <Text fs={13} color="text.medium">
                / {formatUSD(aaveFacilMax)}
              </Text>
              <Text
                fs={12}
                color="text.medium"
                style={{ minWidth: 42, textAlign: "right", opacity: 0.7 }}
              >
                {mmBucketProgress.toFixed(1)}%
              </Text>
            </Flex>
          </Flex>
          <SProgressBarWrapper>
            <SProgressBarFill $progress={mmBucketProgress} $color={mmColor} />
          </SProgressBarWrapper>
        </SBucketRow>

        <SDivider />

        <SBucketRow>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={8}>
              <SLegendDot $color={hollarColors.buckets.hsm} />
              <Text fs={14} fw={500} color="text.primary">
                HSM
              </Text>
            </Flex>
            <Flex align="center" gap={6}>
              <Text
                fs={13}
                fw={600}
                color="text.primary"
                style={{ fontFamily: "Gazpacho, sans-serif" }}
              >
                {formatUSD(hsmFacilLevel)}
              </Text>
              <Text fs={13} color="text.medium">
                / {formatUSD(hsmFacilMax)}
              </Text>
              <Text
                fs={12}
                color="text.medium"
                style={{ minWidth: 42, textAlign: "right", opacity: 0.7 }}
              >
                {hsmBucketProgress.toFixed(1)}%
              </Text>
            </Flex>
          </Flex>
          <SProgressBarWrapper>
            <SProgressBarFill
              $progress={hsmBucketProgress}
              $color={hollarColors.buckets.hsm}
            />
          </SProgressBarWrapper>
        </SBucketRow>
      </SBucketsCard>

      {/* Two-column: MM + HSM pie charts */}
      <SGrid>
        {/* MM Collateral */}
        <SCard>
          <SCardInner>
            <SDonutWrapper>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mmCollaterals}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={115}
                    activeIndex={mmActiveIndex ?? undefined}
                    activeShape={mmHoveredSlice}
                    isAnimationActive={true}
                    animationDuration={HOLLAR_SLICE_MOTION.mm.duration}
                    animationEasing={HOLLAR_SLICE_MOTION.mm.easing}
                    stroke="none"
                    paddingAngle={4}
                    cornerRadius={6}
                    dataKey="value"
                    onMouseEnter={(_, index) => setMmActiveIndex(index)}
                    onMouseLeave={clearMmHover}
                  >
                    {mmCollaterals.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getMmColor(_entry.assetId, _entry.name, index)}
                        style={{ cursor: "pointer", outline: "none" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    {...chartTooltipProps}
                    position={mmTooltipPosition ?? undefined}
                    content={({ active, payload, coordinate }) => (
                      <ChartTooltipContentWithPosition
                        active={active}
                        coordinate={coordinate}
                        onPositionChange={setMmTooltipPosition}
                        payload={
                          payload?.map((p) => ({
                            ...p,
                            dataKey: p.name,
                            value: p.value as number,
                            color: p.payload?.fill || (p as any).color,
                            assetId: p.payload?.assetId,
                          })) as any
                        }
                        label=""
                        valueFormatter={(v) => formatUSD(v)}
                      />
                    )}
                    cursor={chartCursorStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
              <SDonutInner>
                <Text fs={15} fw={500} color="text.medium">
                  Total
                </Text>
                <Text
                  fs={22}
                  fw={500}
                  color="text.primary"
                  style={{ fontFamily: "Gazpacho, sans-serif" }}
                >
                  {formatUSD(mmTotalCollateral)}
                </Text>
              </SDonutInner>
            </SDonutWrapper>

            <Flex
              direction="column"
              justify="space-between"
              style={{ flex: 1, minWidth: 0 }}
            >
              <Flex direction="column" gap={4}>
                <Text fs={18} fw={500} font="primary" color="text.primary">
                  Backing via Money Market
                </Text>
                <Text fs={13} color="text.medium">
                  Overcollateralized proportional backing
                </Text>
              </Flex>

              <ValueStats
                font="primary"
                wrap={true}
                customLabel={
                  <Text
                    fs={11}
                    fw={500}
                    color="text.medium"
                    css={{
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Collateral Ratio
                  </Text>
                }
                customValue={
                  <ValueStatsValue
                    font="primary"
                    style={{ color: theme.details.values.positive }}
                  >
                    {mmOvercollateralization}x
                  </ValueStatsValue>
                }
              />

              <Flex direction="column" gap={8}>
                {mmCollaterals.map((item, index) => {
                  const pct =
                    mmTotalCollateral > 0
                      ? ((item.value / mmTotalCollateral) * 100).toFixed(1)
                      : "0"
                  return (
                    <React.Fragment key={item.name}>
                      {index > 0 && <SDivider />}
                      <Flex
                        justify="space-between"
                        align="center"
                        onMouseEnter={() => setMmActiveIndex(index)}
                        onMouseLeave={clearMmHover}
                        style={{
                          padding: "6px 8px",
                          margin: "-6px -8px",
                          borderRadius: 10,
                          background:
                            mmActiveIndex === index
                              ? theme.surfaces.containers.dim.dimOnHigh
                              : "transparent",
                          transition:
                            "background 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <Flex align="center" gap={8}>
                          {item.assetId ? (
                            <AssetLogo id={item.assetId} size="small" />
                          ) : (
                            <SLegendDot
                              $color={getMmColor(
                                item.assetId,
                                item.name,
                                index,
                              )}
                            />
                          )}
                          <Text fs={13} color="text.medium">
                            {item.name}
                          </Text>
                        </Flex>
                        <Flex align="center" gap={12}>
                          <Text fs={13} color="text.primary">
                            {formatUSD(item.value)}
                          </Text>
                          <Text
                            fs={12}
                            color="text.medium"
                            style={{
                              opacity: 0.7,
                              width: 38,
                              textAlign: "right",
                            }}
                          >
                            {pct}%
                          </Text>
                        </Flex>
                      </Flex>
                    </React.Fragment>
                  )
                })}
              </Flex>
            </Flex>
          </SCardInner>
        </SCard>

        {/* HSM Collateral */}
        <SCard>
          <SCardInner>
            <SDonutWrapper>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hsmCollaterals}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={115}
                    activeIndex={hsmActiveIndex ?? undefined}
                    activeShape={hsmHoveredSlice}
                    isAnimationActive={true}
                    animationDuration={HOLLAR_SLICE_MOTION.hsm.duration}
                    animationEasing={HOLLAR_SLICE_MOTION.hsm.easing}
                    stroke="none"
                    paddingAngle={4}
                    cornerRadius={6}
                    dataKey="value"
                    onMouseEnter={(_, index) => setHsmActiveIndex(index)}
                    onMouseLeave={clearHsmHover}
                  >
                    {hsmCollaterals.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getHsmColor(_entry.assetId, _entry.name, index)}
                        style={{ cursor: "pointer", outline: "none" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    {...chartTooltipProps}
                    position={hsmTooltipPosition ?? undefined}
                    content={({ active, payload, coordinate }) => (
                      <ChartTooltipContentWithPosition
                        active={active}
                        coordinate={coordinate}
                        onPositionChange={setHsmTooltipPosition}
                        payload={
                          payload?.map((p) => ({
                            ...p,
                            dataKey: p.name,
                            value: p.value as number,
                            color: p.payload?.fill || (p as any).color,
                            assetId: p.payload?.assetId,
                          })) as any
                        }
                        label=""
                        valueFormatter={(v) => formatUSD(v)}
                      />
                    )}
                    cursor={chartCursorStyle}
                  />
                </PieChart>
              </ResponsiveContainer>
              <SDonutInner>
                <Text fs={15} fw={500} color="text.medium">
                  1:1 Backed
                </Text>
                <Text
                  fs={22}
                  fw={500}
                  color="text.primary"
                  style={{ fontFamily: "Gazpacho, sans-serif" }}
                >
                  {formatUSD(hsmTotal)}
                </Text>
              </SDonutInner>
            </SDonutWrapper>

            <Flex
              direction="column"
              justify="space-between"
              style={{ flex: 1, minWidth: 0 }}
            >
              <Flex direction="column" gap={4}>
                <Text fs={18} fw={500} font="primary" color="text.primary">
                  Backing via HSM
                </Text>
                <Text fs={13} color="text.medium">
                  1:1 backing from Stablepool deposits
                </Text>
              </Flex>

              <ValueStats
                font="primary"
                wrap={true}
                customLabel={
                  <Text
                    fs={11}
                    fw={500}
                    color="text.medium"
                    css={{
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Backing Ratio
                  </Text>
                }
                customValue={
                  <ValueStatsValue
                    font="primary"
                    style={{ color: theme.details.values.positive }}
                  >
                    1:1
                  </ValueStatsValue>
                }
              />

              <Flex direction="column" gap={8}>
                {hsmCollaterals.map((item, index) => {
                  const pct =
                    hsmTotal > 0
                      ? ((item.value / hsmTotal) * 100).toFixed(1)
                      : "0"
                  const assetId = HSM_ASSET_IDS[item.name]
                  return (
                    <React.Fragment key={item.name}>
                      {index > 0 && <SDivider />}
                      <Flex
                        justify="space-between"
                        align="center"
                        onMouseEnter={() => setHsmActiveIndex(index)}
                        onMouseLeave={clearHsmHover}
                        style={{
                          padding: "6px 8px",
                          margin: "-6px -8px",
                          borderRadius: 10,
                          background:
                            hsmActiveIndex === index
                              ? theme.surfaces.containers.dim.dimOnHigh
                              : "transparent",
                          transition:
                            "background 180ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        <Flex align="center" gap={8}>
                          {assetId ? (
                            <AssetLogo id={assetId} size="small" />
                          ) : (
                            <SLegendDot
                              $color={getHsmColor(assetId, item.name, index)}
                            />
                          )}
                          <Text fs={13} color="text.medium">
                            {item.name}
                          </Text>
                        </Flex>
                        <Flex align="center" gap={12}>
                          <Text fs={13} color="text.primary">
                            {formatUSD(item.value)}
                          </Text>
                          <Text
                            fs={12}
                            color="text.medium"
                            style={{
                              opacity: 0.7,
                              width: 38,
                              textAlign: "right",
                            }}
                          >
                            {pct}%
                          </Text>
                        </Flex>
                      </Flex>
                    </React.Fragment>
                  )
                })}
              </Flex>
            </Flex>
          </SCardInner>
        </SCard>
      </SGrid>
    </Flex>
  )
}
