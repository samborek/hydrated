import type { StoryObj } from "@storybook/react";
import { Paper } from "./Paper";
type Story = StoryObj<typeof Paper>;
declare const _default: {
    component: import("react").FC<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
        variant?: "plain" | "bordered";
    } & {
        ref?: import("react").Ref<HTMLElement>;
    }>;
};
export default _default;
export declare const Default: Story;
export declare const Plain: Story;
