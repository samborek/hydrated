import { EIP1193Provider } from "viem";
import { WalletProviderType } from "@/config/providers";
import { EthereumSigner } from "@/signers/EthereumSigner";
import { EIP6963AnnounceProviderEvent } from "@/types/evm";
import { SubscriptionFn, Wallet, WalletAccount } from "@/types/wallet";
export declare class BaseEIP1193Wallet implements Wallet {
    provider: WalletProviderType;
    accessor: string;
    title: string;
    installUrl: string;
    logo: string;
    _rawExtension: EIP1193Provider | undefined;
    _extension: Required<EIP1193Provider> | undefined;
    _signer: EthereumSigner | undefined;
    _enabled: boolean;
    constructor();
    get extension(): Required<{
        on: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
        removeListener: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
        request: import("viem").EIP1193RequestFn<import("viem").EIP1474Methods>;
    }> | undefined;
    get signer(): EthereumSigner | undefined;
    get installed(): boolean;
    get enabled(): boolean;
    get rawExtension(): {
        on: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
        removeListener: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
        request: import("viem").EIP1193RequestFn<import("viem").EIP1474Methods>;
    } | undefined;
    handleAnnounceProvider: (e: EIP6963AnnounceProviderEvent) => void;
    transformError: (err: Error) => Error;
    enable: () => Promise<void>;
    getAccounts: () => Promise<WalletAccount[]>;
    toWalletAccount: (address: string) => WalletAccount;
    subscribeAccounts: (callback: SubscriptionFn) => () => void;
    disconnect: () => void;
}
