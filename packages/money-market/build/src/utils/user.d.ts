import { FormattedGhoReserveData, FormattedGhoUserData, FormatUserSummaryAndIncentivesResponse } from "@aave/math-utils";
import { ComputedReserveData, ExtendedFormattedUser } from "@/hooks";
export declare const getUserLoanToValue: (user: ExtendedFormattedUser) => string;
type UserClaimableRewards = {
    claimableRewardsUsd: number;
    assets: string[];
};
export declare const getUserClaimableRewards: (user: ExtendedFormattedUser) => UserClaimableRewards;
/**
 * Original AAVE calculation of earnedAPY, debtAPY, netAPY.
 * Touch at your own risk.
 */
export declare const getUserApyValues: (user: FormatUserSummaryAndIncentivesResponse, reserves: ComputedReserveData[], ghoUserData: FormattedGhoUserData, ghoReserve: FormattedGhoReserveData) => {
    earnedAPY: number;
    debtAPY: number;
    netAPY: number;
};
export {};
