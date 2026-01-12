import type { StoryObj } from "@storybook/react";
import React from "react";
import { Select } from "./Select";
type Story = StoryObj<typeof Select>;
declare const _default: {
    component: <TKey extends string = string>({ label, placeholder, items, renderTrigger, ...props }: Omit<import("@radix-ui/react-select").SelectProps, "onValueChange"> & (({
        label?: string;
        renderTrigger?: never;
    } | {
        label?: never;
        renderTrigger: () => React.ReactNode;
    }) & {
        placeholder?: string;
        items: readonly import("./Select").SelectItem<TKey>[];
        onValueChange: (value: TKey) => void;
    })) => React.JSX.Element;
};
export default _default;
export declare const Default: Story;
