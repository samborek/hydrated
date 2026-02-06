import {
    AssetLogo as BaseAssetLogo,
    Button,
    Flex,
    SheetBody,
    SheetContent,
    SheetHeader,
    SheetRoot,
    SheetTrigger,
    Stack,
    Text,
} from "@galacticcouncil/ui/components"
import { useBreakpoints, useTheme } from "@galacticcouncil/ui/theme"
import { css, getTokenPx, styled } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { ArrowDown, ArrowUp, ChevronLeft, TrendingUp } from "lucide-react"
import { FC, useState } from "react"

import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { MultiplySidePanelLeverage } from "@/modules/borrow/multiply/components/MultiplySidePanel/MultiplySidePanelLeverage"
import {
    SimulatedPosition,
    useMultiplySimulationStore,
} from "@/modules/borrow/multiply/states/useMultiplySimulationStore"
import { toast } from "sonner"

// Indicator button styled for nav bar
const SIndicatorButton = styled.button(
    ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.scales.paddings.s}px;
    padding: ${theme.scales.paddings.s}px ${theme.scales.paddings.m}px;
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.scales.cornerRadius.l}px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
    }
  `,
)

const SPositionRow = styled.div<{ $active?: boolean }>(
    ({ theme, $active }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.scales.paddings.m}px;
    background: ${$active
            ? theme.surfaces.containers.high.hover
            : theme.surfaces.containers.low.primary};
    border-radius: ${theme.scales.cornerRadius.l}px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
    }
  `,
)

