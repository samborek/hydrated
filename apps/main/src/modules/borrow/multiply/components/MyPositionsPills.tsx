import {
    AssetLogo as BaseAssetLogo,
    Flex,
    Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, getTokenPx, styled } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC, useState } from "react"

import eurcLogo from "@/assets/strategies/eurc_logo.svg"
import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { PositionActionsModal } from "@/modules/borrow/multiply/components/PositionActionsModal"
import {
    SimulatedPosition,
    useMultiplySimulationStore,
} from "@/modules/borrow/multiply/states/useMultiplySimulationStore"

const SPositionPill = styled.button(
    ({ theme }) => css`
    display: inline-flex;
    align-items: center;
    gap: ${theme.scales.paddings.s}px;
    padding: ${theme.scales.paddings.s}px ${theme.scales.paddings.m}px;
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.radii.full}px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
      border-color: ${theme.details.separators};
    }
  `,
)

const SDirectionBadge = styled.span<{ $isBull: boolean }>(
    ({ theme, $isBull }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: ${theme.radii.full}px;
    background: ${$isBull
            ? theme.accents.success.emphasis
            : theme.accents.danger.emphasis};
    color: ${$isBull
            ? theme.accents.success.onEmphasis
            : theme.accents.danger.onPrimary};
  `,
)

type PositionPillProps = {
    position: SimulatedPosition
    onClick: () => void
}

const PositionPill: FC<PositionPillProps> = ({ position, onClick }) => {
    const { themeProps: theme } = useTheme()
    const p = position
    const isPrime = p.collateralAsset.symbol === "PRIME"
    const isBull = p.strategy === "bull" || !p.strategy

    // Mock P&L calculation
    const mockPnl = p.pnl ? Number(p.pnl) : Math.random() * 20 - 5
    const isPositive = mockPnl >= 0

    return (
        <SPositionPill onClick={onClick}>
            {/* Asset icons */}
            <Flex>
                {isPrime ? (
                    <BaseAssetLogo src={primeLogo} size="extra-small" alt="PRIME" />
                ) : p.collateralAsset.symbol === "EURC" ? (
                    <img src={eurcLogo} alt="EURC" style={{ width: 16, height: 16 }} />
                ) : (
                    <AssetLogo id={p.collateralAsset.id} size="extra-small" />
                )}
                <div style={{ marginLeft: -4 }}>
                    {p.debtAsset.symbol === "HUSD" || p.debtAsset.symbol === "CASH" ? (
                        <AssetLogo id={HOLLAR_ASSET_ID} size="extra-small" />
                    ) : p.debtAsset.symbol === "EURC" ? (
                        <img src={eurcLogo} alt="EURC" style={{ width: 16, height: 16 }} />
                    ) : (
                        <AssetLogo id={p.debtAsset.id} size="extra-small" />
                    )}
                </div>
            </Flex>

            {/* Pair name */}
            <Text fs="p5" fw={500}>
                {p.collateralAsset.symbol}/
                {p.debtAsset.symbol === "CASH" ? "HUSD" : p.debtAsset.symbol}
            </Text>

            {/* Leverage with direction */}
            <Flex align="center" gap={2}>
                <Text fs="p6" fw={500} color={theme.text.medium}>
                    {p.leverage.toFixed(1)}x
                </Text>
                <SDirectionBadge $isBull={isBull}>
                    {isBull ? (
                        <ArrowUp size={8} strokeWidth={3} />
                    ) : (
                        <ArrowDown size={8} strokeWidth={3} />
                    )}
                </SDirectionBadge>
            </Flex>

            {/* P&L */}
            <Text
                fs="p5"
                fw={600}
                color={
                    isPositive ? theme.details.values.positive : theme.details.values.negative
                }
            >
                {isPositive ? "+" : ""}{mockPnl.toFixed(1)}%
            </Text>
        </SPositionPill>
    )
}

export const MyPositionsPills: FC = () => {
    const { themeProps: theme } = useTheme()
    const { positions, removePosition, updatePosition } =
        useMultiplySimulationStore()
    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
        null,
    )

    if (positions.length === 0) return null

    const selectedPosition = positions.find((p) => p.id === selectedPositionId)

    return (
        <>
            <Flex align="center" gap={getTokenPx("scales.paddings.m")} wrap>
                <Text fs="p4" fw={500} color={theme.text.medium}>
                    Your Positions:
                </Text>
                {positions.map((position) => (
                    <PositionPill
                        key={position.id}
                        position={position}
                        onClick={() => setSelectedPositionId(position.id)}
                    />
                ))}
            </Flex>
            {selectedPosition && (
                <PositionActionsModal
                    isOpen={!!selectedPosition}
                    onClose={() => setSelectedPositionId(null)}
                    position={selectedPosition}
                    onUpdate={(updates) => updatePosition(selectedPosition.id, updates)}
                    onClosePosition={() => {
                        removePosition(selectedPosition.id)
                        setSelectedPositionId(null)
                    }}
                />
            )}
        </>
    )
}
