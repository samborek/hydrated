import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
export type ToggleGroupSize = "small" | "medium" | "large";
export type ToggleGroupProps = {
    size?: ToggleGroupSize;
};
export declare const SToggleGroup: import("@emotion/styled").StyledComponent<(((ToggleGroupPrimitive.ToggleGroupSingleProps | ToggleGroupPrimitive.ToggleGroupMultipleProps) & import("react").RefAttributes<HTMLDivElement>) & {
    theme?: import("@emotion/react").Theme;
}) & ToggleGroupProps, {}, {}>;
export declare const SToggleGroupItem: import("@emotion/styled").StyledComponent<ToggleGroupPrimitive.ToggleGroupItemProps & import("react").RefAttributes<HTMLButtonElement> & {
    theme?: import("@emotion/react").Theme;
} & {
    size?: ToggleGroupSize;
}, {}, {}>;
