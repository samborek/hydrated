import { StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
type Story = StoryObj<typeof Grid>;
declare const _default: {
    component: import("react").FC<{
        gap?: import("@theme-ui/css").ThemeUICSSProperties["gap"];
        columnGap?: import("@theme-ui/css").ThemeUICSSProperties["columnGap"];
        rowGap?: import("@theme-ui/css").ThemeUICSSProperties["rowGap"];
        repeat?: "fit" | "fill";
        justify?: import("@theme-ui/css").ThemeUICSSProperties["justifyContent"];
        justifyItems?: import("@theme-ui/css").ThemeUICSSProperties["justifyItems"];
        align?: import("@theme-ui/css").ThemeUICSSProperties["alignItems"];
        columns?: import("@theme-ui/css").ResponsiveStyleValue<string | number>;
        columnWidth?: import("@theme-ui/css").ResponsiveStyleValue<string | number>;
        columnTemplate?: import("@theme-ui/css").ThemeUICSSProperties["gridTemplateColumns"];
        rowTemplate?: import("@theme-ui/css").ThemeUICSSProperties["gridTemplateRows"];
    } & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "width" | "transform" | "size" | "m" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "visibility" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py">> & {
        asChild?: boolean;
        as?: React.ElementType;
        css?: import("@emotion/serialize").Interpolation<unknown>;
        sx?: import("@theme-ui/css").ThemeUIStyleObject<import("@theme-ui/core").Theme>;
        children?: React.ReactNode;
        color?: import("../../theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["color"];
        bg?: import("../../theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["backgroundColor"];
        borderColor?: import("../../theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["borderColor"];
    } & Omit<import("react").HTMLAttributes<HTMLElement>, "color"> & {
        ref?: React.Ref<HTMLDivElement>;
    } & {
        ref?: import("react").Ref<HTMLElement>;
    }>;
};
export default _default;
export declare const Default: Story;
export declare const ColumnCount: Story;
export declare const ColumnTemplate: Story;
export declare const RowTemplate: Story;
export declare const ColumnFitWidth: Story;
export declare const ColumnFillWidth: Story;
export declare const Responsive: Story;
