import { StoryObj } from "@storybook/react";
import { Flex } from "./Flex";
type Story = StoryObj<typeof Flex>;
declare const _default: {
    component: import("react").FC<import("./Flex").FlexOwnProps & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "width" | "transform" | "size" | "m" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "visibility" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py">> & {
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
export declare const JustifyBetween: Story;
export declare const JustifyAround: Story;
export declare const JustifyFlexEnd: Story;
export declare const AlignStart: Story;
export declare const AlignCenter: Story;
export declare const AlignEnd: Story;
export declare const DirectionColumn: Story;
export declare const Responsive: Story;
