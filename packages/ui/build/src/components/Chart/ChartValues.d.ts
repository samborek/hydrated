import { ReactNode } from "react";
import { FlexProps } from "@/components";
export type ChartValuesProps = {
    value?: ReactNode;
    displayValue?: ReactNode;
    isLoading?: boolean;
} & FlexProps;
export declare const ChartValues: React.FC<ChartValuesProps>;
