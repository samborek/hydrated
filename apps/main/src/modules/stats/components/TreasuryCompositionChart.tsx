import styled from "@emotion/styled"
import { Flex, Text, Tooltip } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"

type Segment = {
  assetId: string
  name: string
  color: string
  usdValue: number
  balance: string
}

// Mock data — replace with live treasury indexer data when available
const SEGMENTS: Segment[] = [
  { assetId: "0",   name: "HDX",   color: "#e53784", usdValue: 6_208_203, balance: "2,020,204,791" },
  { assetId: "100", name: "Pools", color: "#019efe", usdValue: 3_031_922, balance: "—" },
  { assetId: "1",   name: "H2O",   color: "#16f3ad", usdValue: 1_116_451, balance: "147,501" },
  { assetId: "5",   name: "DOT",   color: "#8d71ff", usdValue: 999_418,   balance: "781,107" },
  { assetId: "420", name: "GETH",  color: "#086be7", usdValue: 897_231,   balance: "382.6874" },
  { assetId: "10",  name: "USDT",  color: "#f09241", usdValue: 526_302,   balance: "526,302" },
  { assetId: "15",  name: "vDOT",  color: "#d1ff51", usdValue: 424_923,   balance: "418,715" },
  { assetId: "22",  name: "USDC",  color: "#2775ca", usdValue: 380_554,   balance: "380,554" },
  { assetId: "11",  name: "WBTC",  color: "#f7931a", usdValue: 380_554,   balance: "5.0023" },
]

const MIN_LOGO_PCT = 3.5

const SBar = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 10px;
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
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  &:hover {
    transform: scaleY(1.12);
    z-index: 2;
  }
`

const SSegmentInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  transition: transform 0.15s ease;

  ${SSegment}:hover & {
    transform: scaleY(0.8929);
  }
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

function formatUsd(n: number): string {
  return "$" + n.toLocaleString("en-US")
}

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
            <Tooltip
              key={seg.assetId}
              side="top"
              align="center"
              asChild
              text={
                <Flex direction="column" gap={6}>
                  <Flex gap={8} align="center" sx={{ mb: 2 }}>
                    <AssetLogo id={seg.assetId} size="small" />
                    <Text fs={13} fw={600} color={getToken("text.high")}>
                      {seg.name}
                    </Text>
                    <Text fs={12} fw={400} color={getToken("text.medium")}>
                      {pct.toFixed(1)}%
                    </Text>
                  </Flex>
                  <Flex gap={24} justify="space-between">
                    <Text fs={12} fw={400} color={getToken("text.medium")}>
                      Balance
                    </Text>
                    <Text fs={12} fw={500} color={getToken("text.high")}>
                      {seg.balance}
                    </Text>
                  </Flex>
                  <Flex gap={24} justify="space-between">
                    <Text fs={12} fw={400} color={getToken("text.medium")}>
                      Value
                    </Text>
                    <Text fs={12} fw={500} color={getToken("text.high")}>
                      {formatUsd(seg.usdValue)}
                    </Text>
                  </Flex>
                </Flex>
              }
            >
              <SSegment $color={seg.color} $pct={pct}>
                <SSegmentInner>
                  {pct >= MIN_LOGO_PCT && (
                    <AssetLogo id={seg.assetId} size="small" />
                  )}
                  {pct >= 5 && (
                    <Text fs={10} fw={600} color="white" css={{ lineHeight: 1 }}>
                      {pct.toFixed(1)}%
                    </Text>
                  )}
                </SSegmentInner>
              </SSegment>
            </Tooltip>
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
