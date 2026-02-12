import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ComponentProps, FC } from "react";
type DropdownMenuAnimation = "slide-bottom" | "slide-top" | "scale-bottom" | "scale-top";
export declare const DropdownMenu: FC<DropdownMenuPrimitive.DropdownMenuProps>;
export declare const DropdownMenuTrigger: import("@emotion/styled").StyledComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & import("react").RefAttributes<HTMLButtonElement> & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
declare const SDropdownMenuContent: import("@emotion/styled").StyledComponent<DropdownMenuPrimitive.DropdownMenuContentProps & import("react").RefAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    readonly fullWidth?: boolean;
    readonly animation?: DropdownMenuAnimation;
}, {}, {}>;
export declare const DropdownMenuContent: FC<ComponentProps<typeof SDropdownMenuContent> & {
    animation?: DropdownMenuAnimation;
}>;
export declare const DropdownMenuItem: import("@emotion/styled").StyledComponent<DropdownMenuPrimitive.DropdownMenuItemProps & import("react").RefAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const DropdownMenuContentDivider: import("@emotion/styled").StyledComponent<Omit<Omit<import("@radix-ui/react-separator").SeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "orientation"> & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "transform" | "size" | "m" | "borderRadius" | "width" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "visibility" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py">> & {
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
    size?: number;
    orientation?: import("@theme-ui/css").ResponsiveStyleValue<"horizontal" | "vertical">;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export {};
