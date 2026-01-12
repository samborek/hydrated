import { WalletProviderType } from "@/config/providers";
import { BaseEIP1193Wallet } from "@/wallets/BaseEIP1193Wallet";
import { BaseSolanaWallet } from "@/wallets/BaseSolanaWallet";
export declare class BraveWallet extends BaseEIP1193Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
}
export declare class BraveWalletSol extends BaseSolanaWallet {
    provider: WalletProviderType;
    title: string;
    installUrl: string;
    logo: string;
    get installed(): boolean;
    get rawExtension(): import("../../types/solana").SolanaInjectedWindowProvider | undefined;
    transformError: () => Error;
}
