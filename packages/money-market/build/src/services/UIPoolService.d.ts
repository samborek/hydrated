import { ReservesDataHumanized } from "@aave/contract-helpers";
import { Provider } from "@ethersproject/providers";
import { MarketDataType } from "@/ui-config/marketsConfig";
export declare class UiPoolService {
    private readonly getProvider;
    constructor(getProvider: (chainId: number) => Provider);
    private getUiPoolDataService;
    getReservesHumanized(marketData: MarketDataType): Promise<ReservesDataHumanized>;
    getUserReservesHumanized(marketData: MarketDataType, user: string): Promise<{
        userReserves: import("@aave/contract-helpers").UserReserveDataHumanized[];
        userEmodeCategoryId: number;
    }>;
}
