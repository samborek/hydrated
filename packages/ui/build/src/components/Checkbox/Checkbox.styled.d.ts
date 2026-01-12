import { CheckboxProps } from "@radix-ui/react-checkbox";
export type CheckboxSize = "small" | "medium" | "large";
export type TCheckbox = CheckboxProps & {
    size?: CheckboxSize;
    ref?: React.Ref<HTMLButtonElement>;
};
export declare const SRoot: import("@emotion/styled").StyledComponent<CheckboxProps & import("react").RefAttributes<HTMLButtonElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    size: CheckboxSize;
}, {}, {}>;
export declare const SIndicator: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
