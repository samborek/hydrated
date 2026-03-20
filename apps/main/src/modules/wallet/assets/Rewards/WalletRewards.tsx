import { FC } from "react"
import { useTranslation } from "react-i18next"

import { WalletRewardsSection } from "@/modules/wallet/assets/Rewards/WalletRewardsSection"

export const WalletRewards: FC = () => {
  const { t } = useTranslation("wallet")

  return <WalletRewardsSection title={t("rewards.title")} />
}
