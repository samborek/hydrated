import { InterestRate } from "@aave/contract-helpers";
import { FormatUserSummaryAndIncentivesResponse } from "@aave/math-utils";
import { ComputedReserveData, ExtendedFormattedUser } from "@/hooks/commonTypes";
interface PoolReserveBorrowSubset {
    borrowCap: string;
    availableLiquidityUSD: string;
    totalDebt: string;
    isFrozen: boolean;
    decimals: number;
    formattedAvailableLiquidity: string;
    formattedPriceInMarketReferenceCurrency: string;
    borrowCapUSD: string;
}
/**
 * Calculates the maximum amount a user can borrow.
 * @param poolReserve
 * @param userReserve
 * @param user
 */
export declare function getMaxAmountAvailableToBorrow(poolReserve: PoolReserveBorrowSubset, user: FormatUserSummaryAndIncentivesResponse, rateMode: InterestRate): string;
/**
 * Calculates the maximum amount of GHO a user can mint
 * @param user
 */
export declare function getMaxGhoMintAmount(user: FormatUserSummaryAndIncentivesResponse, poolReserve: PoolReserveBorrowSubset): string;
export declare function assetCanBeBorrowedByUser({ borrowingEnabled, isActive, borrowableInIsolation, eModeCategoryId, isFrozen, isPaused, }: ComputedReserveData, user: ExtendedFormattedUser): boolean;
export {};
