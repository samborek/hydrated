import { Provider } from "@ethersproject/providers";
import { MarketDataType } from "@/ui-config/marketsConfig";
export interface GovernanceTokensBalance {
    aave: string;
    stkAave: string;
    aAave: string;
}
export type UserPoolTokensBalances = {
    address: string;
    amount: string;
};
export declare class WalletBalanceService {
    private readonly getProvider;
    constructor(getProvider: (chainId: number) => Provider);
    private getWalletBalanceService;
    getPoolTokensBalances(marketData: MarketDataType, user: string): Promise<UserPoolTokensBalances[]>;
}
