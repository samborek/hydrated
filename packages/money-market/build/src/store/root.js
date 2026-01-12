import { enableMapSet } from "immer";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";
import { createSingletonSubscriber } from "@/store/utils/createSingletonSubscriber";
import { POLLING_INTERVAL } from "@/ui-config/queries";
import { createGhoSlice } from "./ghoSlice";
import { createIncentiveSlice } from "./incentiveSlice";
import { createLayoutSlice } from "./layoutSlice";
import { createPoolSlice } from "./poolSlice";
import { createProtocolDataSlice } from "./protocolDataSlice";
import { createTransactionsSlice } from "./transactionsSlice";
import { createWalletSlice } from "./walletSlice";
enableMapSet();
export const useRootStore = create()(subscribeWithSelector(devtools((...args) => {
    return {
        ...createProtocolDataSlice(...args),
        ...createWalletSlice(...args),
        ...createPoolSlice(...args),
        ...createIncentiveSlice(...args),
        ...createGhoSlice(...args),
        ...createTransactionsSlice(...args),
        ...createLayoutSlice(...args),
    };
})));
export const usePoolDataSubscription = createSingletonSubscriber(() => {
    return useRootStore.getState().refreshPoolData();
}, POLLING_INTERVAL);
export const usePoolDataV3Subscription = createSingletonSubscriber(() => {
    return useRootStore.getState().refreshPoolV3Data();
}, POLLING_INTERVAL);
export const useIncentiveDataSubscription = createSingletonSubscriber(() => {
    return useRootStore.getState().refreshIncentiveData();
}, POLLING_INTERVAL);
export const useGhoDataSubscription = createSingletonSubscriber(() => {
    return useRootStore.getState().refreshGhoData();
}, POLLING_INTERVAL);
export const useCurrentMarketData = () => {
    const { currentMarketData, data } = useRootStore.getState();
    return data
        .get(currentMarketData.chainId)
        ?.get(currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER);
};
