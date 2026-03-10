import { useMutation } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import { AAVE_GAS_LIMIT } from "@/api/aave"
import { LimitOrderFormValues } from "@/modules/trade/swap/sections/LimitOrder/useLimitOrderForm"
import { useAssets } from "@/providers/assetsProvider"
import { useRpcProvider } from "@/providers/rpcProvider"
import { useTransactionsStore } from "@/states/transactions"
import { scale } from "@/utils/formatting"

type Args = {
  readonly onSuccess?: () => void
}

export const useSubmitLimitOrder = ({ onSuccess }: Args = {}) => {
  const { t } = useTranslation(["trade", "common"])
  const { papi } = useRpcProvider()
  const { isErc20AToken } = useAssets()

  const createTransaction = useTransactionsStore((s) => s.createTransaction)

  return useMutation({
    mutationFn: async (values: LimitOrderFormValues) => {
      const { sellAsset, buyAsset, sellAmount, buyAmount } = values

      if (!sellAsset || !buyAsset || !sellAmount || !buyAmount) {
        return
      }

      // Validate amounts are valid numbers
      const scaledBuyAmount = scale(buyAmount, buyAsset.decimals)
      const scaledSellAmount = scale(sellAmount, sellAsset.decimals)

      if (
        !scaledBuyAmount ||
        scaledBuyAmount === "0" ||
        !scaledSellAmount ||
        scaledSellAmount === "0"
      ) {
        console.error("Invalid amounts:", { scaledBuyAmount, scaledSellAmount })
        return
      }

      const formattedAmount = t("common:currency", {
        value: sellAmount,
        symbol: sellAsset.symbol,
      })

      const hasAToken = isErc20AToken(sellAsset) || isErc20AToken(buyAsset)

      // OTC.place_order expects:
      // - asset_in: what the order creator wants to receive (buyAsset)
      // - asset_out: what the order creator is offering (sellAsset)
      // - amount_in: amount to receive (buyAmount)
      // - amount_out: amount being offered (sellAmount)
      const tx = papi.tx.OTC.place_order({
        amount_in: BigInt(scaledBuyAmount),
        amount_out: BigInt(scaledSellAmount),
        asset_in: Number(buyAsset.id),
        asset_out: Number(sellAsset.id),
        partially_fillable: true,
      })

      await createTransaction(
        {
          tx: hasAToken
            ? papi.tx.Dispatcher.dispatch_with_extra_gas({
                call: tx.decodedCall,
                extra_gas: AAVE_GAS_LIMIT,
              })
            : tx,
          toasts: {
            submitted: t("limit.submit.loading", {
              amount: formattedAmount,
            }),
            success: t("limit.submit.success", {
              amount: formattedAmount,
            }),
            error: t("limit.submit.error", {
              amount: formattedAmount,
            }),
          },
        },
        {
          onSuccess,
        },
      )
    },
  })
}
