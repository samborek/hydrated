import { useSearch } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { FC, useState } from "react"
import { FormProvider } from "react-hook-form"

import { spotPriceQuery } from "@/api/spotPrice"
import { SwapSectionSeparator } from "@/modules/trade/swap/SwapPage.styled"
import { useRpcProvider } from "@/providers/rpcProvider"

import { LimitOrderFields } from "./LimitOrderFields"
import { LimitOrderSubmit } from "./LimitOrderSubmit"
import { LimitOrderSummary } from "./LimitOrderSummary"
import { useLimitOrderForm, LimitOrderFormValues } from "./useLimitOrderForm"
import { useLimitOrderStore } from "./useLimitOrderStore"

export const LimitOrder: FC = () => {
    const { assetIn, assetOut } = useSearch({ from: "/trade/_history" })
    const rpc = useRpcProvider()

    const form = useLimitOrderForm({ assetIn, assetOut })
    const addOrder = useLimitOrderStore((s) => s.addOrder)
    const setPreviewPrice = useLimitOrderStore((s) => s.setPreviewPrice)

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Get real spot price for the trading pair
    const { data: spotPriceData } = useQuery(
        spotPriceQuery(rpc, assetIn, assetOut),
    )

    // Convert spot price to number (it's the price of 1 assetIn in terms of assetOut)
    const marketPrice = spotPriceData?.spotPrice
        ? Number(spotPriceData.spotPrice)
        : 0

    const limitPrice = form.watch("limitPrice")
    const sellAmount = form.watch("sellAmount")
    const isFormValid =
        !!limitPrice &&
        Number(limitPrice) > 0 &&
        !!sellAmount &&
        Number(sellAmount) > 0

    const handleSubmit = async (values: LimitOrderFormValues) => {
        if (
            !values.sellAsset ||
            !values.buyAsset ||
            !values.limitPrice ||
            !values.sellAmount
        ) {
            return
        }

        setIsSubmitting(true)

        // Add order to the store (client-side) — this makes it appear on the chart
        addOrder({
            sellAssetId: values.sellAsset.id,
            buyAssetId: values.buyAsset.id,
            sellAmount: values.sellAmount,
            buyAmount: values.buyAmount,
            limitPrice: Number(values.limitPrice),
        })

        // Clear the preview price since we've submitted
        setPreviewPrice(null)

        // Reset the form
        form.reset({
            ...values,
            sellAmount: "",
            buyAmount: "",
            limitPrice: "",
            stopLossEnabled: false,
            stopLossPrice: "",
            takeProfitEnabled: false,
            takeProfitPrice: "",
        })

        setIsSubmitting(false)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit as never)}>
                <LimitOrderFields marketPrice={marketPrice} />
                <SwapSectionSeparator />
                <LimitOrderSubmit isEnabled={isFormValid} isLoading={isSubmitting} />
                <LimitOrderSummary />
            </form>
        </FormProvider>
    )
}
