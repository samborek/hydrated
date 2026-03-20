import { ChevronDown, ChevronUp, LogOut, Wallet } from "@galacticcouncil/ui/assets/icons"
import { Flex, Icon, Text } from "@galacticcouncil/ui/components"
import { formatCurrency } from "@galacticcouncil/utils"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { prop } from "remeda"
import { useShallow } from "zustand/react/shallow"

import {
  SWalletItem,
  SWalletsPanel,
  SWalletsPanelLabel,
  SWalletsPanelSection,
  SWalletStatus,
  SWalletDisconnect,
} from "@/components/content/AccountSelectContent.styled"
import { ProviderIcon } from "@/components/provider/ProviderIcon"
import { Web3ConnectModalPage } from "@/config/modal"
import { WalletProviderType } from "@/config/providers"
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext"
import { useWalletProviders } from "@/hooks/useWalletProviders"
import { useWeb3Connect, WalletProviderStatus } from "@/hooks/useWeb3Connect"
import { useWeb3Enable } from "@/hooks/useWeb3Enable"
import { Wallet as WalletType } from "@/types/wallet"
import { getWallet } from "@/wallets"

type Props = {
  readonly selectedWallet: WalletProviderType | "all"
  readonly onWalletSelect: (wallet: WalletProviderType | "all") => void
}

