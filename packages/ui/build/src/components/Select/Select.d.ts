import { SelectProps } from "@radix-ui/react-select";
import { ReactNode } from "react";
export type SelectItem<TKey extends string> = {
    key: TKey;
    label: string;
};
type RenderProps = {
    label?: string;
    renderTrigger?: never;
} | {
    label?: never;
    renderTrigger: () => ReactNode;
};
type SelectPropsCustom<TKey extends string> = Omit<SelectProps, "onValueChange"> & RenderProps & {
    placeholder?: string;
    items: ReadonlyArray<SelectItem<TKey>>;
    onValueChange: (value: TKey) => void;
};
export declare const Select: <TKey extends string = string>({ label, placeholder, items, renderTrigger, ...props }: SelectPropsCustom<TKey>) => import("react").JSX.Element;
type SelectLabelProps = {
    readonly children: React.ReactNode;
};
export declare const SelectLabel: ({ children }: SelectLabelProps) => import("react").JSX.Element;
export declare const SelectCaret: () => import("react").JSX.Element;
export {};
