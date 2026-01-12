import { HookOpts } from "@/hooks/commonTypes";
import { UserPoolTokensBalances } from "@/services/WalletBalanceService";
import { MarketDataType } from "@/ui-config/marketsConfig";
export declare const usePoolsTokensBalance: <T = UserPoolTokensBalances[]>(marketsData: MarketDataType[], user: string, opts?: HookOpts<UserPoolTokensBalances[], T>) => import("@tanstack/react-query").UseQueryResult<unknown extends T ? UserPoolTokensBalances[] : T, Error>[];
export declare const usePoolTokensBalance: (marketData: MarketDataType) => import("@tanstack/react-query").UseQueryResult<UserPoolTokensBalances[], Error>;
