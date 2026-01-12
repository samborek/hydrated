import { WalletProviderType } from "@/config/providers";
import { BaseSuiWallet } from "@/wallets/BaseSuiWallet";
export declare class Slush extends BaseSuiWallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    constructor();
}
