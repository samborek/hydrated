import { EIP1193Provider } from "viem";
type RequestNetworkSwitchOptions = {
    onSwitch?: () => void;
    chain?: string;
};
export declare function requestAccounts(provider: EIP1193Provider): Promise<void>;
export declare function requestNetworkSwitch(provider: EIP1193Provider, options?: RequestNetworkSwitchOptions): Promise<void>;
export type AddEvmChainParams = {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    iconUrls: string[];
    rpcUrls: string[];
    blockExplorerUrls?: string[];
};
export declare function isEip1193Provider(provider: EIP1193Provider | null | undefined): provider is Required<EIP1193Provider>;
export {};
