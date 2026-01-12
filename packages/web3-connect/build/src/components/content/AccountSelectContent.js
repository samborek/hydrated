import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Search } from "@galacticcouncil/ui/assets/icons";
import { Flex, Grid, Input, ModalBody, ModalHeader, Text, } from "@galacticcouncil/ui/components";
import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { pick, prop } from "remeda";
import { useShallow } from "zustand/react/shallow";
import { AccountFilter, } from "@/components/account/AccountFilter";
import { AccountMetaMaskOption } from "@/components/account/AccountMetaMaskOption";
import { AccountOption } from "@/components/account/AccountOption";
import { getFilteredAccounts, useAccountsWithBalance, } from "@/components/content/AccountSelectContent.utils";
import { ProviderLoader } from "@/components/provider/ProviderLoader";
import { WalletProviderType } from "@/config/providers";
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext";
import { useAccount } from "@/hooks/useAccount";
import { useWeb3Connect, WalletMode } from "@/hooks/useWeb3Connect";
import { getDefaultAccountFilterByMode, toAccount } from "@/utils";
const getAccountOptionComponent = (account) => {
    switch (account.provider) {
        case WalletProviderType.MetaMask:
            return AccountMetaMaskOption;
        default:
            return AccountOption;
    }
};
export const AccountSelectContent = () => {
    const { account: currentAccount } = useAccount();
    const { onAccountSelect, isControlled, mode } = useWeb3ConnectContext();
    const { accounts, toggle, getConnectedProviders } = useWeb3Connect(useShallow(pick(["accounts", "toggle", "getConnectedProviders"])));
    const isDefaultMode = mode === WalletMode.Default;
    const [filter, setFilter] = useState(getDefaultAccountFilterByMode(mode));
    const [searchVal, setSearchVal] = useState("");
    const [search, setSearch] = useState("");
    useDebounce(() => {
        setSearch(searchVal ?? "");
    }, 100, [searchVal]);
    const providers = getConnectedProviders(mode);
    const isProvidersConnecting = providers.some(({ status }) => status === "pending");
    const accountList = useMemo(() => getFilteredAccounts(accounts.map(toAccount), currentAccount, search, filter), [accounts, currentAccount, filter, search]);
    const hasNoResults = accountList.length === 0;
    const handleAccountSelect = useCallback((account) => {
        onAccountSelect(account);
        if (!isControlled) {
            toggle();
        }
    }, [isControlled, onAccountSelect, toggle]);
    const shouldRenderSearch = accounts.length > 1;
    const shouldRenderHeader = !isProvidersConnecting && (isDefaultMode || shouldRenderSearch);
    const { accountsWithBalances, areBalancesLoading } = useAccountsWithBalance(accountList);
    return (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { title: "Select account", align: "center", customHeader: shouldRenderHeader && (_jsxs(Flex, { direction: "column", gap: 20, mt: 10, children: [shouldRenderSearch && (_jsx(Input, { value: searchVal, onChange: (e) => setSearchVal(e.target.value), customSize: "large", iconStart: Search, placeholder: "Search by name or paste address" })), isDefaultMode && (_jsx(AccountFilter, { active: filter, onSetActive: (mode) => setFilter(mode) }))] })) }), _jsx(ModalBody, { children: _jsx(Grid, { gap: 10, children: isProvidersConnecting ? (_jsx(ProviderLoader, { providers: providers.map(prop("type")) })) : (_jsxs(_Fragment, { children: [hasNoResults && _jsx(Text, { children: "No accounts found" }), accountsWithBalances.map((account) => {
                                const Component = getAccountOptionComponent(account);
                                return (_jsx(Component, { ...account, isBalanceLoading: areBalancesLoading, onSelect: handleAccountSelect }, `${account.publicKey}-${account.provider}`));
                            })] })) }) })] }));
};
