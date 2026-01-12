export interface SupplyActionProps {
    amountToSupply: string;
    customGasPrice?: string;
    poolAddress: string;
    symbol: string;
    blocked: boolean;
    decimals: number;
    isWrappedBaseAsset: boolean;
    className?: string;
}
export declare const SupplyActions: import("react").MemoExoticComponent<({ amountToSupply, poolAddress, symbol, blocked, decimals, className, }: SupplyActionProps) => import("react").JSX.Element>;
