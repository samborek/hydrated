import { InjectedExtension, InjectedPolkadotAccount, PolkadotSigner } from "polkadot-api/pjs-signer";
import { WalletProviderType } from "@/config/providers";
import { SubscriptionFn, Wallet, WalletAccount } from "@/types/wallet";
import { WalletError } from "@/utils/errors";
export declare class BaseSubstrateWallet implements Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    _extension: InjectedExtension | undefined;
    _signer: PolkadotSigner | undefined;
    _enabled: boolean;
    get extension(): InjectedExtension | undefined;
    get signer(): PolkadotSigner | undefined;
    get installed(): boolean;
    get enabled(): boolean;
    get rawExtension(): any;
    transformError: (err: Error) => WalletError | Error;
    setSigner: (address: string) => void;
    enable: () => Promise<void>;
    getInjectedAccounts: () => InjectedPolkadotAccount[];
    accountFilter: (account: InjectedPolkadotAccount) => boolean;
    getAccounts: () => Promise<WalletAccount[]>;
    subscribeAccounts: (callback: SubscriptionFn) => () => void;
    disconnect: () => void;
}
