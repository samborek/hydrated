import { LogoSize } from "@/components/Logo";
import { AssetLogoDecoration } from "./AssetLogo";
export declare const LOGO_DIAMETER: {
    readonly "extra-small": 12;
    readonly small: 18;
    readonly medium: 24;
    readonly large: 36;
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
export declare const SAssetBadge: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "size" | "p" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderRadius" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py">> & {
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
