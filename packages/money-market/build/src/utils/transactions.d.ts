import { CollateralType } from "@/helpers/types";
import { ComputedUserReserveData, ExtendedFormattedUser } from "@/hooks/commonTypes";
export declare enum ErrorType {
    SUPPLY_CAP_REACHED = 0,
    HF_BELOW_ONE = 1,
    NOT_ENOUGH_COLLATERAL_TO_REPAY_WITH = 2,
    ZERO_LTV_WITHDRAW_BLOCKED = 3
}
export declare const useFlashloan: (healthFactor: string, hfEffectOfFromAmount: string) => boolean;
export declare const APPROVAL_GAS_LIMIT = 65000;
export declare const APPROVE_DELEGATION_GAS_LIMIT = 55000;
export declare const checkRequiresApproval: ({ approvedAmount, signedAmount, amount, }: {
    approvedAmount: string;
    signedAmount: string;
    amount: string;
}) => boolean;
export declare const zeroLTVBlockingWithdraw: (user: ExtendedFormattedUser) => string[];
export declare const getAssetCollateralType: (userReserve: ComputedUserReserveData, userTotalCollateralUSD: string, userIsInIsolationMode: boolean, debtCeilingIsMaxed: boolean) => CollateralType;
