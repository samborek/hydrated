export declare const SAssetButton: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & {
    isError: boolean;
}, import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {}>;
export declare const SAssetButtonEmpty: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "width" | "transform" | "size" | "m" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "visibility" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py">> & {
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
} & import("..").SButtonProps & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.Ref<HTMLButtonElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SAssetInput: import("@emotion/styled").StyledComponent<import("..").InputProps & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
