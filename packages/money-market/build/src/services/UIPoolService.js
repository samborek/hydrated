import { UiPoolDataProvider, } from "@aave/contract-helpers";
export class UiPoolService {
    getProvider;
    constructor(getProvider) {
        this.getProvider = getProvider;
    }
    getUiPoolDataService(marketData) {
        const provider = this.getProvider(marketData.chainId);
        return new UiPoolDataProvider({
            uiPoolDataProviderAddress: marketData.addresses.UI_POOL_DATA_PROVIDER,
            provider,
            chainId: marketData.chainId,
        });
    }
    async getReservesHumanized(marketData) {
        const uiPoolDataProvider = this.getUiPoolDataService(marketData);
        return uiPoolDataProvider.getReservesHumanized({
            lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
        });
    }
    async getUserReservesHumanized(marketData, user) {
        const uiPoolDataProvider = this.getUiPoolDataService(marketData);
        return uiPoolDataProvider.getUserReservesHumanized({
            user,
            lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
        });
    }
}