export const WalletsPanel: FC<Props> = ({ selectedWallet, onWalletSelect }) => {
  const { t } = useTranslation()
  const { mode, setPage } = useWeb3ConnectContext()
  const { enable, disconnect } = useWeb3Enable()
  const [connectingWallet, setConnectingWallet] =
    useState<WalletProviderType | null>(null)
  const [showMoreWallets, setShowMoreWallets] = useState(false)

  const { getConnectedProviders, accounts, getStatus } = useWeb3Connect(
    useShallow((state) => ({
      getConnectedProviders: state.getConnectedProviders,
      accounts: state.accounts,
      getStatus: state.getStatus,
    })),
  )

  // Get available wallets for this mode (installed + others)
  const { installed, other } = useWalletProviders(mode)

  const connectedProviders = getConnectedProviders(mode)
  const connectedWalletTypes = new Set(connectedProviders.map(prop("type")))

  // Calculate total balance per wallet
  const walletBalances = useMemo(() => {
    const balances = new Map<WalletProviderType, number>()
    for (const account of accounts) {
      const current = balances.get(account.provider) || 0
      balances.set(account.provider, current + (account.balance || 0))
    }
    return balances
  }, [accounts])

  const FEATURED_PROVIDERS = [
    WalletProviderType.PolkadotJS,
    WalletProviderType.Talisman,
    WalletProviderType.Phantom,
    WalletProviderType.MetaMask,
  ]

  // All available wallets (installed + other)
  const allWallets = useMemo(() => [...installed, ...other], [installed, other])

  // Featured wallets — shown directly below ExternalWallet
  const featuredWallets = useMemo(
    () =>
      FEATURED_PROVIDERS.flatMap(
        (p) => allWallets.find((w) => w.provider === p) ?? [],
      ),
    [allWallets],
  )
  const featuredProviderSet = new Set(featuredWallets.map((w) => w.provider))

  // Combine installed wallets - connected first, then not connected (excluding featured)
  const sortedWallets = useMemo(() => {
    const nonFeatured = installed.filter((w) => !featuredProviderSet.has(w.provider))
    const connected = nonFeatured.filter((w) => connectedWalletTypes.has(w.provider))
    const notConnected = nonFeatured.filter(
      (w) => !connectedWalletTypes.has(w.provider),
    )
    return [...connected, ...notConnected]
  }, [installed, connectedWalletTypes, featuredProviderSet])

  const handleConnect = async (walletType: WalletProviderType) => {
    setConnectingWallet(walletType)
    try {
      await enable(walletType)
      // After connecting, select this wallet
      onWalletSelect(walletType)
    } finally {
      setConnectingWallet(null)
    }
  }

  const handleDisconnect = (
    e: React.MouseEvent,
    walletType: WalletProviderType,
  ) => {
    e.stopPropagation()
    disconnect(walletType)
    // If disconnecting the selected wallet, go back to "all"
    if (selectedWallet === walletType) {
      onWalletSelect("all")
    }
  }

  const handleWalletClick = (wallet: WalletType) => {
    const isConnected = connectedWalletTypes.has(wallet.provider)
    if (isConnected) {
      onWalletSelect(wallet.provider)
    } else {
      handleConnect(wallet.provider)
    }
  }

  const externalWallet = getWallet(WalletProviderType.ExternalWallet)
  const isExternalConnected =
    getStatus(WalletProviderType.ExternalWallet) === WalletProviderStatus.Connected
  const externalBalance = walletBalances.get(WalletProviderType.ExternalWallet)

  const handleExternalClick = () => {
    if (isExternalConnected) {
      onWalletSelect(WalletProviderType.ExternalWallet)
    } else {
      setPage(Web3ConnectModalPage.ExternalWallet)
    }
  }

  const handleExternalDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation()
    disconnect(WalletProviderType.ExternalWallet)
    if (selectedWallet === WalletProviderType.ExternalWallet) {
      onWalletSelect("all")
    }
  }

  // Don't show panel if no wallets available and external wallet not present
  if (sortedWallets.length === 0 && other.length === 0 && !externalWallet) {
    return null
  }

  return (
    <SWalletsPanel>
      {(sortedWallets.length > 0 || other.length > 0) && (
        <>
          {(sortedWallets.length > 0 || externalWallet) && (
            <SWalletsPanelSection>
              <SWalletsPanelLabel>{t("account.wallets")}:</SWalletsPanelLabel>
              {sortedWallets.length > 0 && (
                <SWalletItem
                  isActive={selectedWallet === "all"}
                  onClick={() => onWalletSelect("all")}
                >
                  <Icon component={Wallet} size={20} />
                  <Text fs="p5" fw={500}>
                    {t("account.allWallets")}
                  </Text>
                </SWalletItem>
              )}

              {externalWallet && (
                <SWalletItem
                  isActive={selectedWallet === WalletProviderType.ExternalWallet}
                  onClick={handleExternalClick}
                >
                  <ProviderIcon provider={WalletProviderType.ExternalWallet} />
                  <Flex direction="column" sx={{ flex: 1, minWidth: 0, gap: 0 }}>
                    <Text fs="p5" fw={500} truncate>
                      {externalWallet.title}
                    </Text>
                    <Flex align="center" justify="space-between" gap="xs">
                      {isExternalConnected ? (
                        <>
                          <Flex
                            align="center"
                            justify="space-between"
                            gap="xs"
                            sx={{ width: "100%" }}
                          >
                            <SWalletStatus isConnected>
                              {externalBalance !== undefined && externalBalance > 0
                                ? formatCurrency(externalBalance)
                                : t("provider.connected")}
                            </SWalletStatus>
                            <SWalletDisconnect
                              onClick={handleExternalDisconnect}
                              title={t("provider.disconnect")}
                            >
                              <Icon component={LogOut} size={12} />
                            </SWalletDisconnect>
                          </Flex>
                        </>
                      ) : (
                        <SWalletStatus>{t("provider.connectWallet")}</SWalletStatus>
                      )}
                    </Flex>
                  </Flex>
                </SWalletItem>
              )}

              {featuredWallets.map((wallet) => {
                const isConnected = connectedWalletTypes.has(wallet.provider)
                const isConnecting =
                  connectingWallet === wallet.provider ||
                  getStatus(wallet.provider) === WalletProviderStatus.Pending
                const balance = walletBalances.get(wallet.provider)

                return (
                  <SWalletItem
                    key={wallet.provider}
                    isActive={selectedWallet === wallet.provider}
                    disabled={isConnecting}
                    onClick={() =>
                      isConnected
                        ? onWalletSelect(wallet.provider)
                        : wallet.installed
                          ? handleConnect(wallet.provider)
                          : window.open(wallet.installUrl, "_blank")
                    }
                  >
                    <ProviderIcon provider={wallet.provider} />
                    <Flex direction="column" sx={{ flex: 1, minWidth: 0, gap: 0 }}>
                      <Text fs="p5" fw={500} truncate>
                        {wallet.title}
                      </Text>
                      <Flex align="center" justify="space-between" gap="xs">
                        {isConnecting ? (
                          <SWalletStatus>
                            {t("provider.waitingForAuth")}...
                          </SWalletStatus>
                        ) : isConnected ? (
                          <>
                            <SWalletStatus isConnected>
                              {balance !== undefined && balance > 0
                                ? formatCurrency(balance)
                                : t("provider.connected")}
                            </SWalletStatus>
                            <SWalletDisconnect
                              onClick={(e) => handleDisconnect(e, wallet.provider)}
                              title={t("provider.disconnect")}
                            >
                              <Icon component={LogOut} size={12} />
                            </SWalletDisconnect>
                          </>
                        ) : (
                          <SWalletStatus>
                            {wallet.installed
                              ? t("provider.connectWallet")
                              : t("provider.download")}
                          </SWalletStatus>
                        )}
                      </Flex>
                    </Flex>
                  </SWalletItem>
                )
              })}

              {other.filter((w) => !featuredProviderSet.has(w.provider)).length > 0 && (
                <>
                  <SWalletItem
                    isMoreWallets
                    onClick={() => setShowMoreWallets(!showMoreWallets)}
                  >
                    <Icon component={Wallet} size={20} />
                    <Flex align="center" justify="space-between" sx={{ flex: 1 }}>
                      <Text fs="p5" fw={500}>
                        {t("account.moreWallets")}
                      </Text>
                      <Icon
                        component={showMoreWallets ? ChevronUp : ChevronDown}
                        size={12}
                      />
                    </Flex>
                  </SWalletItem>

                  {showMoreWallets &&
                    other.filter((w) => !featuredProviderSet.has(w.provider)).map((wallet) => {
                      const isConnecting =
                        connectingWallet === wallet.provider ||
                        getStatus(wallet.provider) === WalletProviderStatus.Pending

                      return (
                        <SWalletItem
                          key={wallet.provider}
                          onClick={() =>
                            wallet.installed
                              ? handleConnect(wallet.provider)
                              : window.open(wallet.installUrl, "_blank")
                          }
                          disabled={isConnecting}
                        >
                          <ProviderIcon provider={wallet.provider} />
                          <Flex
                            direction="column"
                            sx={{ flex: 1, minWidth: 0, gap: 0 }}
                          >
                            <Text fs="p5" fw={500} truncate>
                              {wallet.title}
                            </Text>
                            <SWalletStatus>
                              {isConnecting
                                ? `${t("provider.waitingForAuth")}...`
                                : wallet.installed
                                  ? t("provider.connectWallet")
                                  : t("provider.download")}
                            </SWalletStatus>
                          </Flex>
                        </SWalletItem>
                      )
                    })}
                </>
              )}
            </SWalletsPanelSection>
          )}

          <SWalletsPanelSection scrollable>
            {sortedWallets.map((wallet) => {
              const isConnected = connectedWalletTypes.has(wallet.provider)
              const isConnecting =
                connectingWallet === wallet.provider ||
                getStatus(wallet.provider) === WalletProviderStatus.Pending
              const balance = walletBalances.get(wallet.provider)

              return (
                <SWalletItem
                  key={wallet.provider}
                  isActive={selectedWallet === wallet.provider}
                  onClick={() => handleWalletClick(wallet)}
                  disabled={isConnecting}
                >
                  <ProviderIcon provider={wallet.provider} />
                  <Flex direction="column" sx={{ flex: 1, minWidth: 0, gap: 0 }}>
                    <Text fs="p5" fw={500} truncate>
                      {wallet.title}
                    </Text>
                    <Flex align="center" justify="space-between" gap="xs">
                      {isConnecting ? (
                        <SWalletStatus>
                          {t("provider.waitingForAuth")}...
                        </SWalletStatus>
                      ) : isConnected ? (
                        <>
                          <SWalletStatus isConnected>
                            {balance !== undefined && balance > 0
                              ? formatCurrency(balance)
                              : t("provider.connected")}
                          </SWalletStatus>
                          <SWalletDisconnect
                            onClick={(e) => handleDisconnect(e, wallet.provider)}
                            title={t("provider.disconnect")}
                          >
                            <Icon component={LogOut} size={12} />
                          </SWalletDisconnect>
                        </>
                      ) : (
                        <SWalletStatus>
                          {t("provider.connectWallet")}
                        </SWalletStatus>
                      )}
                    </Flex>
                  </Flex>
                </SWalletItem>
              )
            })}

          </SWalletsPanelSection>
        </>
      )}

    </SWalletsPanel>
  )
}
