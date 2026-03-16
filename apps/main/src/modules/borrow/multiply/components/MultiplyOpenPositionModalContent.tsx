import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import {
    Box,
    Button,
    Flex,
    Separator,
    Stack,
    Text,
    Slider,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { HelpCircle } from "lucide-react"
import { FC, useMemo, useState } from "react"
import { toast } from "sonner"


import { useMultiplySimulationStore } from "@/modules/borrow/multiply/states/useMultiplySimulationStore"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"
import { MultiplySidePanelSummary } from "./MultiplySidePanel/MultiplySidePanelSummary"
import { MultiplySidePanelAssetInput } from "./MultiplySidePanel/MultiplySidePanelAssetInput"

export type MultiplyOpenPositionModalContentProps = {
    collateralAsset: ComputedReserveData
    debtAsset: ComputedReserveData
    onClose: () => void
}

export const MultiplyOpenPositionModalContent: FC<
    MultiplyOpenPositionModalContentProps
> = ({ collateralAsset, debtAsset, onClose }) => {
    const { themeProps: theme } = useTheme()
    const [leverage, setLeverage] = useState(2.0)
    const [collateralAmount, setCollateralAmount] = useState("")
    const [strategy] = useState<"bull" | "bear">("bull")

    const { addPosition } = useMultiplySimulationStore()

    const calculations = useMemo(() => {
        const collateralValue = Number(collateralAmount || 0)
        const buyingPower = collateralValue * leverage
        const collateralPrice = Number(collateralAsset?.priceInUSD) || 1000
        const debtPrice = Number(debtAsset?.priceInUSD) || 1

        const borrowedValueUsd = (buyingPower - collateralValue) * collateralPrice
        const debtAmount = borrowedValueUsd / debtPrice
        const buyingPowerUsd = buyingPower * collateralPrice
        const collateralUsd = collateralValue * collateralPrice

        const supplyApy = Number(collateralAsset?.supplyAPY) || 0.12
        const borrowApy = Number(debtAsset?.variableBorrowAPY) || 0.05
        const netApy = Math.max(0, (supplyApy + (supplyApy - borrowApy) * (leverage - 1)) * 100)
        const estimatedProfitUsd = (buyingPowerUsd * (netApy / 100)) / 12

        return {
            collateralValue,
            buyingPower,
            buyingPowerUsd,
            debtAmount,
            debtAmountUsd: borrowedValueUsd,
            collateralUsd,
            collateralPrice,
            netApy,
            estimatedProfitUsd,
        }
    }, [collateralAmount, leverage, collateralAsset, debtAsset])

    const handleOpenPosition = () => {
        if (!collateralAmount || Number(collateralAmount) <= 0) {
            toast.error("Please enter a collateral amount")
            return
        }

        addPosition({
            collateralAsset: {
                id: getReserveAssetId(collateralAsset),
                symbol: collateralAsset?.symbol || "PRIME",
            },
            debtAsset: {
                id: getReserveAssetId(debtAsset),
                symbol:
                    debtAsset?.symbol === "HOLLAR" || debtAsset?.symbol === "CASH"
                        ? "HUSD"
                        : debtAsset?.symbol || "USDC",
            },
            leverage,
            collateralAmount,
            debtAmount: calculations.debtAmount.toFixed(2),
            netApy: calculations.netApy,
            strategy,
            entryPrice: calculations.collateralPrice.toString(),
            liquidationPrice: (
                calculations.collateralPrice *
                (1 - 1 / leverage + 0.05)
            ).toString(),
        })

        toast.success(`Position opened!`, {
            description: `${calculations.buyingPower.toFixed(2)} ${collateralAsset?.symbol} @ ${leverage}x`,
        })

        onClose()
    }

    // Variables removed

    return (
        <Stack gap={getTokenPx("scales.paddings.l")(theme as never)} sx={{ pt: 0 }}>
            {/* Deposit Input */}
            <MultiplySidePanelAssetInput
                value={collateralAmount}
                onChange={setCollateralAmount}
                asset={collateralAsset}
                balance="0"
                maxBalance="0"
            />

            <Separator />

            {/* Leverage */}
            <Box>
                <Flex
                    justify="space-between"
                    align="center"
                    mb={getTokenPx("scales.paddings.m")(theme as never)}
                >
                    <Text fs="p3" fw={500} color={theme.text.high}>
                        Leverage
                    </Text>
                    <Flex
                        align="center"
                        gap={getTokenPx("scales.paddings.s")(theme as never)}
                    >
                        <Text fs="p5" color={theme.text.medium}>
                            Current:{" "}
                            <span style={{ color: theme.text.high }}>
                                x{leverage.toFixed(1)}
                            </span>
                        </Text>
                        <HelpCircle size={14} color={theme.text.low} />
                    </Flex>
                </Flex>
                <Box sx={{ py: 8 }}>
                    <Slider
                        min={1.1}
                        max={5}
                        step={0.1}
                        value={leverage}
                        onChange={setLeverage}
                    />
                </Box>
                <Flex justify="space-between" mt={4}>
                    {[1.1, 2, 3, 4].map((mark) => (
                        <Text
                            key={mark}
                            fs="p6"
                            color={theme.text.low}
                            style={{ cursor: "pointer" }}
                            onClick={() => setLeverage(mark)}
                        >
                            {mark}x
                        </Text>
                    ))}
                </Flex>
            </Box>

            <Separator />



            <Box
                sx={{
                    bg: theme.buttons.secondary.outline.fill,
                    border: `1px solid ${theme.buttons.secondary.outline.outline}`,
                    borderRadius: getTokenPx("scales.cornerRadius.m")(theme as never),
                    px: getTokenPx("scales.paddings.m")(theme as never),
                    py: getTokenPx("scales.paddings.l")(theme as never),
                }}
            >
                <Flex justify="space-between" align="start">
                    <Stack gap={0}>
                        <Text fs="p3" fw={500} color={theme.text.high}>
                            Leverage
                        </Text>
                        <Text fs="p5" color={theme.text.medium}>
                            {leverage}x Leverage
                        </Text>
                    </Stack>
                    <Stack gap={2} align="flex-end">
                        <Text fs="p2" fw={600} color={theme.text.high}>
                            {calculations.buyingPower.toFixed(2)} {collateralAsset.symbol}
                        </Text>
                        <Flex gap={2} align="center">
                            <Text fs="p6" color={theme.text.high}>
                                ≈ ${calculations.buyingPowerUsd.toLocaleString()}
                            </Text>
                            {calculations.estimatedProfitUsd > 0 && (
                                <Text fs="p6" fw={600} color={theme.accents.success.emphasis}>
                                    (+${calculations.estimatedProfitUsd.toFixed(2)}/mo)
                                </Text>
                            )}
                        </Flex>
                    </Stack>
                </Flex>
            </Box>

            {/* Footer Info */}
            <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
                <MultiplySidePanelSummary
                    collateralAsset={collateralAsset}
                    debtAsset={debtAsset}
                    leverage={leverage}
                    netApy={calculations.netApy}
                    buyingPower={calculations.buyingPower}
                    debtAmount={calculations.debtAmount}
                    collateralPrice={calculations.collateralPrice}
                />
            </Stack>

            <Flex
                sx={{
                    position: "sticky",
                    bottom: Number(getTokenPx("containers.paddings.primary")(theme as never)) * -1,
                    left: Number(getTokenPx("containers.paddings.primary")(theme as never)) * -1,
                    right: Number(getTokenPx("containers.paddings.primary")(theme as never)) * -1,
                    bg: theme.surfaces.themeBasePalette.surfaceHigh,
                    p: getTokenPx("containers.paddings.primary")(theme as never),
                    borderTop: `1px solid ${theme.details.separators}`,
                    zIndex: 10,
                    marginInline:
                        Number(getTokenPx("containers.paddings.primary")(theme as never)) * -1,
                    marginBottom:
                        Number(getTokenPx("containers.paddings.primary")(theme as never)) * -1,
                }}
            >
                <Button
                    size="large"
                    variant="primary"
                    onClick={handleOpenPosition}
                    disabled={!collateralAmount || Number(collateralAmount) <= 0}
                    sx={{
                        width: "100%",
                        bg: theme.buttons.primary.high.rest,
                        color: theme.buttons.primary.high.onButton,
                        borderRadius: "32px",
                    }}
                >
                    {collateralAmount ? "Open position" : "Enter amount to continue"}
                </Button>
            </Flex>
        </Stack>
    )
}
