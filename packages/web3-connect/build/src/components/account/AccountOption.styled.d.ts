export declare const SAccountOption: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & {
    disabled?: boolean;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const SCopyButton: import("@emotion/styled").StyledComponent<{
    text: string;
    delay?: number;
    defaultIcon?: React.ComponentType;
    copiedIcon?: React.ComponentType;
    iconSize?: number;
    children?: (props: {
        copied: boolean;
    }) => React.ReactNode;
} & Omit<import("react").ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled" | "type" | "onClick"> & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SChangeAccountButton: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
    asChild?: boolean;
    as?: React.ElementType;
    css?: import("@emotion/serialize").Interpolation<unknown>;
    sx?: import("@theme-ui/css").ThemeUIStyleObject<import("@theme-ui/core").Theme>;
    children?: React.ReactNode;
    color?: import("@galacticcouncil/ui/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["color"];
    bg?: import("@galacticcouncil/ui/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["backgroundColor"];
    borderColor?: import("@galacticcouncil/ui/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["borderColor"];
} & Omit<import("react").HTMLAttributes<HTMLElement>, "color"> & {
    ref?: React.Ref<HTMLDivElement>;
} & import("@galacticcouncil/ui/components").SButtonProps & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.Ref<HTMLButtonElement>;
} & {
    theme?: import("@emotion/react").Theme;
} & {
    isActive?: boolean;
}, {}, {}>;
