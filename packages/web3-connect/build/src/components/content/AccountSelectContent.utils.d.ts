import { WalletProviderType } from "@/config/providers";
import { Account, WalletMode } from "@/hooks/useWeb3Connect";
export declare const isAccountSelected: (currentAccount: Account | null, account?: Account | null) => boolean;
export declare const searchAccounts: (phrase: string) => (accounts: Account[]) => Account[];
export declare const filterAccounts: (mode: WalletMode) => (accounts: Account[]) => Account[];
export declare const getFilteredAccounts: (accounts: Account[], currentAccount: Account | null, search: string, mode: WalletMode) => Account[];
export declare const useAccountsWithBalance: (accounts: Account[]) => {
    accountsWithBalances: {
        isActive: boolean;
        name: string;
        publicKey: string;
        address: string;
        rawAddress: string;
        provider: WalletProviderType;
        delegate?: string;
        balance?: number;
        displayAddress: string;
        isIncompatible?: boolean;
    }[];
    areBalancesLoading: boolean;
};
