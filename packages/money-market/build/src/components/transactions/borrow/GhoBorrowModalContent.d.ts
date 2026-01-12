import { TxModalWrapperRenderProps } from "@/components/transactions/TxModalWrapper";
export declare enum ErrorType {
    STABLE_RATE_NOT_ENABLED = 0,
    NOT_ENOUGH_LIQUIDITY = 1,
    BORROWING_NOT_AVAILABLE = 2,
    NOT_ENOUGH_BORROWED = 3
}
export declare const GhoBorrowModalContent: React.FC<TxModalWrapperRenderProps>;
