import * as React from "react";
import { SToggleGroupItem, ToggleGroupProps, ToggleGroupSize } from "./ToggleGroup.styled";
type ToggleGroupCommonProps = ToggleGroupProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir' | 'defaultValue' | 'value'> & {
    children: React.ReactNode;
    disabled?: boolean;
};
export type ToggleGroupSingleProps<T extends string> = ToggleGroupCommonProps & {
    type: "single";
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void;
};
export type ToggleGroupMultipleProps<T> = ToggleGroupCommonProps & {
    type: "multiple";
    value?: T[];
    defaultValue?: T[];
    onValueChange?: (value: T[]) => void;
};
export type ToggleGroupRootProps<T extends string> = ToggleGroupSingleProps<T> | ToggleGroupMultipleProps<T>;
declare function ToggleGroup<T extends string>({ size, children, ...props }: ToggleGroupRootProps<T>): React.JSX.Element;
type ToggleGroupItemProps = React.ComponentProps<typeof SToggleGroupItem> & {
    size?: ToggleGroupSize;
};
declare function ToggleGroupItem({ children, size, ...props }: ToggleGroupItemProps): React.JSX.Element;
export { ToggleGroup, ToggleGroupItem };
