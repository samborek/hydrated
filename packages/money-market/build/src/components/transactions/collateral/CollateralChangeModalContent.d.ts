import { TxModalWrapperRenderProps } from "@/components/transactions/TxModalWrapper";
export type CollateralChangeModalContentProps = {
    underlyingAsset: string;
};
export declare enum ErrorType {
    DO_NOT_HAVE_SUPPLIES_IN_THIS_CURRENCY = 0,
    CAN_NOT_USE_THIS_CURRENCY_AS_COLLATERAL = 1,
    CAN_NOT_SWITCH_USAGE_AS_COLLATERAL_MODE = 2,
    ZERO_LTV_WITHDRAW_BLOCKED = 3
}
export declare const CollateralChangeModalContent: React.FC<TxModalWrapperRenderProps>;
