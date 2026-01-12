import { ComputedReserveData } from "@/hooks/commonTypes";
export declare const useWalletData: (reserve: ComputedReserveData) => {
    balance: {
        amount: string;
        amountUSD: string;
    };
    maxAmountToBorrowUsd: string;
    maxAmountToSupplyUsd: string;
    maxAmountToBorrow: string;
    maxAmountToSupply: string;
    disableSupplyButton: boolean;
    disableBorrowButton: boolean;
    alerts: (false | import("react").JSX.Element | null)[];
    isLoading: boolean;
};
