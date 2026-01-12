import { FormattedGhoReserveData, FormattedGhoUserData, UserReserveData } from "@aave/math-utils";
import React from "react";
import { EmodeCategory } from "@/helpers/types";
import { ComputedReserveData, ExtendedFormattedUser } from "@/hooks/commonTypes";
import { ExternalApyData } from "@/types";
/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export declare const unPrefixSymbol: (symbol: string, prefix: string) => string;
export interface AppDataContextType {
    loading: boolean;
    isConnected: boolean;
    reserves: ComputedReserveData[];
    eModes: Record<number, EmodeCategory>;
    isUserHasDeposits: boolean;
    user: ExtendedFormattedUser;
    marketReferencePriceInUsd: string;
    marketReferenceCurrencyDecimals: number;
    userReserves: UserReserveData[];
    ghoReserveData: FormattedGhoReserveData;
    ghoUserData: FormattedGhoUserData;
    ghoLoadingData: boolean;
    ghoEnabled: boolean;
    externalApyData: ExternalApyData;
}
export declare const AppDataContext: React.Context<AppDataContextType>;
/**
 * This is the only provider you'll ever need.
 * It fetches reserves /incentives & walletbalances & keeps them updated.
 */
export declare const AppDataProvider: React.FC<{
    children: React.ReactNode;
    externalApyData: ExternalApyData;
}>;
export declare const useAppDataContext: () => AppDataContextType;
