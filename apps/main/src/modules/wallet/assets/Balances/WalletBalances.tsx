import { Separator, ValueStats } from "@galacticcouncil/ui/components"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { NetWorth } from "@/modules/wallet/assets/Balances/NetWorth"
import { useWalletBalancesSectionData } from "@/modules/wallet/assets/Balances/WalletBalances.data"
import {
  SWalletBalances,
  SWalletBalancesStats,
} from "@/modules/wallet/assets/Balances/WalletBalances.styled"

export const WalletBalances: FC = () => {
  const { t } = useTranslation(["wallet", "common"])
  const { isMobile } = useBreakpoints()
  const currencyKey = isMobile ? "common:currency.compact" : "common:currency"

  const {
    assets,
    isAssetsLoading,
    liquidity,
    isLiquidityLoading,
    borrow,
    isBorrowLoading,
    supply,
    isSupplyLoading,
  } = useWalletBalancesSectionData()

  return (
    <SWalletBalances>
        <NetWorth
          assetBalance={assets}
          liquidityBalance={liquidity}
          borrowed={borrow}
          isCurrentLoading={
            isAssetsLoading || isLiquidityLoading || isBorrowLoading
          }
        />
        <Separator orientation="vertical" display={["none", null, "initial"]} />
        <Separator display={["initial", null, "none"]} />
        <SWalletBalancesStats>
          <ValueStats
            size="small"
            wrap
            label={t("balances.header.assets")}
            value={t(currencyKey, { value: assets })}
            isLoading={isAssetsLoading}
          />
          <ValueStats
            size="small"
            wrap
            label={t("balances.header.liquidity")}
            value={t(currencyKey, { value: liquidity })}
            isLoading={isLiquidityLoading}
          />
          <ValueStats
            size="small"
            wrap
            label={t("balances.header.totalBorrow")}
            value={t(currencyKey, { value: borrow })}
            isLoading={isBorrowLoading}
          />
          <ValueStats
            size="small"
            wrap
            label={t("balances.header.totalSupply")}
            value={t(currencyKey, { value: supply })}
            isLoading={isSupplyLoading}
          />
        </SWalletBalancesStats>
      </SWalletBalances>
  )
}
