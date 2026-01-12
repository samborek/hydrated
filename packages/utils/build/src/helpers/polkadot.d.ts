import { Binary } from "polkadot-api";
export declare const isBinary: (value: unknown) => value is Binary;
export declare const safeConvertAddressSS58: (address: string, ss58prefix?: number) => string;
export declare const isSS58Address: (address?: string) => address is string;
export declare const safeConvertSS58toPublicKey: (address: string) => "" | `0x${string}`;
export declare const normalizeSS58Address: (address: string) => string;
