import React from "react";
import { TxModalWrapperRenderProps } from "@/components/transactions/TxModalWrapper";
export declare enum ErrorType {
    CAP_REACHED = 0
}
export declare const SupplyModalContent: React.MemoExoticComponent<({ underlyingAsset, poolReserve, userReserve, nativeBalance, tokenBalance, }: TxModalWrapperRenderProps) => React.JSX.Element>;
