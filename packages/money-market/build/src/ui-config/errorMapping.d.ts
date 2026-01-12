import { ReactElement } from "react";
export declare enum TxAction {
    APPROVAL = 0,
    MAIN_ACTION = 1,
    GAS_ESTIMATION = 2
}
export type TxErrorType = {
    blocking: boolean;
    actionBlocked: boolean;
    rawError: Error;
    error: ReactElement | undefined;
    txAction: TxAction;
};
export declare const getErrorTextFromError: (error: Error, txAction: TxAction, blocking?: boolean) => TxErrorType;
export declare const errorMapping: Record<number, ReactElement>;
