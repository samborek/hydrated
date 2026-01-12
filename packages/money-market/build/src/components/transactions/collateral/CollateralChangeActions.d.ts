import { ComputedReserveData } from "@/hooks/commonTypes";
export type CollateralChangeActionsProps = {
    poolReserve: ComputedReserveData;
    usageAsCollateral: boolean;
    blocked: boolean;
    symbol: string;
};
export declare const CollateralChangeActions: ({ poolReserve, usageAsCollateral, blocked, symbol, }: CollateralChangeActionsProps) => import("react").JSX.Element;
