import { GhoSlice } from "./ghoSlice";
import { IncentiveSlice } from "./incentiveSlice";
import { LayoutSlice } from "./layoutSlice";
import { PoolSlice } from "./poolSlice";
import { ProtocolDataSlice } from "./protocolDataSlice";
import { TransactionsSlice } from "./transactionsSlice";
import { WalletSlice } from "./walletSlice";
export type RootStore = ProtocolDataSlice & WalletSlice & PoolSlice & IncentiveSlice & GhoSlice & TransactionsSlice & LayoutSlice;
export declare const useRootStore: import("zustand/traditional").UseBoundStoreWithEqualityFn<Omit<Omit<import("zustand").StoreApi<RootStore>, "subscribe"> & {
    subscribe: {
        (listener: (selectedState: RootStore, previousSelectedState: RootStore) => void): () => void;
        <U>(selector: (state: RootStore) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
            equalityFn?: ((a: U, b: U) => boolean) | undefined;
            fireImmediately?: boolean;
        } | undefined): () => void;
    };
}, "setState"> & {
    setState(partial: RootStore | Partial<RootStore> | ((state: RootStore) => RootStore | Partial<RootStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: RootStore | ((state: RootStore) => RootStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
}>;
export declare const usePoolDataSubscription: () => () => Promise<void>;
export declare const usePoolDataV3Subscription: () => () => Promise<void>;
export declare const useIncentiveDataSubscription: () => () => Promise<void>;
export declare const useGhoDataSubscription: () => () => Promise<void>;
export declare const useCurrentMarketData: () => import("./poolSlice").PoolReserve | undefined;
