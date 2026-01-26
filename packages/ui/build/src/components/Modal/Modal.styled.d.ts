export declare const SModalOverlay: import("@emotion/styled").StyledComponent<import("@radix-ui/react-dialog").DialogOverlayProps & import("react").RefAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    $animationDurationMs?: number;
}, {}, {}>;
export declare const SModalWrapper: import("@emotion/styled").StyledComponent<import("@radix-ui/react-dialog").DialogOverlayProps & import("react").RefAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    $animationDurationMs?: number;
}, {}, {}>;
export declare const SModalContent: import("@emotion/styled").StyledComponent<import("@radix-ui/react-dialog").DialogContentProps & import("react").RefAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    $hasTopContent?: boolean;
}, {}, {}>;
export declare const SModalPaper: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    variant?: "plain" | "bordered";
} & {
    ref?: import("react").Ref<HTMLElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalHeader: import("@emotion/styled").StyledComponent<import("@/components/Flex").FlexOwnProps & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    ref?: import("react").Ref<HTMLElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalHeaderButton: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
} & import("@/components/Button").SButtonProps & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: React.Ref<HTMLButtonElement>;
} & {
    theme?: import("@emotion/react").Theme;
} & {
    align?: "left" | "right";
}, {}, {}>;
export declare const SModalTitleContainer: import("@emotion/styled").StyledComponent<import("@/components/Flex").FlexOwnProps & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    ref?: import("react").Ref<HTMLElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalBody: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    theme?: import("@emotion/react").Theme;
} & {
    noPadding?: boolean;
}, {}, {}>;
export declare const SModalFooter: import("@emotion/styled").StyledComponent<import("@/components/Flex").FlexOwnProps & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    ref?: import("react").Ref<HTMLElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalTitle: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    fw?: import("@theme-ui/css").ResponsiveStyleValue<400 | 500 | 600 | 700>;
    lh?: import("@theme-ui/css").ResponsiveStyleValue<number | string>;
    fs?: import("@/components/Text").TextSize | import("@theme-ui/css").ResponsiveStyleValue<number>;
    font?: import("@/theme").ThemeFont;
    align?: import("@theme-ui/css").ThemeUICSSProperties["textAlign"];
    transform?: import("@theme-ui/css").ThemeUICSSProperties["textTransform"];
    decoration?: import("@theme-ui/css").ThemeUICSSProperties["textDecoration"];
    whiteSpace?: import("@theme-ui/css").ThemeUICSSProperties["whiteSpace"];
    wordBreak?: import("@theme-ui/css").ThemeUICSSProperties["wordBreak"];
    truncate?: true | import("@theme-ui/css").ResponsiveStyleValue<number | string>;
    ref?: import("react").Ref<HTMLParagraphElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalDescription: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    fw?: import("@theme-ui/css").ResponsiveStyleValue<400 | 500 | 600 | 700>;
    lh?: import("@theme-ui/css").ResponsiveStyleValue<number | string>;
    fs?: import("@/components/Text").TextSize | import("@theme-ui/css").ResponsiveStyleValue<number>;
    font?: import("@/theme").ThemeFont;
    align?: import("@theme-ui/css").ThemeUICSSProperties["textAlign"];
    transform?: import("@theme-ui/css").ThemeUICSSProperties["textTransform"];
    decoration?: import("@theme-ui/css").ThemeUICSSProperties["textDecoration"];
    whiteSpace?: import("@theme-ui/css").ThemeUICSSProperties["whiteSpace"];
    wordBreak?: import("@theme-ui/css").ThemeUICSSProperties["wordBreak"];
    truncate?: true | import("@theme-ui/css").ResponsiveStyleValue<number | string>;
    ref?: import("react").Ref<HTMLParagraphElement>;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalContentDivider: import("@emotion/styled").StyledComponent<Omit<Omit<import("@radix-ui/react-separator").SeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "orientation"> & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    size?: number;
    orientation?: import("@theme-ui/css").ResponsiveStyleValue<"horizontal" | "vertical">;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SModalTopContent: import("@emotion/styled").StyledComponent<Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "p" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "transform" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "size">> & {
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
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
