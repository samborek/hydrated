import { UiIncentiveDataProvider, } from "@aave/contract-helpers";
export const createIncentiveSlice = (set, get) => ({
    refreshIncentiveData: async () => {
        const account = get().account;
        const currentMarketData = get().currentMarketData;
        const currentChainId = get().currentChainId;
        if (!currentMarketData.addresses.UI_INCENTIVE_DATA_PROVIDER)
            return;
        const poolDataProviderContract = new UiIncentiveDataProvider({
            uiIncentiveDataProviderAddress: currentMarketData.addresses.UI_INCENTIVE_DATA_PROVIDER,
            provider: get().jsonRpcProvider(),
            chainId: currentChainId,
        });
        const promises = [];
        try {
            promises.push(poolDataProviderContract
                .getReservesIncentivesDataHumanized({
                lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
            })
                .then((reserveIncentiveData) => set({ reserveIncentiveData })));
            if (account) {
                promises.push(poolDataProviderContract
                    .getUserReservesIncentivesDataHumanized({
                    lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
                    user: account,
                })
                    .then((userIncentiveData) => set({
                    userIncentiveData,
                })));
            }
            await Promise.all(promises);
        }
        catch (e) {
            console.log("error fetching incentives");
        }
    },
});
