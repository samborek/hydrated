import { WalletProviderType } from "@/config/providers";
import { BaseSubstrateWallet } from "@/wallets/BaseSubstrateWallet";
export declare class PolkadotJS extends BaseSubstrateWallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    get installed(): boolean;
}
