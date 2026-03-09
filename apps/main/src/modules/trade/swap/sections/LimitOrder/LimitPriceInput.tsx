import { Chip, Icon, Text, Toggle } from "@galacticcouncil/ui/components"
import { ArrowRightLeftIcon } from "@galacticcouncil/ui/assets/icons"
import { FC, useCallback, useMemo } from "react"
import { useFormContext } from "react-hook-form"

import { SwapSectionSeparator } from "@/modules/trade/swap/SwapPage.styled"

import { LimitOrderFormValues } from "./useLimitOrderForm"

import {
    SLimitPriceSection,
    SLimitPriceHeader,
    SPresetButtonsRow,
    SPresetButton,
    SLimitPriceRow,
    SRateSwitcher,
    SSwapIconButton,
    SPriceInput,
    STPSLSection,
    STPSLToggleRow,
    STPSLPriceSection,
    STPSLPriceHeader,
    STPSLPriceRow,
    STPSLPriceLabel,
} from "./LimitPriceInput.styled"

const PRESETS = [
    { key: "-3", label: "-3%", factor: -0.03 },
    { key: "-1", label: "-1%", factor: -0.01 },
    { key: "market", label: "", factor: 0 },
    { key: "+3", label: "+3%", factor: 0.03 },
    { key: "+5", label: "+5%", factor: 0.05 },
] as const

type PriceSignal = "takeProfit" | "stopLoss" | null

type Props = {
    readonly sellSymbol: string
    readonly buySymbol: string
    readonly activePreset: string | null
    readonly isInverted: boolean
    readonly marketPrice?: number
    readonly onPresetClick: (key: string, factor: number) => void
    readonly onToggleDirection: () => void
    readonly onPriceChange: (value: string) => void
}

