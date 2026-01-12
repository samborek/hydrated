import { WalletProviderType } from "@/config/providers";
import { BaseEIP1193Wallet } from "@/wallets/BaseEIP1193Wallet";
export declare class RabbyWallet extends BaseEIP1193Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
}
