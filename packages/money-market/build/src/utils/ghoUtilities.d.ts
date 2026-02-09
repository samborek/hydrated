import { FormattedGhoReserveData } from "@aave/math-utils";
import { ComputedReserveData } from "@/hooks/commonTypes";
export declare const GHO_SYMBOL = "HUSD";
export declare const GHO_ASSET_ID = "222";
/**
 * Determines if GHO is available for borrowing (minting) on the provided network, also based off the token symbol being borrowed
 * @param {GhoUtilMintingAvailableParams} - The reserve symbol and current market name
 * @returns {bool} - If the GHO token is available for minting
 */
export declare const GHO_SUPPORTED_MARKETS: string[];
export declare const isGho: (reserve: ComputedReserveData) => boolean;
export declare const getGhoReserve: (reserves: ComputedReserveData[]) => ComputedReserveData | undefined;
/**
 * Calculates the weighted average APY
 * @param baseVariableBorrowRate - The base variable borrow rate, normalized
 * @param totalBorrowAmount - The total amount of the asset that is being borrowed
 * @param discountableAmount - The amount that can be discounted for the user
 * @param borrowRateAfterDiscount - The borrow rate after the discount is applied
 * @returns
 */
export declare const weightedAverageAPY: (baseVariableBorrowRate: number, totalBorrowAmount: number, discountableAmount: number, borrowRateAfterDiscount: number) => number;
/**
 * This helps display the discountable amount of GHO based off of how much is being borrowed and how much is discountable.
 * This is used in both the borrow modal and the discount rate calculator.
 * @param discountableGhoAmount - The amount of GHO that is discountable
 * @param amountGhoBeingBorrowed - The amount of GHO requesting to be borrowed
 * @returns The amount of discountable GHO as a number in a display-friendly form
 */
export declare const displayDiscountableAmount: (discountableGhoAmount: number, amountGhoBeingBorrowed: number) => number;
/**
 * This helps display the non-discountable amount of GHO based off of how much is being borrowed and how much is discountable.
 * This is used in both the borrow modal and the discount rate calculator.
 * @param discountableGhoAmount - The amount of GHO that is discountable
 * @param amountGhoBeingBorrowed - The amount of GHO requesting to be borrowed
 * @returns The amount of non-discountable GHO as a number in a display-friendly form
 */
export declare const displayNonDiscountableAmount: (discountableGhoAmount: number, amountGhoBeingBorrowed: number) => number;
interface ReserveWithSymbol {
    symbol: string;
}
type FindAndFilterReturn<T> = {
    value: T | undefined;
    filtered: Array<T>;
};
export declare const findAndFilterGhoReserve: <T extends ReserveWithSymbol>(reserves: Array<T>) => FindAndFilterReturn<T>;
export declare const formatGhoReserve: (reserve: ComputedReserveData, ghoReserveData: FormattedGhoReserveData) => {
    borrowCap: string;
    borrowCapUSD: string;
    totalLiquidityUSD: string;
    availableLiquidityUSD: string;
    totalDebtUSD: string;
    totalVariableDebtUSD: string;
    totalStableDebtUSD: string;
    supplyCapUSD: string;
    unbackedUSD: string;
    priceInMarketReferenceCurrency: string;
    formattedPriceInMarketReferenceCurrency: string;
    priceInUSD: string;
    formattedBaseLTVasCollateral: string;
    formattedReserveLiquidationThreshold: string;
    formattedReserveLiquidationBonus: string;
    formattedEModeLtv: string;
    formattedEModeLiquidationBonus: string;
    formattedEModeLiquidationThreshold: string;
    formattedAvailableLiquidity: string;
    totalDebt: string;
    totalVariableDebt: string;
    totalStableDebt: string;
    totalLiquidity: string;
    borrowUsageRatio: string;
    supplyUsageRatio: string;
    supplyAPY: string;
    variableBorrowAPY: string;
    stableBorrowAPY: string;
    unborrowedLiquidity: string;
    supplyAPR: string;
    variableBorrowAPR: string;
    stableBorrowAPR: string;
    isIsolated: boolean;
    isolationModeTotalDebtUSD: string;
    availableDebtCeilingUSD: string;
    debtCeilingUSD: string;
    id: string;
    symbol: string;
    name: string;
    decimals: number;
    underlyingAsset: string;
    usageAsCollateralEnabled: boolean;
    reserveFactor: string;
    baseLTVasCollateral: string;
    averageStableRate: string;
    stableDebtLastUpdateTimestamp: number;
    liquidityIndex: string;
    reserveLiquidationThreshold: string;
    reserveLiquidationBonus: string;
    variableBorrowIndex: string;
    variableBorrowRate: string;
    availableLiquidity: string;
    stableBorrowRate: string;
    liquidityRate: string;
    totalPrincipalStableDebt: string;
    totalScaledVariableDebt: string;
    lastUpdateTimestamp: number;
    eModeCategoryId: number;
    supplyCap: string;
    debtCeiling: string;
    debtCeilingDecimals: number;
    isolationModeTotalDebt: string;
    eModeLtv: number;
    eModeLiquidationThreshold: number;
    eModeLiquidationBonus: number;
    unbacked: string;
    aIncentivesData?: import("@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives").ReserveIncentiveResponse[] | undefined;
    vIncentivesData?: import("@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives").ReserveIncentiveResponse[] | undefined;
    sIncentivesData?: import("@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives").ReserveIncentiveResponse[] | undefined;
    borrowingEnabled: boolean;
    stableBorrowRateEnabled: boolean;
    isActive: boolean;
    isFrozen: boolean;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    interestRateStrategyAddress: string;
    priceOracle: string;
    variableRateSlope1: string;
    variableRateSlope2: string;
    stableRateSlope1: string;
    stableRateSlope2: string;
    baseStableBorrowRate: string;
    baseVariableBorrowRate: string;
    optimalUsageRatio: string;
    isPaused: boolean;
    isSiloedBorrowing: boolean;
    accruedToTreasury: string;
    eModePriceSource: string;
    eModeLabel: string;
    borrowableInIsolation: boolean;
    flashLoanEnabled: boolean;
    iconSymbol: string;
    isEmodeEnabled: boolean;
    isWrappedBaseAsset: boolean;
};
export declare const getGhoBorrowApyRange: (ghoReserveData: FormattedGhoReserveData) => number | [number, number];
export {};
