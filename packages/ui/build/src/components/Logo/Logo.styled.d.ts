import { LogoSize } from "./Logo";
export declare const LOGO_SIZES: {
    readonly "extra-small": 0.75;
    readonly small: 1.125;
    readonly medium: 1.5;
    readonly large: 2.25;
};
export declare const SLogo: import("@emotion/styled").StyledComponent<Omit<import("react").ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
    lazy?: boolean;
    placeholder?: React.ReactNode;
} & {
    theme?: import("@emotion/react").Theme;
} & {
    size: LogoSize;
}, {}, {}>;
export declare const SLogoPlaceholder: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "px" | "transform" | "size" | "m" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "py">> & {
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
    component: React.ComponentType;
} & {
    theme?: import("@emotion/react").Theme;
} & {
    size: LogoSize;
}, {}, {}>;
