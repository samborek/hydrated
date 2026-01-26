import { LogoSize } from "@/components/Logo";
import { AssetLogoDecoration } from "./AssetLogo";
export declare const LOGO_DIAMETER: {
    readonly "extra-small": 0.75;
    readonly small: 1.125;
    readonly medium: 1.5;
    readonly large: 2.25;
};
export declare const SAssetLogo: import("@emotion/styled").StyledComponent<Omit<import("react").ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
    lazy?: boolean;
    placeholder?: React.ReactNode;
} & {
    size?: LogoSize;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SAssetChainLogo: import("@emotion/styled").StyledComponent<Omit<import("react").ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
    lazy?: boolean;
    placeholder?: React.ReactNode;
} & {
    theme?: import("@emotion/react").Theme;
} & {
    size: LogoSize;
}, {}, {}>;
export declare const SAssetBadge: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
    asChild?: boolean;
    as?: React.ElementType;
    css?: import("@emotion/serialize").Interpolation<unknown>;
    sx?: import("@theme-ui/css").ThemeUIStyleObject<import("@theme-ui/core").Theme>;
    children?: React.ReactNode;
    color?: import("@/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["color"];
    bg?: import("@/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["backgroundColor"];
    borderColor?: import("@/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["borderColor"];
} & Omit<import("react").HTMLAttributes<HTMLElement>, "color"> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    component: React.ComponentType;
} & {
    theme?: import("@emotion/react").Theme;
} & {
    type: "red" | "yellow";
}, {}, {}>;
export declare const SBadgeSlot: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const SDecorationContainer: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & {
    size: LogoSize;
    count: number;
    decoration?: AssetLogoDecoration;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
