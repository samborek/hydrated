import { produce } from "immer";
import { omit, prop, uniqueBy } from "remeda";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EVM_PROVIDERS, SOLANA_PROVIDERS, SUBSTRATE_H160_PROVIDERS, SUBSTRATE_PROVIDERS, SUI_PROVIDERS, WalletProviderType, } from "@/config/providers";
import { getWallet } from "@/wallets";
import { BaseSubstrateWallet } from "@/wallets/BaseSubstrateWallet";
export var WalletProviderStatus;
(function (WalletProviderStatus) {
    WalletProviderStatus["Connected"] = "connected";
    WalletProviderStatus["Pending"] = "pending";
    WalletProviderStatus["Disconnected"] = "disconnected";
    WalletProviderStatus["Error"] = "error";
})(WalletProviderStatus || (WalletProviderStatus = {}));
export var WalletMode;
(function (WalletMode) {
    WalletMode["Default"] = "default";
    WalletMode["EVM"] = "evm";
    WalletMode["Substrate"] = "substrate";
    WalletMode["SubstrateEVM"] = "substrate-evm";
    WalletMode["SubstrateH160"] = "substrate-h160";
    WalletMode["Solana"] = "solana";
    WalletMode["Sui"] = "sui";
    WalletMode["Unknown"] = "unknown";
})(WalletMode || (WalletMode = {}));
export const COMPATIBLE_WALLET_PROVIDERS = [
    ...SUBSTRATE_PROVIDERS,
    ...EVM_PROVIDERS,
];
export const PROVIDERS_BY_WALLET_MODE = {
    [WalletMode.Default]: COMPATIBLE_WALLET_PROVIDERS,
    [WalletMode.EVM]: EVM_PROVIDERS,
    [WalletMode.Substrate]: SUBSTRATE_PROVIDERS,
    [WalletMode.SubstrateEVM]: [...SUBSTRATE_PROVIDERS, ...EVM_PROVIDERS],
    [WalletMode.SubstrateH160]: SUBSTRATE_H160_PROVIDERS,
    [WalletMode.Solana]: SOLANA_PROVIDERS,
    [WalletMode.Sui]: SUI_PROVIDERS,
    [WalletMode.Unknown]: [],
};
const initialState = {
    open: false,
    providers: [],
    recentProvider: null,
    account: null,
    accounts: [],
    mode: WalletMode.Default,
    error: "",
    meta: null,
};
export const useWeb3Connect = create()(persist((set, get) => ({
    ...initialState,
    toggle: (mode, meta) => set((state) => {
        const isValidMode = mode && Object.values(WalletMode).includes(mode);
        return {
            ...state,
            mode: isValidMode ? mode : WalletMode.Default,
            open: !state.open,
            meta: meta ?? null,
        };
    }),
    setAccounts: (accounts) => set((state) => ({
        ...state,
        accounts: uniqueBy([...state.accounts, ...accounts], prop("publicKey")),
    })),
    setAccount: (account) => {
        if (account) {
            const wallet = getWallet(account.provider);
            if (wallet instanceof BaseSubstrateWallet) {
                wallet.setSigner(account.address);
            }
        }
        return set((state) => ({ ...state, account }));
    },
    setBalances: (balances) => {
        return set((state) => produce(state, ({ accounts }) => {
            for (const account of accounts) {
                const balance = balances.get(account.publicKey);
                if (balance !== undefined) {
                    account.balance = balance;
                }
            }
        }));
    },
    setStatus: (provider, status) => {
        const isError = status === WalletProviderStatus.Error;
        return set((state) => ({
            ...state,
            providers: provider
                ? [
                    ...state.providers.filter((p) => p.type !== provider),
                    { type: provider, status },
                ]
                : state.providers,
            recentProvider: provider,
            account: isError ? null : state.account,
            error: isError ? state.error : "",
        }));
    },
    getStatus: (provider) => {
        const foundProvider = get().providers.find((p) => p.type === provider);
        return foundProvider?.status ?? WalletProviderStatus.Disconnected;
    },
    getConnectedProviders: (mode) => {
        const { providers } = get();
        if (mode === WalletMode.Default) {
            return providers;
        }
        return providers.filter(({ type }) => {
            const providers = PROVIDERS_BY_WALLET_MODE[mode];
            if (providers.length > 0) {
                return providers.includes(type);
            }
            return true;
        });
    },
    setError: (error) => set((state) => ({ ...state, error })),
    disconnect: (givenProvider) => {
        const provider = Object.values(WalletProviderType).find((type) => type === givenProvider);
        set((state) => ({
            ...state,
            ...initialState,
            account: !provider || provider === state.account?.provider
                ? null
                : state.account,
            accounts: provider
                ? state.accounts.filter((a) => a.provider !== provider)
                : [],
            providers: provider
                ? state.providers.filter((p) => p.type !== provider)
                : [],
            recentProvider: null,
            mode: state.mode,
            open: state.open,
        }));
    },
}), {
    name: "web3-connect",
    partialize: omit(["open", "error", "accounts"]),
    version: 9,
    migrate: (persistedState) => persistedState,
}));
