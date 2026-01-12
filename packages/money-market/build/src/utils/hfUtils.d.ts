import { ComputedUserReserve, UserReserveData } from "@aave/math-utils";
import Big, { BigSource } from "big.js";
import { ComputedReserveData, ComputedUserReserveData, ExtendedFormattedUser } from "@/hooks/commonTypes";
interface CalculateHFAfterSwapProps {
    fromAmount: BigSource;
    fromAssetData: ComputedReserveData;
    fromAssetUserData: ComputedUserReserve;
    toAmountAfterSlippage: BigSource;
    toAssetData: ComputedReserveData;
    user: ExtendedFormattedUser;
}
interface CalculateHFAfterSwapRepayProps {
    amountToReceiveAfterSwap: BigSource;
    amountToSwap: BigSource;
    fromAssetData: ComputedReserveData;
    toAssetData: ComputedReserveData;
    user: ExtendedFormattedUser;
    repayWithUserReserve?: UserReserveData;
    debt: string;
}
interface CalculateHFAfterWithdrawProps {
    user: ExtendedFormattedUser;
    userReserve: ComputedUserReserveData;
    poolReserve: ComputedReserveData;
    withdrawAmount: string;
}
export declare function calculateHFAfterSwap({ fromAmount, fromAssetData, fromAssetUserData, toAmountAfterSlippage, toAssetData, user, }: CalculateHFAfterSwapProps): {
    hfEffectOfFromAmount: string;
    hfAfterSwap: Big.Big;
};
export declare const calculateHFAfterRepay: ({ user, amountToReceiveAfterSwap, amountToSwap, fromAssetData, toAssetData, repayWithUserReserve, debt, }: CalculateHFAfterSwapRepayProps) => {
    hfEffectOfFromAmount: Big.Big;
    hfAfterSwap: number | BigNumber;
};
export declare const calculateHFAfterWithdraw: ({ user, userReserve, poolReserve, withdrawAmount, }: CalculateHFAfterWithdrawProps) => Big.Big;
interface CalculateHFAfterSupplyProps {
    user: ExtendedFormattedUser;
    poolReserve: ComputedReserveData;
    supplyAmount: string;
}
export declare const calculateHFAfterSupply: ({ user, poolReserve, supplyAmount, }: CalculateHFAfterSupplyProps) => Big.Big;
export {};
