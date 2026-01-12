import { InterestRate } from "@aave/contract-helpers";
import React from "react";
import { ComputedReserveData } from "@/hooks/commonTypes";
export interface BorrowActionsProps {
    poolReserve: ComputedReserveData;
    amountToBorrow: string;
    poolAddress: string;
    interestRateMode: InterestRate;
    symbol: string;
    blocked: boolean;
    className?: string;
}
export declare const BorrowActions: React.MemoExoticComponent<({ symbol, poolReserve, amountToBorrow, poolAddress, interestRateMode, blocked, className, }: BorrowActionsProps) => React.JSX.Element>;