export const LimitPriceInput: FC<Props> = ({
    sellSymbol,
    buySymbol,
    activePreset,
    isInverted,
    marketPrice,
    onPresetClick,
    onToggleDirection,
    onPriceChange,
}) => {
    const { watch, setValue } = useFormContext<LimitOrderFormValues>()

    const limitPrice = watch("limitPrice")
    const stopLossEnabled = watch("stopLossEnabled")
    const stopLossPrice = watch("stopLossPrice")
    const takeProfitEnabled = watch("takeProfitEnabled")
    const takeProfitPrice = watch("takeProfitPrice")

    // When normal: "1 SELL = X BUY" — label shows BUY symbol
    // When inverted: "1 BUY = X SELL" — label shows SELL symbol

    const toSymbol = isInverted ? sellSymbol : buySymbol

    const priceSignal: PriceSignal = useMemo(() => {
        const numPrice = Number(limitPrice)
        if (!marketPrice || !numPrice || numPrice === 0) return null

        if (isInverted) {
            const invertedMarket = 1 / marketPrice
            if (numPrice < invertedMarket) return "takeProfit"
            if (numPrice > invertedMarket) return "stopLoss"
        } else {
            if (numPrice > marketPrice) return "takeProfit"
            if (numPrice < marketPrice) return "stopLoss"
        }

        return null
    }, [limitPrice, marketPrice, isInverted])

    const handleTPSLPriceChange = useCallback(
        (field: "stopLossPrice" | "takeProfitPrice", value: string) => {
            if (value !== "" && !/^\d*\.?\d*$/.test(value)) return
            setValue(field, value)
        },
        [setValue],
    )

    return (
        <SLimitPriceSection>
            <SLimitPriceHeader>
                <div css={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Text fs="p5" color="text.medium" fw={500}>
                        Limit price
                    </Text>
                    {priceSignal === "takeProfit" && (
                        <Chip variant="green" size="medium" css={{ textTransform: "uppercase" }}>
                            Take Profit
                        </Chip>
                    )}
                    {priceSignal === "stopLoss" && (
                        <Chip
                            variant="danger"
                            size="medium"
                            css={{
                                textTransform: "uppercase",
                            }}
                        >
                            Stop Loss
                        </Chip>
                    )}
                </div>
                <SPresetButtonsRow>
                    {PRESETS.map((preset) => (
                        <SPresetButton
                            key={preset.key}
                            type="button"
                            isActive={activePreset === preset.key}
                            onClick={() => onPresetClick(preset.key, preset.factor)}
                        >
                            {preset.key === "market" ? "MARKET" : preset.label}
                        </SPresetButton>
                    ))}
                </SPresetButtonsRow>
            </SLimitPriceHeader>
            <SLimitPriceRow>
                <SRateSwitcher type="button" onClick={onToggleDirection}>
                    <SSwapIconButton>
                        <Icon size="xs" component={ArrowRightLeftIcon} />
                    </SSwapIconButton>
                    <Text fs="p3" fw={600} color="text.high">
                        {toSymbol}
                    </Text>
                </SRateSwitcher>
                <SPriceInput
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={limitPrice}
                    onChange={(e) => onPriceChange(e.target.value)}
                />
            </SLimitPriceRow>

            {/* Additional TP / SL toggle - shows opposite of main limit price signal */}
            {priceSignal && (
                <>
                    <SwapSectionSeparator />
                    <STPSLSection>
                        {priceSignal === "takeProfit" && (
                            <>
                                <STPSLToggleRow
                                    type="button"
                                    onClick={() => {
                                        const newValue = !stopLossEnabled
                                        setValue("stopLossEnabled", newValue)
                                        if (!newValue) setValue("stopLossPrice", "")
                                    }}
                                >
                                    <Text fs="p5" fw={500} color="text.medium">
                                        Add Stop Loss
                                    </Text>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Toggle
                                            checked={stopLossEnabled}
                                            size="medium"
                                            name="stopLossToggle"
                                            onCheckedChange={(checked: boolean) => {
                                                setValue("stopLossEnabled", checked)
                                                if (!checked) setValue("stopLossPrice", "")
                                            }}
                                        />
                                    </div>
                                </STPSLToggleRow>
                                {stopLossEnabled && (
                                    <>
                                        <SwapSectionSeparator />
                                        <STPSLPriceSection>
                                            <STPSLPriceHeader>
                                                <Text fs="p5" fw={500} color="text.medium">
                                                    Stop Loss price
                                                </Text>
                                                <SPresetButtonsRow>
                                                    {PRESETS.map((preset) => (
                                                        <SPresetButton
                                                            key={`sl-${preset.key}`}
                                                            type="button"
                                                            isActive={false}
                                                            onClick={() => {
                                                                if (marketPrice) {
                                                                    const slPrice = marketPrice * (1 + preset.factor)
                                                                    setValue("stopLossPrice", slPrice.toPrecision(6))
                                                                }
                                                            }}
                                                        >
                                                            {preset.key === "market" ? "MARKET" : preset.label}
                                                        </SPresetButton>
                                                    ))}
                                                </SPresetButtonsRow>
                                            </STPSLPriceHeader>
                                            <STPSLPriceRow>
                                                <STPSLPriceLabel type="button">
                                                    Price
                                                </STPSLPriceLabel>
                                                <SPriceInput
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="0"
                                                    value={stopLossPrice}
                                                    onChange={(e) =>
                                                        handleTPSLPriceChange("stopLossPrice", e.target.value)
                                                    }
                                                />
                                            </STPSLPriceRow>
                                        </STPSLPriceSection>
                                    </>
                                )}
                            </>
                        )}

                        {priceSignal === "stopLoss" && (
                            <>
                                <STPSLToggleRow
                                    type="button"
                                    onClick={() => {
                                        const newValue = !takeProfitEnabled
                                        setValue("takeProfitEnabled", newValue)
                                        if (!newValue) setValue("takeProfitPrice", "")
                                    }}
                                >
                                    <Text fs="p5" fw={500} color="text.medium">
                                        Add Take Profit
                                    </Text>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Toggle
                                            checked={takeProfitEnabled}
                                            size="medium"
                                            name="takeProfitToggle"
                                            onCheckedChange={(checked: boolean) => {
                                                setValue("takeProfitEnabled", checked)
                                                if (!checked) setValue("takeProfitPrice", "")
                                            }}
                                        />
                                    </div>
                                </STPSLToggleRow>
                                {takeProfitEnabled && (
                                    <>
                                        <SwapSectionSeparator />
                                        <STPSLPriceSection>
                                            <STPSLPriceHeader>
                                                <Text fs="p5" fw={500} color="text.medium">
                                                    Take Profit price
                                                </Text>
                                                <SPresetButtonsRow>
                                                    {PRESETS.map((preset) => (
                                                        <SPresetButton
                                                            key={`tp-${preset.key}`}
                                                            type="button"
                                                            isActive={false}
                                                            onClick={() => {
                                                                if (marketPrice) {
                                                                    const tpPrice = marketPrice * (1 + preset.factor)
                                                                    setValue("takeProfitPrice", tpPrice.toPrecision(6))
                                                                }
                                                            }}
                                                        >
                                                            {preset.key === "market" ? "MARKET" : preset.label}
                                                        </SPresetButton>
                                                    ))}
                                                </SPresetButtonsRow>
                                            </STPSLPriceHeader>
                                            <STPSLPriceRow>
                                                <STPSLPriceLabel type="button">
                                                    Price
                                                </STPSLPriceLabel>
                                                <SPriceInput
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder="0"
                                                    value={takeProfitPrice}
                                                    onChange={(e) =>
                                                        handleTPSLPriceChange("takeProfitPrice", e.target.value)
                                                    }
                                                />
                                            </STPSLPriceRow>
                                        </STPSLPriceSection>
                                    </>
                                )}
                            </>
                        )}
                    </STPSLSection>
                </>
            )}
        </SLimitPriceSection>
    )
}

