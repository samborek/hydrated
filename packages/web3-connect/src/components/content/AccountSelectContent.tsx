import { Search } from "@galacticcouncil/ui/assets/icons"
import {
  Button,
  Flex,
  Input,
  ModalBody,
  ModalHeader,
  Text,
} from "@galacticcouncil/ui/components"
import { formatCurrency } from "@galacticcouncil/utils"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDebounce } from "react-use"
import { groupBy, pick, prop } from "remeda"
import { useShallow } from "zustand/react/shallow"

import {
  AccountFilter,
  AccountFilterOption,
} from "@/components/account/AccountFilter"
import { AccountMetaMaskOption } from "@/components/account/AccountMetaMaskOption"
import { AccountOption } from "@/components/account/AccountOption"
import { AccountSolanaOption } from "@/components/account/AccountSolanaOption"
import { AccountSuiOption } from "@/components/account/AccountSuiOption"
import {
  SAccountGroup,
  SAccountGroupHeader,
  SAccountList,
  SAccountListHeader,
  SAccountListPanel,
  SAccountSelectLayout,
} from "@/components/content/AccountSelectContent.styled"
import {
  getFilteredAccounts,
  useAccountsWithBalance,
} from "@/components/content/AccountSelectContent.utils"
import { WalletsPanel } from "@/components/content/WalletsPanel"
import { ProviderIcon } from "@/components/provider/ProviderIcon"
import { ProviderLoader } from "@/components/provider/ProviderLoader"
import { Web3ConnectModalPage } from "@/config/modal"
import {
  SOLANA_PROVIDERS,
  SUI_PROVIDERS,
  WalletProviderType,
} from "@/config/providers"
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext"
import { useAccount } from "@/hooks/useAccount"
import {
  Account,
  useWeb3Connect,
  WalletMode,
  WalletProviderStatus,
} from "@/hooks/useWeb3Connect"
import { getDefaultAccountFilterByMode, toAccount } from "@/utils"
import { getWallet } from "@/wallets"

const getAccountOptionComponent = (account: Account) => {
  switch (true) {
    case account.provider === WalletProviderType.MetaMask:
      return AccountMetaMaskOption
    case SOLANA_PROVIDERS.includes(account.provider):
      return AccountSolanaOption
    case SUI_PROVIDERS.includes(account.provider):
      return AccountSuiOption
    default:
      return AccountOption
  }
}

