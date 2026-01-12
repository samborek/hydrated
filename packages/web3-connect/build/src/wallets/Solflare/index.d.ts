import { WalletProviderType } from "@/config/providers";
import { BaseSolanaWallet } from "@/wallets/BaseSolanaWallet";
export declare class Solflare extends BaseSolanaWallet {
    provider: WalletProviderType;
    title: string;
    installUrl: string;
    logo: string;
    get installed(): boolean;
    get rawExtension(): import("../../types/solana").SolanaInjectedWindowProvider | undefined;
}
