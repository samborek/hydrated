export declare const useSuppliedAssetsData: () => {
    data: {
        supplyAPY: string;
        underlyingBalance: string;
        underlyingBalanceMarketReferenceCurrency: string;
        underlyingBalanceUSD: string;
        variableBorrows: string;
        variableBorrowsMarketReferenceCurrency: string;
        variableBorrowsUSD: string;
        stableBorrows: string;
        stableBorrowsMarketReferenceCurrency: string;
        stableBorrowsUSD: string;
        totalBorrows: string;
        totalBorrowsMarketReferenceCurrency: string;
        totalBorrowsUSD: string;
        stableBorrowAPY: string;
        stableBorrowAPR: string;
        reserve: import("./commonTypes").ComputedReserveData;
        underlyingAsset: string;
        scaledATokenBalance: string;
        usageAsCollateralEnabledOnUser: boolean;
        stableBorrowRate: string;
        scaledVariableDebt: string;
        principalStableDebt: string;
        stableBorrowLastUpdateTimestamp: number;
    }[];
    isLoading: boolean;
};
