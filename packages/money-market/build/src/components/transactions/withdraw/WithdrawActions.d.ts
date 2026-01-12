import { ComputedReserveData } from "@/hooks/commonTypes";
export interface WithdrawActionsProps {
    poolReserve: ComputedReserveData;
    amountToWithdraw: string;
    poolAddress: string;
    symbol: string;
    blocked: boolean;
    className?: string;
}
export declare const WithdrawActions: ({ poolReserve, amountToWithdraw, poolAddress, symbol, blocked, className, }: WithdrawActionsProps) => import("react").JSX.Element;
