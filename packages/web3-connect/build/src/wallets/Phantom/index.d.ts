import { WalletProviderType } from "@/config/providers";
import { BaseSolanaWallet } from "@/wallets/BaseSolanaWallet";
import { BaseSuiWallet } from "@/wallets/BaseSuiWallet";
export declare class Phantom extends BaseSolanaWallet {
    provider: WalletProviderType;
    title: string;
    installUrl: string;
    logo: string;
    get installed(): boolean;
    get rawExtension(): import("../../types/solana").SolanaInjectedWindowProvider | undefined;
    transformError: () => Error;
}
export declare class PhantomSui extends BaseSuiWallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    constructor();
    transformError: () => Error;
}
