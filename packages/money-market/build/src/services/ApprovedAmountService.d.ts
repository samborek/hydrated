import { ApproveType } from "@aave/contract-helpers";
import { Provider } from "@ethersproject/providers";
import { MarketDataType } from "@/ui-config/marketsConfig";
export declare class ApprovedAmountService {
    private readonly getProvider;
    constructor(getProvider: (chainId: number) => Provider);
    private getERC20Service;
    private getPoolService;
    private getLendingPoolService;
    getPoolApprovedAmount(marketData: MarketDataType, user: string, token: string): Promise<ApproveType>;
    getApprovedAmount(marketData: MarketDataType, user: string, token: string, spender: string): Promise<number>;
}
