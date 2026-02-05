import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import { Box, Button, Flex, Stack, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC, useState } from "react"
import { toast } from "sonner"

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

    // Mock calculations
    const buyingPower = Number(collateralAmount || 0) * leverage
    const debtAmount = (buyingPower - Number(collateralAmount || 0)) * 0.5
    const supplyApy = Number(collateralAsset?.supplyAPY) || 0.12
    const borrowApy = Number(debtAsset?.variableBorrowAPY) || 0.05
    const netApy = (supplyApy + (supplyApy - borrowApy) * (leverage - 1)) * 100

    const handleOpenPosition = () => {
        if (!collateralAmount) {
            // allow empty for simulation view only
        }
        toast.success("Position opening...")
    }

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

                {/* Trade Info Box */}
                <Box
                    sx={{
                        bg: "rgba(116,199,66,0.1)",
                        border: `1px solid rgba(116,199,66,0.3)`,
                        borderRadius: "8px",
                        p: "12px 16px",
                    }}
                >
                    <Flex justify="space-between" align="start">
                        <Stack gap={0}>
                            <Text fs="p3" fw={500} color={theme.text.high} align="left">
                                Long
                            </Text>
                            <Text fs="p5" color={theme.text.medium} fw={400}>
                                {leverage}x Leverage
                            </Text>
                        </Stack>
                        <Stack gap={2} align="flex-end">
                            <Text fs="p2" fw={600} color={theme.text.high}>
                                {buyingPower > 0 ? buyingPower.toFixed(2) : "4500.45"}{" "}
                                {collateralAsset?.symbol || "PRIME"}
                            </Text>
                            <Flex gap={2} align="center">
                                <Text fs="p6" color={theme.text.high}>
                                    ≈ {debtAmount > 0 ? debtAmount.toFixed(2) : "855.24"} USD
                                </Text>
                                <Text fs="p6" fw={600} color={theme.accents.success.emphasis}>
                                    {" "}
                                    (+$200.45)
                                </Text>
                            </Flex>
                        </Stack>
                    </Flex>
                </Box>

                {/* Summary */}
                <MultiplySidePanelSummary
                    collateralAsset={collateralAsset}
                    debtAsset={debtAsset}
                    leverage={leverage}
                    netApy={netApy}
                    buyingPower={buyingPower}
                    debtAmount={debtAmount}
                />

                <SMultiplySectionSeparator />

                {/* Open Position Button */}
                <Button
                    size="large"
                    onClick={handleOpenPosition}
                    sx={{
                        width: "100%",
                        bg: theme.buttons.primary.high.rest,
                        color: theme.buttons.primary.high.onButton,
                        borderRadius: "32px",
                    }}
                >
                    Open position
                </Button>
            </Stack>
        </SMultiplyFormContainer>
    )
}
