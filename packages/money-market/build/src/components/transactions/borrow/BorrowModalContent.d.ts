import { TxModalWrapperRenderProps } from "@/components/transactions/TxModalWrapper";
export declare enum ErrorType {
    MAX_EXCEEDED = 0,
    STABLE_RATE_NOT_ENABLED = 1,
    NOT_ENOUGH_LIQUIDITY = 2,
    BORROWING_NOT_AVAILABLE = 3,
    NOT_ENOUGH_BORROWED = 4
}
export declare const BorrowModalContent: React.FC<TxModalWrapperRenderProps>;
