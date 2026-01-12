import { ReactNode } from "react";
type AssetLabelSize = "large" | "medium";
export type AssetLabelProps = {
    name?: string;
    symbol: string;
    size?: AssetLabelSize;
    loading?: boolean;
    badge?: ReactNode;
};
export declare const AssetLabel: ({ name, symbol, size, loading, badge, }: AssetLabelProps) => import("react").JSX.Element;
export {};
