import { ReactNode } from "react";
import { type FlexProps } from "../Flex";
export type ChartValuesProps = {
    value?: ReactNode;
    displayValue?: ReactNode;
    isLoading?: boolean;
} & FlexProps;
export declare const ChartValues: React.FC<ChartValuesProps>;
