import { AssetCapData } from "@/hooks/commonTypes";
type DebtCeilingWarningProps = {
    debtCeiling: AssetCapData;
    className?: string;
};
export declare const DebtCeilingWarning: ({ debtCeiling, className, }: DebtCeilingWarningProps) => import("react").JSX.Element | null;
export {};
