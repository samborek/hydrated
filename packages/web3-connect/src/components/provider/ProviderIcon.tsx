import { FC } from "react"

import { ProviderLogo } from "@/components/provider/ProviderLogo"
import { WalletProviderType } from "@/config/providers"
import { getWallet } from "@/wallets"

type Props = {
  readonly provider: WalletProviderType
  readonly size?: number
}

export const ProviderIcon: FC<Props> = ({ provider, size = 20 }) => {
  const wallet = getWallet(provider)

  if (!wallet) {
    return null
  }

  return <ProviderLogo wallet={wallet} size={size} />
}
