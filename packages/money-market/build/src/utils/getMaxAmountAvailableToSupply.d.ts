import Big from "big.js";
interface PoolReserveSupplySubset {
    supplyCap: string;
    debtCeiling: string;
    isolationModeTotalDebt: string;
    totalLiquidity: string;
    isFrozen: boolean;
    decimals: number;
}
export declare function remainingCap(cap: string, total: string): Big.Big;
export declare function getMaxAmountAvailableToSupply(walletBalance: string, poolReserve: PoolReserveSupplySubset, underlyingAsset: string, minRemainingBaseToken: string): string;
export {};
