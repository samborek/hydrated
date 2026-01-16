import { ResponsiveStyleValue } from "@theme-ui/css";
import { FC, ReactNode } from "react";
import { ValueStatsFont, ValueStatsSize } from "@/components/ValueStats/ValueStats.styled";
export declare const ValueStatsLabel: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const ValueStatsValue: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & {
    readonly size?: ValueStatsSize;
    readonly font?: ValueStatsFont;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const ValueStatsBottomValue: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
type ValueStatsProps = React.HTMLAttributes<HTMLDivElement> & {
    readonly font?: ValueStatsFont;
    readonly wrap?: ResponsiveStyleValue<boolean>;
    readonly size?: ValueStatsSize;
    readonly label?: string;
    readonly customLabel?: ReactNode;
    readonly value?: string;
    readonly customValue?: ReactNode;
    readonly bottomLabel?: string;
    readonly customBottomLabel?: ReactNode;
    readonly isLoading?: boolean;
    readonly className?: string;
};
export declare const ValueStats: FC<ValueStatsProps>;
export {};
