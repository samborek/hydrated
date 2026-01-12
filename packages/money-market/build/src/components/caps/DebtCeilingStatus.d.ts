import { AssetCapHookData } from "@/hooks";
type DebtCeilingTooltipProps = {
    debt: string;
    ceiling: string;
    usageData: AssetCapHookData;
    className?: string;
};
export declare const DebtCeilingStatus: ({ debt, ceiling, usageData, className, }: DebtCeilingTooltipProps) => import("react").JSX.Element;
export {};
