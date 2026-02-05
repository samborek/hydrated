import {
    ComputedReserveData,
    useWalletData,
} from "@galacticcouncil/money-market/hooks"
import { Box, Button, Flex, Stack, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC, useMemo, useState } from "react"
import { toast } from "sonner"

import { getReserveAssetId } from "@/modules/borrow/utils/assets"

import { useMultiplySimulationStore } from "../../states/useMultiplySimulationStore"
import {
    SMultiplyFormContainer,
    SMultiplySectionSeparator,
} from "./MultiplySidePanel.styled"
import { MultiplySidePanelAssetInput } from "./MultiplySidePanelAssetInput"
import { MultiplySidePanelLeverage } from "./MultiplySidePanelLeverage"
import { MultiplySidePanelSummary } from "./MultiplySidePanelSummary"

export type MultiplySidePanelProps = {
    collateralAsset: ComputedReserveData
    debtAsset: ComputedReserveData
}

export const MultiplySidePanel: FC<MultiplySidePanelProps> = ({
    collateralAsset,
    debtAsset,
}) => {
    const { themeProps: theme } = useTheme()
    const [leverage, setLeverage] = useState(2.0)
    const [collateralAmount, setCollateralAmount] = useState("")
    const [strategy, setStrategy] = useState<"bull" | "bear">("bull")

    // Get wallet balance for the collateral asset
    const { balance, maxAmountToSupply } = useWalletData(collateralAsset)

    // Get position store for adding positions
    const { addPosition } = useMultiplySimulationStore()

    // Calculate all trading values
    const calculations = useMemo(() => {
        const collateralValue = Number(collateralAmount || 0)
        const buyingPower = collateralValue * leverage

        // Get asset prices (fallback to mock values)
        const collateralPrice = Number(collateralAsset?.priceInUSD) || 1000
        const debtPrice = Number(debtAsset?.priceInUSD) || 1

        // Calculate debt amount (what we borrow)
        const borrowedValueUsd = (buyingPower - collateralValue) * collateralPrice
        const debtAmount = borrowedValueUsd / debtPrice

        // Calculate USD values
        const collateralUsd = collateralValue * collateralPrice
        const buyingPowerUsd = buyingPower * collateralPrice

        // APY calculations
        const supplyApy = Number(collateralAsset?.supplyAPY) || 0.12
        const borrowApy = Number(debtAsset?.variableBorrowAPY) || 0.05
        const netApy = (supplyApy + (supplyApy - borrowApy) * (leverage - 1)) * 100

        // Profit estimation (for display - simplified)
        const estimatedProfitUsd = (buyingPowerUsd * (netApy / 100)) / 12 // Monthly estimate

        // Fees (0.1% of buying power)
        const totalFees = buyingPowerUsd * 0.001

        return {
            collateralValue,
            buyingPower,
            buyingPowerUsd,
            debtAmount,
            debtAmountUsd: borrowedValueUsd,
            collateralUsd,
            collateralPrice,
            supplyApy,
            borrowApy,
            netApy,
            estimatedProfitUsd,
            totalFees,
        }
    }, [collateralAmount, leverage, collateralAsset, debtAsset])

    const handleOpenPosition = () => {
        if (!collateralAmount || Number(collateralAmount) <= 0) {
            toast.error("Please enter a collateral amount")
            return
        }

        // Add position to the simulation store
        addPosition({
            collateralAsset: {
                id: getReserveAssetId(collateralAsset),
                symbol: collateralAsset?.symbol || "PRIME",
            },
            debtAsset: {
                id: getReserveAssetId(debtAsset),
                symbol: debtAsset?.symbol || "USDC",
            },
            leverage,
            collateralAmount,
            debtAmount: calculations.debtAmount.toFixed(2),
            netApy: calculations.netApy,
        })

        toast.success(
            `Position opened: ${calculations.buyingPower.toFixed(2)} ${collateralAsset?.symbol} @ ${leverage}x`,
            {
                description: `Net APY: ${calculations.netApy.toFixed(2)}%`,
            },
        )

        // Reset form
        setCollateralAmount("")
    }

    // Determine colors based on strategy
    const strategyColor =
        strategy === "bull"
            ? theme.accents.success.emphasis
            : theme.accents.danger.emphasis
    const strategyBgColor =
        strategy === "bull" ? "rgba(116,199,66,0.1)" : "rgba(255,44,35,0.1)"
    const strategyBorderColor =
        strategy === "bull" ? "rgba(116,199,66,0.3)" : "rgba(255,44,35,0.3)"

    return (
        <SMultiplyFormContainer>
            <Stack
                gap={getTokenPx("containers.paddings.primary")(theme as any)}
                sx={{
                    pt: 0,
                    pb: getTokenPx("scales.paddings.xl")(theme as any),
                    maxWidth: 420,
                    minWidth: 350,
                    width: "100%",
                }}
            >
                {/* Input */}
                <MultiplySidePanelAssetInput
                    value={collateralAmount}
                    onChange={setCollateralAmount}
                    asset={collateralAsset}
                    balance={balance?.amount}
                    maxBalance={maxAmountToSupply}
                />

                <SMultiplySectionSeparator />

                {/* Leverage */}
                <MultiplySidePanelLeverage
                    value={leverage}
                    onChange={setLeverage}
                    min={1.1}
                    max={5}
                />

                <SMultiplySectionSeparator />

                {/* Strategy Toggle */}
                <Flex gap={getTokenPx("scales.paddings.m")(theme as any)}>
                    <Button
                        variant={strategy === "bull" ? "primary" : "secondary"}
                        sx={{
                            flex: 1,
                            bg:
                                strategy === "bull"
                                    ? theme.accents.success.emphasis
                                    : theme.buttons.primary.low.rest,
                            color:
                                strategy === "bull"
                                    ? theme.accents.success.onEmphasis
                                    : theme.buttons.primary.low.onButton,
                            borderRadius: "32px",
                            height: "40px",
                            "&:hover:not(:disabled):not([aria-disabled='true'])": {
                                bg: theme.accents.success.primary,
                            },
                        }}
                        onClick={() => setStrategy("bull")}
                    >
                        <Flex
                            align="center"
                            gap={getTokenPx("scales.paddings.xs")(theme as any)}
                        >
                            <ArrowUp size={14} />
                            Bull (Long)
                        </Flex>
                    </Button>
                    <Button
                        variant={strategy === "bear" ? "primary" : "secondary"}
                        sx={{
                            flex: 1,
                            bg:
                                strategy === "bear"
                                    ? theme.accents.danger.emphasis
                                    : theme.buttons.primary.low.rest,
                            color:
                                strategy === "bear"
                                    ? theme.accents.danger.onPrimary
                                    : theme.buttons.primary.low.onButton,
                            borderRadius: "32px",
                            height: "40px",
                            "&:hover:not(:disabled):not([aria-disabled='true'])": {
                                bg: theme.accents.danger.secondary,
                            },
                        }}
                        onClick={() => setStrategy("bear")}
                    >
                        <Flex
                            align="center"
                            gap={getTokenPx("scales.paddings.xs")(theme as any)}
                        >
                            <ArrowDown size={14} />
                            Bear (Short)
                        </Flex>
                    </Button>
                </Flex>

                {/* Trade Info Box - Dynamic */}
                <Box
                    sx={{
                        bg: strategyBgColor,
                        border: `1px solid ${strategyBorderColor}`,
                        borderRadius: "8px",
                        p: "12px 16px",
                    }}
                >
                    <Flex justify="space-between" align="start">
                        <Stack gap={0}>
                            <Text fs="p3" fw={500} color={theme.text.high} align="left">
                                {strategy === "bull" ? "Long" : "Short"}
                            </Text>
                            <Text fs="p5" color={theme.text.medium} fw={400}>
                                {leverage}x Leverage
                            </Text>
                        </Stack>
                        <Stack gap={2} align="flex-end">
                            <Text fs="p2" fw={600} color={theme.text.high}>
                                {calculations.buyingPower > 0
                                    ? calculations.buyingPower.toFixed(2)
                                    : "0.00"}{" "}
                                {collateralAsset?.symbol || "PRIME"}
                            </Text>
                            <Flex gap={2} align="center">
                                <Text fs="p6" color={theme.text.high}>
                                    ≈ $
                                    {calculations.buyingPowerUsd > 0
                                        ? calculations.buyingPowerUsd.toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                        })
                                        : "0.00"}
                                </Text>
                                {calculations.estimatedProfitUsd > 0 && (
                                    <Text fs="p6" fw={600} color={strategyColor}>
                                        (+${calculations.estimatedProfitUsd.toFixed(2)}/mo)
                                    </Text>
                                )}
                            </Flex>
                        </Stack>
                    </Flex>
                </Box>

                {/* Summary - Now with dynamic values */}
                <MultiplySidePanelSummary
                    collateralAsset={collateralAsset}
                    debtAsset={debtAsset}
                    leverage={leverage}
                    netApy={calculations.netApy}
                    buyingPower={calculations.buyingPower}
                    debtAmount={calculations.debtAmount}
                    collateralPrice={calculations.collateralPrice}
                />

                <SMultiplySectionSeparator />

                {/* Open Position Button */}
                <Button
                    size="large"
                    onClick={handleOpenPosition}
                    disabled={!collateralAmount || Number(collateralAmount) <= 0}
                    sx={{
                        width: "100%",
                        bg: theme.buttons.primary.high.rest,
                        color: theme.buttons.primary.high.onButton,
                        borderRadius: "32px",
                        "&:disabled": {
                            opacity: 0.5,
                            cursor: "not-allowed",
                        },
                    }}
                >
                    {collateralAmount && Number(collateralAmount) > 0
                        ? `Open ${leverage}x Position`
                        : "Enter amount to continue"}
                </Button>
            </Stack>
        </SMultiplyFormContainer>
    )
}
