import { InjectedPolkadotAccount } from "polkadot-api/pjs-signer";
import { WalletProviderType } from "@/config/providers";
import { BaseEIP1193Wallet } from "@/wallets/BaseEIP1193Wallet";
import { BaseSubstrateWallet } from "@/wallets/BaseSubstrateWallet";
export declare class Talisman extends BaseSubstrateWallet {
    provider: WalletProviderType;
    title: string;
    accessor: string;
    installUrl: string;
    logo: string;
    accountFilter: (account: InjectedPolkadotAccount) => boolean;
}
export declare class TalismanH160 extends BaseSubstrateWallet {
    provider: WalletProviderType;
    title: string;
    accessor: string;
    installUrl: string;
    logo: string;
    accountFilter: (account: InjectedPolkadotAccount) => boolean;
}
export declare class TalismanEvm extends BaseEIP1193Wallet {
    provider: WalletProviderType;
    title: string;
    accessor: string;
    installUrl: string;
    logo: string;
}
