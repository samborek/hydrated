import Big from "big.js"
import { useMemo } from "react"

import { AssetType } from "@/api/assets"
import { useUserBorrowSummary } from "@/api/borrow"
import { useMyIsolatedPoolsLiquidity } from "@/modules/wallet/assets/MyLiquidity/MyIsolatedPoolsLiquidity.data"
import { useMultiplySimulationStore } from "@/modules/borrow/multiply/states/useMultiplySimulationStore"
import {
  Balance,
  isOmnipoolDepositPosition,
  useAccountBalancesWithPriceByAssetType,
  useAccountOmnipoolPositionsData,
} from "@/states/account"
import { toBig } from "@/utils/formatting"

const calculateBalancesTotal = (
  balances: Array<{
    balance: Balance
    meta: { decimals: number }
    price?: string
  }>,
) => {
  if (!balances) return Big(0)

  return balances.reduce((acc, { balance, meta, price }) => {
    const balanceShifted = toBig(balance.total, meta.decimals)
    const displayValue = price ? balanceShifted.times(price).toString() : "0"
    return acc.plus(displayValue)
  }, Big(0))
}

export const useWalletBalancesSectionData = () => {
  const { data: positions, isLoading: isLoadingPositions } =
    useAccountOmnipoolPositionsData()

  const {
    data: isolatedPoolsLiquidity,
    isLoading: isLoadingIsolatedPoolsLiquidity,
  } = useMyIsolatedPoolsLiquidity()

  const { data: userBorrowSummary, isLoading: isLoadingBorrowSummary } =
    useUserBorrowSummary()

  const { data: balancesWithPrice, isLoading: isBalanceLoading } =
    useAccountBalancesWithPriceByAssetType([
      AssetType.STABLESWAP,
      AssetType.TOKEN,
      AssetType.ERC20,
    ])

  const { positions: loopingPositions } = useMultiplySimulationStore()

  const { liquidityTotal, farmingTotal, assetsTotal, loopingTotal } = useMemo(() => {
    const omnipoolLiquidity = (positions?.all ?? []).reduce(
      (acc, position) => {
        acc.liquidity = acc.liquidity.plus(
          position.data?.currentTotalDisplay ?? 0,
        )

        if (isOmnipoolDepositPosition(position)) {
          acc.farming = acc.farming.plus(
            position.data?.currentTotalDisplay ?? 0,
          )
        }

        return acc
      },
      {
        liquidity: Big(0),
        farming: Big(0),
      },
    )

    const isolatedPoolsLiquidityTotals = isolatedPoolsLiquidity.reduce(
      (acc, asset) => {
        acc.liquidity = acc.liquidity.plus(asset.currentTotalDisplay ?? 0)
        acc.farming = acc.farming.plus(
          asset.positions.reduce((acc, position) => {
            const displaValue = toBig(
              position.shares,
              position.meta.decimals,
            ).times(position.price)

            return acc.plus(displaValue ?? 0)
          }, Big(0)),
        )
        return acc
      },
      { liquidity: Big(0), farming: Big(0) },
    )

    const tokensTotal = calculateBalancesTotal(
      balancesWithPrice?.tokenBalances ?? [],
    )

    const erc20Total = calculateBalancesTotal(
      balancesWithPrice?.erc20Balances ?? [],
    )

    const stableSwapTotal = calculateBalancesTotal(
      balancesWithPrice?.stableSwapBalances ?? [],
    )

    const assetsTotal = tokensTotal.plus(erc20Total)

    const liquidityTotal = omnipoolLiquidity.liquidity
      .plus(stableSwapTotal)
      .plus(isolatedPoolsLiquidityTotals.liquidity)

    const farmingTotal = omnipoolLiquidity.farming.plus(
      isolatedPoolsLiquidityTotals.farming,
    )

    // TODO: Use real prices for accurate calculation when available. 
    // Currently using a mocked logic similar to the table for consistent display if needed, 
    // but here we should try to be as real as possible or stick to the store data if it has it.
    // The previous analysis showed the table mocks the value: Number(position.collateralAmount) * 0.12
    // We will use a similar approximation for now to match visual expectations until real price data is hooked up for these specific assets in this context.
    // Ideally we would look up price by ID.
    const loopingTotal = loopingPositions.reduce((acc, position) => {
      // Simplified mock value calculation to match the visual tile for now
      // In real app, obtain price for position.collateralAsset.id and position.debtAsset.id
      const val = Big(position.collateralAmount).times(0.12)
      return acc.plus(val)
    }, Big(0))

    return { omnipoolLiquidity, assetsTotal, liquidityTotal, farmingTotal, loopingTotal }
  }, [balancesWithPrice, isolatedPoolsLiquidity, positions?.all, loopingPositions])

  return {
    assets: assetsTotal.toString(),
    isAssetsLoading: isBalanceLoading,
    liquidity: liquidityTotal.toString(),
    farms: farmingTotal.toString(),
    isLiquidityLoading: isLoadingIsolatedPoolsLiquidity || isLoadingPositions,
    supply: userBorrowSummary?.totalLiquidityUSD ?? "",
    borrow: userBorrowSummary?.totalBorrowsUSD ?? "",
    isBorrowLoading: isLoadingBorrowSummary,
    looping: loopingTotal.toString(),
  }
}
