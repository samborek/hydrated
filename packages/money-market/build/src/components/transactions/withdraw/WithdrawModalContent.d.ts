import { TxModalWrapperRenderProps } from "@/components/transactions/TxModalWrapper";
export declare enum ErrorType {
    CAN_NOT_WITHDRAW_THIS_AMOUNT = 0,
    POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY = 1,
    ZERO_LTV_WITHDRAW_BLOCKED = 2
}
export declare const WithdrawModalContent: React.FC<TxModalWrapperRenderProps>;
