import { WalletProviderType } from "@/config/providers";
import { DummySigner, Wallet, WalletAccount } from "@/types/wallet";
type DummyExtension = object;
export declare class ExternalWallet implements Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    _rawExtension: DummyExtension | undefined;
    _extension: DummyExtension | undefined;
    _signer: DummySigner | undefined;
    _enabled: boolean;
    account: WalletAccount | undefined;
    get extension(): object | undefined;
    get signer(): object | undefined;
    get installed(): boolean;
    get enabled(): boolean;
    get rawExtension(): object | undefined;
    handleAnnounceProvider: () => void;
    enable: () => Promise<void>;
    transformError: (err: Error) => Error;
    setAccount: (address: string) => void;
    getAccounts: () => Promise<WalletAccount[]>;
    subscribeAccounts: () => () => void;
    disconnect: () => void;
}
export {};
