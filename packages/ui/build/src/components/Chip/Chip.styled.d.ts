export type ChipVariant = "primary" | "secondary" | "tertiary" | "info" | "success" | "warning" | "danger" | "green" | "accent";
export type ChipSize = "small" | "medium" | "large";
export type SChipProps = {
    variant?: ChipVariant;
    size?: ChipSize;
    rounded?: boolean;
};
export declare const SChip: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "size" | "p" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderRadius" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py">> & {
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
    theme?: import("@emotion/react").Theme;
} & SChipProps, {}, {}>;