const SDirectionBadge = styled.span<{ $isBull: boolean }>(
    ({ theme, $isBull }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: ${theme.radii.full}px;
    background: ${$isBull
            ? theme.accents.success.emphasis
            : theme.accents.danger.emphasis};
    color: ${$isBull
            ? theme.accents.success.onEmphasis
            : theme.accents.danger.onPrimary};
  `,
)

// Position detail view (inline in sheet)
const PositionDetail: FC<{
    position: SimulatedPosition
    onBack: () => void
    onUpdate: (updates: Partial<SimulatedPosition>) => void
    onClosePosition: () => void
}> = ({ position, onBack, onUpdate, onClosePosition }) => {
    const { themeProps: theme } = useTheme()
    const [leverage, setLeverage] = useState(position.leverage)
    const [mode, setMode] = useState<"adjust" | "close">("adjust")

    const handleUpdate = () => {
        onUpdate({
            leverage,
            netApy: position.netApy * (leverage / position.leverage),
        })
        toast.success("Position updated", {
            description: `Leverage changed to ${leverage.toFixed(2)}x`,
        })
        onBack()
    }

    const handleClosePosition = () => {
        onClosePosition()
        toast.success("Position closed", {
            description: `Sold ${position.collateralAmount} ${position.collateralAsset.symbol}`,
        })
    }

    return (
        <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
            {/* Back button */}
            <Button
                variant="tertiary"
                size="small"
                onClick={onBack}
                sx={{ alignSelf: "flex-start", pl: 0 }}
            >
                <ChevronLeft size={16} />
                Back to Positions
            </Button>

            {/* Position header */}
            <Flex align="center" gap={getTokenPx("scales.paddings.m")}>
                <Flex>
                    {position.collateralAsset.symbol === "PRIME" ? (
                        <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
                    ) : (
                        <AssetLogo id={position.collateralAsset.id} size="medium" />
                    )}
                    <div style={{ marginLeft: -8 }}>
                        {position.debtAsset.symbol === "HUSD" ||
                            position.debtAsset.symbol === "CASH" ? (
                            <AssetLogo id={HOLLAR_ASSET_ID} size="medium" />
                        ) : (
                            <AssetLogo id={position.debtAsset.id} size="medium" />
                        )}
                    </div>
                </Flex>
                <Flex direction="column">
                    <Text fs="p2" fw={600}>
                        {position.collateralAsset.symbol}/
                        {position.debtAsset.symbol === "CASH"
                            ? "HUSD"
                            : position.debtAsset.symbol}
                    </Text>
                    <Text fs="p5" color={theme.text.low}>
                        {position.leverage.toFixed(1)}x Leverage
                    </Text>
                </Flex>
            </Flex>

            {/* Mode tabs */}
            <Flex gap={8}>
                <Button
                    size="small"
                    variant={mode === "adjust" ? "primary" : "secondary"}
                    onClick={() => setMode("adjust")}
                >
                    Adjust
                </Button>
                <Button
                    size="small"
                    variant={mode === "close" ? "danger" : "secondary"}
                    onClick={() => setMode("close")}
                >
                    Close
                </Button>
            </Flex>

            {mode === "adjust" ? (
                <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
                    <Text fs="p4" color={theme.text.medium}>
                        Adjust Leverage
                    </Text>
                    <MultiplySidePanelLeverage
                        value={leverage}
                        onChange={setLeverage}
                        min={1.1}
                        max={5}
                    />
                    <Flex justify="space-between" align="center">
                        <Text fs="p5" color={theme.text.medium}>
                            Current: {position.leverage.toFixed(2)}x
                        </Text>
                        <Text fs="p5" color={theme.accents.success.emphasis}>
                            New: {leverage.toFixed(2)}x
                        </Text>
                    </Flex>
                    <Button
                        sx={{ width: "100%" }}
                        size="large"
                        onClick={handleUpdate}
                        disabled={leverage === position.leverage}
                    >
                        Update Position
                    </Button>
                </Stack>
            ) : (
                <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
                    <div
                        style={{
                            padding: "16px",
                            background: theme.accents.danger.secondary,
                            borderRadius: "8px",
                            border: `1px solid ${theme.accents.danger.emphasis}`,
                        }}
                    >
                        <Text fs="p4" color={theme.accents.danger.onPrimary}>
                            Are you sure you want to close this position?
                        </Text>
                        <Text fs="p6" color={theme.accents.danger.onPrimary} mt={1}>
                            This will sell your collateral and repay the debt.
                        </Text>
                    </div>
                    <Button
                        sx={{ width: "100%" }}
                        size="large"
                        variant="danger"
                        onClick={handleClosePosition}
                    >
                        Confirm Close
                    </Button>
                </Stack>
            )}
        </Stack>
    )
}

// Main Positions Indicator (for nav tab bar)
export const PositionsIndicator: FC = () => {
    const { themeProps: theme } = useTheme()
    const { gte } = useBreakpoints()
    const { positions, removePosition, updatePosition } =
        useMultiplySimulationStore()
    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
        null,
    )

    if (positions.length === 0) return null

    const totalPnl = positions.reduce((acc, p) => {
        const pnl = p.pnl ? Number(p.pnl) : Math.random() * 20 - 5
        return acc + pnl
    }, 0)
    const isPositive = totalPnl >= 0
    const isMobile = !gte("sm")

    const selectedPosition = positions.find((p) => p.id === selectedPositionId)

    const handleSelectPosition = (id: string) => {
        setSelectedPositionId(id)
    }

    const handleBack = () => {
        setSelectedPositionId(null)
    }

    const handleClosePosition = (id: string) => {
        removePosition(id)
        setSelectedPositionId(null)
    }

    return (
        <SheetRoot>
            <SheetTrigger asChild>
                <SIndicatorButton>
                    <Flex
                        align="center"
                        justify="center"
                        sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "full",
                            bg: theme.accents.success.dim,
                            color: theme.accents.success.emphasis,
                        }}
                    >
                        <TrendingUp size={14} />
                    </Flex>
                    {isMobile ? (
                        <Text fs="p5" fw={600}>
                            {positions.length}
                        </Text>
                    ) : (
                        <>
                            <Text fs="p5" fw={500}>
                                {positions.length} Position{positions.length !== 1 ? "s" : ""}
                            </Text>
                            <Text
                                fs="p5"
                                fw={600}
                                color={
                                    isPositive
                                        ? theme.details.values.positive
                                        : theme.details.values.negative
                                }
                            >
                                {isPositive ? "+" : ""}${totalPnl.toFixed(2)}
                            </Text>
                        </>
                    )}
                </SIndicatorButton>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader title={selectedPosition ? "Manage Position" : "Your Positions"} />
                <SheetBody sx={{ pt: 10 }}>
                    {selectedPosition ? (
                        <PositionDetail
                            position={selectedPosition}
                            onBack={handleBack}
                            onUpdate={(updates) =>
                                updatePosition(selectedPosition.id, updates)
                            }
                            onClosePosition={() => handleClosePosition(selectedPosition.id)}
                        />
                    ) : (
                        <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
                            {/* Summary */}
                            <Flex justify="space-between" align="center">
                                <Text fs="p4" color={theme.text.medium}>
                                    {positions.length} Active Position
                                    {positions.length !== 1 ? "s" : ""}
                                </Text>
                                <Text
                                    fs="p3"
                                    fw={600}
                                    color={
                                        totalPnl >= 0
                                            ? theme.details.values.positive
                                            : theme.details.values.negative
                                    }
                                >
                                    {totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)} P&L
                                </Text>
                            </Flex>

                            {/* Position List */}
                            <Stack gap={getTokenPx("scales.paddings.s")(theme as never)}>
                                {positions.map((p) => {
                                    const isPrime = p.collateralAsset.symbol === "PRIME"
                                    const isBull = p.strategy === "bull" || !p.strategy
                                    const mockPnl = p.pnl
                                        ? Number(p.pnl)
                                        : Math.random() * 20 - 5
                                    const isPositive = mockPnl >= 0

                                    return (
                                        <SPositionRow
                                            key={p.id}
                                            onClick={() => handleSelectPosition(p.id)}
                                        >
                                            <Flex align="center" gap={getTokenPx("scales.paddings.m")}>
                                                {/* Icons */}
                                                <Flex>
                                                    {isPrime ? (
                                                        <BaseAssetLogo
                                                            src={primeLogo}
                                                            size="small"
                                                            alt="PRIME"
                                                        />
                                                    ) : (
                                                        <AssetLogo id={p.collateralAsset.id} size="small" />
                                                    )}
                                                    <div style={{ marginLeft: -6 }}>
                                                        {p.debtAsset.symbol === "HUSD" ||
                                                            p.debtAsset.symbol === "CASH" ? (
                                                            <AssetLogo id={HOLLAR_ASSET_ID} size="small" />
                                                        ) : (
                                                            <AssetLogo id={p.debtAsset.id} size="small" />
                                                        )}
                                                    </div>
                                                </Flex>

                                                {/* Pair info */}
                                                <Flex direction="column">
                                                    <Flex align="center" gap={4}>
                                                        <Text fs="p4" fw={500}>
                                                            {p.collateralAsset.symbol}/
                                                            {p.debtAsset.symbol === "CASH"
                                                                ? "HUSD"
                                                                : p.debtAsset.symbol}
                                                        </Text>
                                                        <SDirectionBadge $isBull={isBull}>
                                                            {isBull ? (
                                                                <ArrowUp size={10} strokeWidth={3} />
                                                            ) : (
                                                                <ArrowDown size={10} strokeWidth={3} />
                                                            )}
                                                        </SDirectionBadge>
                                                    </Flex>
                                                    <Text fs="p6" color={theme.text.low}>
                                                        {p.leverage.toFixed(1)}x Leverage
                                                    </Text>
                                                </Flex>
                                            </Flex>

                                            {/* P&L */}
                                            <Text
                                                fs="p4"
                                                fw={600}
                                                color={
                                                    isPositive
                                                        ? theme.details.values.positive
                                                        : theme.details.values.negative
                                                }
                                            >
                                                {isPositive ? "+" : ""}${Math.abs(mockPnl).toFixed(2)}
                                            </Text>
                                        </SPositionRow>
                                    )
                                })}
                            </Stack>
                        </Stack>
                    )}
                </SheetBody>
            </SheetContent>
        </SheetRoot>
    )
}
