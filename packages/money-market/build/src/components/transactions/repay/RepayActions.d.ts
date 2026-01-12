import { InterestRate } from "@aave/contract-helpers";
import { ComputedReserveData } from "@/hooks/commonTypes";
export interface RepayActionProps {
    amountToRepay: string;
    poolReserve: ComputedReserveData;
    customGasPrice?: string;
    poolAddress: string;
    symbol: string;
    debtType: InterestRate;
    repayWithATokens: boolean;
    blocked?: boolean;
    maxApproveNeeded: string;
    className?: string;
}
export declare const RepayActions: ({ amountToRepay, poolReserve, poolAddress, symbol, debtType, repayWithATokens, blocked, className, }: RepayActionProps) => import("react").JSX.Element;
