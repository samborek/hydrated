import { StackProps } from "@galacticcouncil/ui/components";
import { ReactNode } from "react";
import { SummaryRowProps } from "./SummaryRow";
type ContentProps = {
    readonly rows: ReadonlyArray<SummaryRowProps>;
    readonly children?: never;
} | {
    readonly children: ReactNode;
    readonly rows?: never;
};
type SummaryProps = Omit<StackProps, "children"> & ContentProps;
export declare const Summary: ({ rows, children, separated, ...props }: SummaryProps) => import("react").JSX.Element;
export {};
