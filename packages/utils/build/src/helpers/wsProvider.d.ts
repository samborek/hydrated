import { ApiPromise, WsProvider } from "@polkadot/api";
export declare function reconnectProvider(provider: WsProvider): Promise<void>;
export declare function changeProvider(prevUrl: string, nextUrl: string): Promise<void>;
export declare function getProviderInstance(api: ApiPromise): WsProvider;
