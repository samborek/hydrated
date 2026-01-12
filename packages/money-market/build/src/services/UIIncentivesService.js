import { UiIncentiveDataProvider } from "@aave/contract-helpers";
import invariant from "tiny-invariant";
export class UiIncentivesService {
    getProvider;
    constructor(getProvider) {
        this.getProvider = getProvider;
    }
    getUiIncentiveDataProvider(marketData) {
        const provider = this.getProvider(marketData.chainId);
        invariant(marketData.addresses.UI_INCENTIVE_DATA_PROVIDER, "No UI incentive data provider address found for this market");
        return new UiIncentiveDataProvider({
            uiIncentiveDataProviderAddress: marketData.addresses.UI_INCENTIVE_DATA_PROVIDER,
            provider,
            chainId: marketData.chainId,
        });
    }
    async getReservesIncentivesDataHumanized(marketData) {
        const uiIncentiveDataProvider = this.getUiIncentiveDataProvider(marketData);
        return uiIncentiveDataProvider.getReservesIncentivesDataHumanized({
            lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
        });
    }
    async getUserReservesIncentivesData(marketData, user) {
        const uiIncentiveDataProvider = this.getUiIncentiveDataProvider(marketData);
        return uiIncentiveDataProvider.getUserReservesIncentivesDataHumanized({
            user,
            lendingPoolAddressProvider: marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
        });
    }
}
