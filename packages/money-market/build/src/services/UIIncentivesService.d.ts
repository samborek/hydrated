import { Provider } from "@ethersproject/providers";
import { MarketDataType } from "@/ui-config/marketsConfig";
export declare class UiIncentivesService {
    private readonly getProvider;
    constructor(getProvider: (chainId: number) => Provider);
    private getUiIncentiveDataProvider;
    getReservesIncentivesDataHumanized(marketData: MarketDataType): Promise<import("@aave/contract-helpers").ReservesIncentiveDataHumanized[]>;
    getUserReservesIncentivesData(marketData: MarketDataType, user: string): Promise<import("@aave/contract-helpers").UserReservesIncentivesDataHumanized[]>;
}
