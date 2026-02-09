import { WalletProviderType } from "@/config/providers";
export declare enum WalletProviderStatus {
    Connected = "connected",
    Pending = "pending",
    Disconnected = "disconnected",
    Error = "error"
}
export declare enum WalletMode {
    Default = "default",
    EVM = "evm",
    Substrate = "substrate",
    SubstrateEVM = "substrate-evm",
    SubstrateH160 = "substrate-h160",
    Solana = "solana",
    Sui = "sui",
    Unknown = "unknown"
}
export declare const COMPATIBLE_WALLET_PROVIDERS: WalletProviderType[];
export declare const PROVIDERS_BY_WALLET_MODE: Record<WalletMode, WalletProviderType[]>;
export type StoredAccount = {
    name: string;
    publicKey: string;
    address: string;
    rawAddress: string;
    provider: WalletProviderType;
    delegate?: string;
    balance?: number;
};
export type Account = StoredAccount & {
    displayAddress: string;
    isIncompatible?: boolean;
};
type Web3ConnectModalMeta = {
    title?: string;
    description?: string;
};
type WalletProviderEntry = {
    type: WalletProviderType;
    status: WalletProviderStatus;
};
export type WalletProviderState = {
    open: boolean;
    providers: WalletProviderEntry[];
    recentProvider: WalletProviderType | null;
    account: StoredAccount | null;
    accounts: StoredAccount[];
    mode: WalletMode;
    error?: string;
    meta?: Web3ConnectModalMeta | null;
};
export type WalletProviderStore = WalletProviderState & {
    toggle: (mode?: WalletMode, meta?: Web3ConnectModalMeta) => void;
    setAccount: (account: StoredAccount | null) => void;
    setAccounts: (accounts: StoredAccount[]) => void;
    setBalances: (balances: ReadonlyMap<string, number>) => void;
    setStatus: (provider: WalletProviderType | null, status: WalletProviderStatus) => void;
    getStatus: (provider: WalletProviderType | null) => WalletProviderStatus;
    getConnectedProviders: (mode: WalletMode) => WalletProviderEntry[];
    setError: (error: string) => void;
    disconnect: (provider?: WalletProviderType) => void;
};
export declare const useWeb3Connect: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<WalletProviderStore>, "setState" | "persist"> & {
    setState(partial: WalletProviderStore | Partial<WalletProviderStore> | ((state: WalletProviderStore) => WalletProviderStore | Partial<WalletProviderStore>), replace?: false | undefined): unknown;
    setState(state: WalletProviderStore | ((state: WalletProviderStore) => WalletProviderStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<WalletProviderStore, any, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: WalletProviderStore) => void) => () => void;
        onFinishHydration: (fn: (state: WalletProviderStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<WalletProviderStore, any, unknown>>;
    };
}>;
export {};
