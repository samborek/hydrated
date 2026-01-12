import { ChainId } from "@aave/contract-helpers";
import { Provider } from "@ethersproject/providers";
import { BigSource } from "big.js";
export declare const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export interface ProviderWithSend extends Provider {
    send<P = any, R = any>(method: string, params: Array<P>): Promise<R>;
}
export declare function hexToAscii(_hex: string): string;
export interface CancelablePromise<T = unknown> {
    promise: Promise<T>;
    cancel: () => void;
}
export declare const makeCancelable: <T>(promise: Promise<T>) => {
    promise: Promise<T>;
    cancel(): void;
};
export declare const optimizedPath: (currentChainId: ChainId) => currentChainId is ChainId.arbitrum_one | ChainId.arbitrum_rinkeby | ChainId.optimism;
export declare const minBaseTokenRemainingByNetwork: Record<number, string>;
export declare const amountToUsd: (amount: BigSource, formattedPriceInMarketReferenceCurrency: string, marketReferencePriceInUsd: string) => import("big.js").Big;
type NativeToUSD = {
    amount: BigSource;
    currencyDecimals: number;
    priceInMarketReferenceCurrency: BigSource;
    marketReferenceCurrencyDecimals: number;
    normalizedMarketReferencePriceInUsd: BigSource;
};
export declare function nativeToUSD({ amount, currencyDecimals, priceInMarketReferenceCurrency, marketReferenceCurrencyDecimals, normalizedMarketReferencePriceInUsd, }: NativeToUSD): string;
export declare const roundToTokenDecimals: (inputValue: string, tokenDecimals: number) => string;
export declare const getFunctionDefsFromAbi: (abi: any[], method: string) => string | undefined;
export declare const wssToHttps: (url: string) => string;
export {};
