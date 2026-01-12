import { InjectedPolkadotAccount } from "polkadot-api/pjs-signer";
import { WalletProviderType } from "@/config/providers";
import { BaseEIP1193Wallet } from "@/wallets/BaseEIP1193Wallet";
import { BaseSubstrateWallet } from "@/wallets/BaseSubstrateWallet";
export declare class SubWallet extends BaseSubstrateWallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    accountFilter: (account: InjectedPolkadotAccount) => boolean;
}
export declare class SubWalletH160 extends BaseSubstrateWallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    accountFilter: (account: InjectedPolkadotAccount) => boolean;
}
export declare class SubWalletEvm extends BaseEIP1193Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
}