export const AccountSelectContent = () => {
  const { t } = useTranslation()
  const { account: currentAccount } = useAccount()
  const { onAccountSelect, isControlled, mode, setPage } = useWeb3ConnectContext()
  const { accounts, toggle, getProviders, getStatus } = useWeb3Connect(
    useShallow(pick(["accounts", "toggle", "getProviders", "getStatus"])),
  )

  const isDefaultMode = mode === WalletMode.Default

  const [filter, setFilter] = useState<AccountFilterOption>(
    getDefaultAccountFilterByMode(mode),
  )
  const [selectedWallet, setSelectedWallet] = useState<
    WalletProviderType | "all"
  >(() => {
    const { getStatus } = useWeb3Connect.getState()
    const isExternalConnected =
      getStatus(WalletProviderType.ExternalWallet) === WalletProviderStatus.Connected
    const isExternalAccount =
      currentAccount?.provider === WalletProviderType.ExternalWallet
    return isExternalConnected && isExternalAccount
      ? WalletProviderType.ExternalWallet
      : "all"
  })
  const [searchVal, setSearchVal] = useState("")
  const [search, setSearch] = useState("")
  useDebounce(
    () => {
      setSearch(searchVal ?? "")
    },
    100,
    [searchVal],
  )

  const providers = getProviders(mode)
  const isProvidersConnecting = providers.some(
    ({ status }) => status === "pending",
  )

  const accountList = useMemo(() => {
    const allAccounts = accounts.map(toAccount)

    // Filter by selected wallet first
    const walletFilteredAccounts =
      selectedWallet === "all"
        ? allAccounts
        : allAccounts.filter((acc) => acc.provider === selectedWallet)

    return getFilteredAccounts(
      walletFilteredAccounts,
      currentAccount,
      search,
      filter,
    )
  }, [accounts, currentAccount, filter, search, selectedWallet])

  const hasNoResults = accountList.length === 0

  const handleAccountSelect = useCallback(
    (account: Account) => {
      onAccountSelect(account)
      if (!isControlled) {
        toggle()
      }
    },
    [isControlled, onAccountSelect, toggle],
  )

  const shouldRenderSearch = accounts.length > 1
  const isExternalWalletSelected = selectedWallet === WalletProviderType.ExternalWallet
  const isExternalWalletConnected =
    getStatus(WalletProviderType.ExternalWallet) === WalletProviderStatus.Connected

  const { accountsWithBalances, areBalancesLoading } =
    useAccountsWithBalance(accountList)

  // Group accounts by wallet provider when "all" is selected
  const groupedAccounts = useMemo(() => {
    if (selectedWallet !== "all") {
      return null // Don't group when a specific wallet is selected
    }

    const groups = groupBy(accountsWithBalances, (acc) => acc.provider)
    return Object.entries(groups).map(([provider, accs]) => ({
      provider: provider as WalletProviderType,
      accounts: accs,
      totalBalance: accs.reduce((sum, acc) => sum + (acc.balance || 0), 0),
    }))
  }, [accountsWithBalances, selectedWallet])

  return (
    <>
      <ModalHeader title={t("account.select")} />
      <ModalBody
        scrollable={false}
        noPadding
        sx={{ display: "flex", minHeight: 0, overflow: "hidden" }}
      >
        <SAccountSelectLayout>
          <WalletsPanel
            selectedWallet={selectedWallet}
            onWalletSelect={setSelectedWallet}
          />
          <SAccountListPanel>
            <SAccountListHeader>
              {shouldRenderSearch && (
                <Input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  customSize="medium"
                  iconStart={Search}
                  placeholder={t("account.searchPlaceholder")}
                  sx={{ flex: 1 }}
                />
              )}
            </SAccountListHeader>

            {isDefaultMode && (
              <AccountFilter
                active={filter}
                onSetActive={(mode) => setFilter(mode)}
              />
            )}

            <SAccountList compact={accountList.length <= 1}>
              {isProvidersConnecting ? (
                <ProviderLoader providers={providers.map(prop("type"))} />
              ) : (
                <>
                  {hasNoResults && (
                    <Text sx={{ py: "xl", textAlign: "center" }}>
                      {t("account.noResults")}
                    </Text>
                  )}
                  {groupedAccounts
                    ? // Render grouped accounts
                      groupedAccounts.map((group) => {
                        const wallet = getWallet(group.provider)
                        return (
                          <SAccountGroup key={group.provider}>
                            <SAccountGroupHeader>
                              <Flex align="center" gap="xs">
                                <ProviderIcon
                                  provider={group.provider}
                                  size={16}
                                />
                                <Text fs="p5" fw={500}>
                                  {wallet?.title || group.provider} accounts
                                </Text>
                              </Flex>
                              {group.totalBalance > 0 && (
                                <Text fs="p5" fw={500}>
                                  {formatCurrency(group.totalBalance)}
                                </Text>
                              )}
                            </SAccountGroupHeader>
                            {group.accounts.map((account) => {
                              const Component =
                                getAccountOptionComponent(account)
                              return (
                                <Component
                                  key={`${account.publicKey}-${account.provider}`}
                                  {...account}
                                  isBalanceLoading={areBalancesLoading}
                                  onSelect={handleAccountSelect}
                                />
                              )
                            })}
                          </SAccountGroup>
                        )
                      })
                    : // Render flat list when specific wallet is selected
                      accountsWithBalances.map((account) => {
                        const Component = getAccountOptionComponent(account)
                        return (
                          <Component
                            key={`${account.publicKey}-${account.provider}`}
                            {...account}
                            isBalanceLoading={areBalancesLoading}
                            onSelect={handleAccountSelect}
                          />
                        )
                      })}
                </>
              )}
            </SAccountList>

            {isExternalWalletSelected && isExternalWalletConnected && (
              <Button
                type="button"
                size="small"
                variant="muted"
                outline
                width="100%"
                sx={{ mt: "12px" }}
                onClick={() => setPage(Web3ConnectModalPage.ExternalWallet)}
              >
                {t("external.watchAnotherWallet")}
              </Button>
            )}
          </SAccountListPanel>
        </SAccountSelectLayout>
      </ModalBody>
    </>
  )
}
