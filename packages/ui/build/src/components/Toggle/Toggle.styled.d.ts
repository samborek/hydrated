import { SwitchProps } from "@radix-ui/react-switch";
type ToggleSize = "medium" | "large";
export type ToggleProps = SwitchProps & {
    size?: ToggleSize;
    onCheckedChange: (v: boolean) => void;
};
export declare const SToggle: import("@emotion/styled").StyledComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    size: ToggleSize;
    withLabel?: boolean;
}, {}, {}>;
export declare const SThumb: import("@emotion/styled").StyledComponent<import("@radix-ui/react-switch").SwitchThumbProps & import("react").RefAttributes<HTMLSpanElement> & {
    theme?: import("@emotion/react").Theme;
} & Partial<ToggleProps>, {}, {}>;
export {};
