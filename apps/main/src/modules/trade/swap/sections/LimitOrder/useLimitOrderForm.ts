import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useForm } from "react-hook-form"
import * as z from "zod/v4"

import { TAssetData } from "@/api/assets"
import { useAssets } from "@/providers/assetsProvider"

const limitOrderSchema = z.object({
    sellAsset: z.custom<TAssetData>().nullable(),
    sellAmount: z.string(),
    buyAsset: z.custom<TAssetData>().nullable(),
    buyAmount: z.string(),
    limitPrice: z.string(),
    stopLossEnabled: z.boolean(),
    stopLossPrice: z.string(),
    takeProfitEnabled: z.boolean(),
    takeProfitPrice: z.string(),
})

export type LimitOrderFormValues = z.infer<typeof limitOrderSchema>

export const useLimitOrderForm = ({
    assetIn,
    assetOut,
}: {
    assetIn: string
    assetOut: string
}) => {
    const { getAsset } = useAssets()

    const defaultValues: LimitOrderFormValues = {
        sellAsset: getAsset(assetIn) ?? null,
        sellAmount: "",
        buyAsset: getAsset(assetOut) ?? null,
        buyAmount: "",
        limitPrice: "",
        stopLossEnabled: false,
        stopLossPrice: "",
        takeProfitEnabled: false,
        takeProfitPrice: "",
    }

    return useForm<LimitOrderFormValues>({
        defaultValues,
        mode: "onChange",
        resolver: standardSchemaResolver(limitOrderSchema),
    })
}
