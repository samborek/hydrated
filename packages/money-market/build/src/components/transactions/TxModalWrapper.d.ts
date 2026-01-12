import { PERMISSION } from "@aave/contract-helpers";
import React from "react";
import { ComputedReserveData, ComputedUserReserveData } from "@/hooks/commonTypes";
export type TxModalWrapperRenderProps = {
    underlyingAsset: string;
    poolReserve: ComputedReserveData;
    userReserve: ComputedUserReserveData;
    symbol: string;
    tokenBalance: string;
    nativeBalance: string;
    action?: string;
};
export type TxModalWrapperProps = {
    underlyingAsset: string;
    requiredChainId?: number;
    requiredPermission?: PERMISSION;
    children: (props: TxModalWrapperRenderProps) => React.ReactNode;
    action?: string;
};
export declare const TxModalWrapper: React.FC<TxModalWrapperProps>;
