import { SELL_ONLY_ASSETS } from "@galacticcouncil/utils"
import { useNavigate } from "@tanstack/react-router"
import { FC, useCallback, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { AssetSelectFormField } from "@/form/AssetSelectFormField"
import { TradeAssetSwitcher } from "@/components/AssetSwitcher/TradeAssetSwitcher"
import { useAssets } from "@/providers/assetsProvider"
import { SwapSectionSeparator } from "@/modules/trade/swap/SwapPage.styled"

import { LimitOrderFormValues } from "./useLimitOrderForm"
import { useLimitOrderStore } from "./useLimitOrderStore"
import { LimitPriceInput } from "./LimitPriceInput"

type Props = {
    readonly marketPrice: number
}

export const LimitOrderFields: FC<Props> = ({ marketPrice }) => {
    const { t } = useTranslation(["common", "trade"])
    const { tradable } = useAssets()
    const navigate = useNavigate()
    const setPreviewPrice = useLimitOrderStore((s) => s.setPreviewPrice)

    const { getValues, setValue, watch } = useFormContext<LimitOrderFormValues>()

    const sellAsset = watch("sellAsset")
    const buyAsset = watch("buyAsset")
    const sellSymbol = sellAsset?.symbol ?? "—"
    const buySymbol = buyAsset?.symbol ?? "—"

    const [activePreset, setActivePreset] = useState<string | null>(null)
    const [isInverted, setIsInverted] = useState(false)

    const buyableAssets = tradable.filter(
        (asset) => !SELL_ONLY_ASSETS.includes(asset.id),
    )

    const handleToggleDirection = useCallback(() => {
        setIsInverted((prev) => {
            const currentPrice = Number(getValues("limitPrice"))
            if (currentPrice > 0) {
                const inverted = 1 / currentPrice
                setValue("limitPrice", inverted.toPrecision(6))
            }
            return !prev
        })
    }, [getValues, setValue])

    const handlePriceChange = useCallback(
        (value: string) => {
            // Allow only valid decimal input
            if (value !== "" && !/^\d*\.?\d*$/.test(value)) return

            setValue("limitPrice", value)
            setActivePreset(null)

            // Update preview price on chart
            const numPrice = Number(value)
            setPreviewPrice(numPrice > 0 ? numPrice : null)

            // Recalculate buy amount
            const sellAmount = getValues("sellAmount")

            if (sellAmount && numPrice > 0) {
                // If inverted, limitPrice = buyPerSell → rate is 1/price for sell→buy
                const effectiveRate = isInverted ? 1 / numPrice : numPrice
                const buyAmount = (Number(sellAmount) / effectiveRate).toFixed(6)
                setValue("buyAmount", buyAmount)
            }
        },
        [getValues, setValue, isInverted, setPreviewPrice],
    )

    const handlePresetClick = useCallback(
        (key: string, factor: number) => {
            setActivePreset(key)
            const rawPrice = marketPrice * (1 + factor)
            // Store the price in the current direction
            const displayPrice = isInverted ? 1 / rawPrice : rawPrice
            setValue("limitPrice", displayPrice.toPrecision(6))

            // Update preview price on chart
            setPreviewPrice(displayPrice)

            // Recalculate buy amount using the actual rate (always sell/buy)
            const sellAmount = getValues("sellAmount")
            if (sellAmount && rawPrice > 0) {
                const buyAmount = (Number(sellAmount) / rawPrice).toFixed(6)
                setValue("buyAmount", buyAmount)
            }
        },
        [marketPrice, setValue, getValues, isInverted, setPreviewPrice],
    )

    const handleSellAmountChange = useCallback(
        (sellAmount: string) => {
            const displayPrice = Number(getValues("limitPrice"))
            if (displayPrice > 0 && sellAmount) {
                const effectiveRate = isInverted ? 1 / displayPrice : displayPrice
                const buyAmount = (Number(sellAmount) / effectiveRate).toFixed(6)
                setValue("buyAmount", buyAmount)
            }
        },
        [getValues, setValue, isInverted],
    )

    const handleSwitchAssets = useCallback(() => {
        const { sellAsset, buyAsset, sellAmount, buyAmount } = getValues()

        // Swap asset positions
        setValue("sellAsset", buyAsset)
        setValue("buyAsset", sellAsset)
        setValue("sellAmount", buyAmount)
        setValue("buyAmount", sellAmount)

        // Update URL
        navigate({
            to: ".",
            search: (search) => ({
                ...search,
                assetIn: buyAsset?.id,
                assetOut: sellAsset?.id,
            }),
            resetScroll: false,
        })

        // Reset limit price when switching
        setValue("limitPrice", "")
        setActivePreset(null)
    }, [getValues, setValue, navigate])

    return (
        <div>
            <AssetSelectFormField<LimitOrderFormValues>
                assetFieldName="sellAsset"
                amountFieldName="sellAmount"
                label={t("common:sell")}
                assets={tradable}
                maxBalanceFallback="0"
                onAssetChange={(sellAsset) => {
                    const { buyAsset } = getValues()
                    navigate({
                        to: ".",
                        search: (search) => ({
                            ...search,
                            assetIn: sellAsset.id,
                            assetOut: buyAsset?.id,
                        }),
                        resetScroll: false,
                    })
                }}
                onAmountChange={handleSellAmountChange}
            />
            <TradeAssetSwitcher
                assetInId={sellAsset?.id ?? ""}
                assetOutId={buyAsset?.id ?? ""}
                price={null}
                disabled={!!sellAsset && SELL_ONLY_ASSETS.includes(sellAsset.id)}
                onSwitch={handleSwitchAssets}
            />
            <AssetSelectFormField<LimitOrderFormValues>
                assetFieldName="buyAsset"
                amountFieldName="buyAmount"
                label={t("common:get")}
                assets={buyableAssets}
                hideMaxBalanceAction
                maxBalanceFallback="0"
                onAssetChange={(buyAsset) => {
                    const { sellAsset } = getValues()
                    navigate({
                        to: ".",
                        search: (search) => ({
                            ...search,
                            assetIn: sellAsset?.id,
                            assetOut: buyAsset.id,
                        }),
                        resetScroll: false,
                    })
                }}
            />
            <SwapSectionSeparator />
            <LimitPriceInput
                sellSymbol={sellSymbol}
                buySymbol={buySymbol}
                activePreset={activePreset}
                isInverted={isInverted}
                marketPrice={marketPrice}
                onPresetClick={handlePresetClick}
                onToggleDirection={handleToggleDirection}
                onPriceChange={handlePriceChange}
            />
        </div>
    )
}
