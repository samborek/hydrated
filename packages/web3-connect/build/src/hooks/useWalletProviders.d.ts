import { WalletMode } from "@/hooks/useWeb3Connect";
import { Wallet } from "@/types/wallet";
type UseWalletProvidersResult = {
    installed: Wallet[];
    other: Wallet[];
};
export declare const useWalletProviders: (mode: WalletMode) => UseWalletProvidersResult;
export {};
