import { ComputedReserveData } from "@/hooks/commonTypes";
interface ReserveActionStateProps {
    balance: string;
    maxAmountToSupply: string;
    maxAmountToBorrow: string;
    reserve: ComputedReserveData;
}
export declare const useReserveActionState: ({ balance, maxAmountToSupply, maxAmountToBorrow, reserve, }: ReserveActionStateProps) => {
    disableSupplyButton: boolean;
    disableBorrowButton: boolean;
    alerts: (false | import("react").JSX.Element | null)[];
};
export {};
