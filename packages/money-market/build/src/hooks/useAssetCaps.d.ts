import { ReactNode } from "react";
import { AssetCapData, ComputedReserveData } from "@/hooks/commonTypes";
type WarningDisplayProps = {
    supplyCap?: AssetCapData;
    borrowCap?: AssetCapData;
    debtCeiling?: AssetCapData;
    icon?: boolean;
};
export type AssetCapHookData = AssetCapData & {
    determineWarningDisplay: (props: WarningDisplayProps) => React.JSX.Element | null;
    displayMaxedTooltip: (props: WarningDisplayProps) => React.JSX.Element | null;
};
export type AssetCapUsageData = {
    reserve: ComputedReserveData;
    supplyCap: AssetCapHookData;
    borrowCap: AssetCapHookData;
    debtCeiling: AssetCapHookData;
};
export declare const getAssetCapData: (asset: ComputedReserveData) => AssetCapUsageData;
export declare const useAssetCap: (asset: ComputedReserveData) => AssetCapUsageData;
export declare const AssetCapsProvider: ({ children, asset, }: {
    children: ReactNode;
    asset: ComputedReserveData;
}) => React.JSX.Element | null;
export declare const useAssetCaps: () => AssetCapUsageData;
/**
 * Calculates supply cap usage and % of totalLiquidity / supplyCap.
 * @param asset ComputedReserveData
 * @returns { supplyCapUsage: number, supplyCapReached: boolean }
 */
export declare const getSupplyCapData: (asset: ComputedReserveData) => {
    supplyCapUsage: number;
    supplyCapReached: boolean;
};
/**
 * Calculates borrow cap usage and % of totalDebt / borrowCap.
 * @param asset ComputedReserveData
 * @returns { borrowCapUsage: number, borrowCapReached: boolean }
 */
export declare const getBorrowCapData: (asset: ComputedReserveData) => {
    borrowCapUsage: number;
    borrowCapReached: boolean;
};
/**
 * Calculates debt ceiling usage and % of isolationModeTotalDebt / debtCeiling.
 * @param asset
 * @returns {debtCeilingUsage: number, debtCeilingReached: boolean}
 */
export declare const getDebtCeilingData: (asset: ComputedReserveData) => {
    debtCeilingUsage: number;
    debtCeilingReached: boolean;
};
export {};
