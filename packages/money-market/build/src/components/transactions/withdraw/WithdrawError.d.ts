import Big from "big.js";
import { ComputedReserveData } from "@/hooks/commonTypes";
declare enum ErrorType {
    CAN_NOT_WITHDRAW_THIS_AMOUNT = 0,
    POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY = 1,
    ZERO_LTV_WITHDRAW_BLOCKED = 2
}
interface WithdrawErrorProps {
    assetsBlockingWithdraw: string[];
    poolReserve: ComputedReserveData;
    healthFactorAfterWithdraw: Big;
    withdrawAmount: string;
}
export declare const useWithdrawError: ({ assetsBlockingWithdraw, poolReserve, healthFactorAfterWithdraw, withdrawAmount, }: WithdrawErrorProps) => {
    blockingError: ErrorType | undefined;
    errorText: string | undefined;
};
export {};
