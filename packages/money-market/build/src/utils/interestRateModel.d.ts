export type InterestRateModelOpts = {
    variableRateSlope1: string;
    variableRateSlope2: string;
    stableRateSlope1: string;
    stableRateSlope2: string;
    stableBorrowRateEnabled?: boolean;
    optimalUsageRatio: string;
    utilizationRate: string;
    baseVariableBorrowRate: string;
    baseStableBorrowRate: string;
    totalLiquidityUSD: string;
    totalDebtUSD: string;
};
type Rate = {
    stableRate: number;
    variableRate: number;
    utilization: number;
};
export declare const getInterestRates: ({ variableRateSlope1, variableRateSlope2, stableRateSlope1, stableRateSlope2, optimalUsageRatio, baseVariableBorrowRate, baseStableBorrowRate, }: InterestRateModelOpts) => Rate[];
export {};
