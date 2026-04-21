import styled from "@emotion/styled"
import { Flex, Text } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"

type Segment = {
  assetId: string
  name: string
  color: string
  usdValue: number
}

// Mock data — replace with live treasury indexer data when available
const SEGMENTS: Segment[] = [
  { assetId: "0",   name: "HDX",   color: "#e53784", usdValue: 6_208_203 },
  { assetId: "100", name: "Pools", color: "#019efe", usdValue: 3_031_922 },
  { assetId: "1",   name: "H2O",   color: "#16f3ad", usdValue: 1_116_451 },
  { assetId: "5",   name: "DOT",   color: "#8d71ff", usdValue: 999_418 },
  { assetId: "420", name: "GETH",  color: "#086be7", usdValue: 897_231 },
  { assetId: "10",  name: "USDT",  color: "#f09241", usdValue: 526_302 },
  { assetId: "15",  name: "vDOT",  color: "#d1ff51", usdValue: 424_923 },
  { assetId: "22",  name: "USDC",  color: "#2775ca", usdValue: 380_554 },
  { assetId: "11",  name: "WBTC",  color: "#f7931a", usdValue: 380_554 },
]

const MIN_LOGO_PCT = 3.5

const SBar = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  background: ${({ theme }) => theme.surfaces.containers.dim.dimOnBg};
`

const SSegment = styled.div<{ $color: string; $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
`

const SLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 14px;
`

const SDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

export const TreasuryCompositionChart: FC = () => {
  const total = SEGMENTS.reduce((s, a) => s + a.usdValue, 0)

  return (
    <div>
      <Text
        fs={11}
        fw={500}
        color={getToken("text.low")}
        css={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
        sx={{ mb: 12 }}
      >
        Composition
      </Text>

      <SBar>
        {SEGMENTS.map((seg) => {
          const pct = (seg.usdValue / total) * 100
          return (
            <SSegment key={seg.assetId} $color={seg.color} $pct={pct}>
              {pct >= MIN_LOGO_PCT && (
                <AssetLogo id={seg.assetId} size="small" />
              )}
              {pct >= 5 && (
                <Text fs={10} fw={600} color="white" css={{ lineHeight: 1 }}>
                  {pct.toFixed(1)}%
                </Text>
              )}
            </SSegment>
          )
        })}
      </SBar>

      <SLegend>
        {SEGMENTS.map((seg) => {
          const pct = (seg.usdValue / total) * 100
          return (
            <Flex key={seg.assetId} gap={6} align="center">
              <SDot $color={seg.color} />
              <Text fs={11} fw={500} color={getToken("text.low")}>
                {seg.name} {pct.toFixed(1)}%
              </Text>
            </Flex>
          )
        })}
      </SLegend>
    </div>
  )
}
