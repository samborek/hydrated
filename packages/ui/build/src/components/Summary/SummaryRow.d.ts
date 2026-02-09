import { TextProps } from "@galacticcouncil/ui/components";
import { MouseEventHandler, ReactNode } from "react";
export type SummaryRowProps = {
    label: ReactNode;
    content: ReactNode;
    description?: string;
    tooltip?: ReactNode;
    className?: string;
    loading?: boolean;
    onClick?: MouseEventHandler;
};
export declare const SummaryRow: ({ label, content, description, tooltip, className, loading, onClick, }: SummaryRowProps) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react").JSX.Element | null | undefined;
export declare const SummaryRowValue: (props: TextProps) => import("react").JSX.Element;
export declare const SummaryRowLabel: (props: TextProps) => import("react").JSX.Element;
