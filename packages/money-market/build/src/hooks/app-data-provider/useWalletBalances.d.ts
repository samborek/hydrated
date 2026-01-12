import { ReservesDataHumanized } from "@aave/contract-helpers";
import { UserPoolTokensBalances } from "@/services/WalletBalanceService";
import { MarketDataType } from "@/utils/marketsAndNetworksConfig";
export interface WalletBalance {
    address: string;
    amount: string;
}
export declare const usePoolsWalletBalances: (marketDatas: MarketDataType[]) => {
    isLoading: import("@tanstack/query-core").QueryObserverRefetchErrorResult<ReservesDataHumanized, Error> | import("@tanstack/query-core").QueryObserverSuccessResult<ReservesDataHumanized, Error> | import("@tanstack/query-core").QueryObserverLoadingErrorResult<ReservesDataHumanized, Error> | import("@tanstack/query-core").QueryObserverPendingResult<ReservesDataHumanized, Error> | import("@tanstack/query-core").QueryObserverPlaceholderResult<ReservesDataHumanized, Error> | import("@tanstack/query-core").QueryObserverRefetchErrorResult<UserPoolTokensBalances[], Error> | import("@tanstack/query-core").QueryObserverSuccessResult<UserPoolTokensBalances[], Error> | import("@tanstack/query-core").QueryObserverLoadingErrorResult<UserPoolTokensBalances[], Error> | import("@tanstack/query-core").QueryObserverPendingResult<UserPoolTokensBalances[], Error> | import("@tanstack/query-core").QueryObserverPlaceholderResult<UserPoolTokensBalances[], Error> | undefined;
    walletBalances: {
        walletBalances: {
            [address: string]: {
                amount: string;
                amountUSD: string;
            };
        };
        hasEmptyWallet: boolean;
    }[];
};
export declare const useWalletBalances: (marketData: MarketDataType) => {
    walletBalances: Record<string, {
        amount: string;
        amountUSD: string;
    }>;
    hasEmptyWallet: boolean;
    loading: boolean;
};
