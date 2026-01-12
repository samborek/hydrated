import { Buffer } from "buffer";
import { Address } from "viem";
export declare const numToBuffer: (num: number) => Buffer;
export declare const isH160Address: (address?: string) => address is string;
export declare function isEvmParachainAccount(address?: string): boolean;
export declare const safeConvertAddressH160: (value: Address | string) => string;
export declare const safeConvertH160toSS58: (address: string) => string;
export declare const safeConvertSS58toH160: (address: string) => string;
export declare const strip0x: (hex: string) => string;
export declare const getAssetIdFromAddress: (address: string) => string;
export declare const getAddressFromAssetId: (assetId: string) => string;
type EtherscanLinkPath = "tx" | "address" | "block";
export declare const etherscan: {
    link: (chainKey: string, path: EtherscanLinkPath, data: string | number, query?: Record<string, string | number>) => string;
    tx: (chainKey: string, txHash: string) => string;
    account: (chainKey: string, address: string) => string;
    block: (chainKey: string, blockHashOrNumber: string | number) => string;
};
export {};
