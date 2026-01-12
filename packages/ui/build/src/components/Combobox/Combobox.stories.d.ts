import { StoryFn } from "@storybook/react";
declare const _default: {
    component: <TKey extends string>({ label, placeholder, items, selectedItems, className, onSelectionChange, }: {
        readonly items: readonly import("..").SelectItem<TKey>[];
        readonly selectedItems?: readonly TKey[] | undefined;
        readonly label?: string;
        readonly placeholder?: string;
        readonly className?: string;
        readonly onSelectionChange: (values: readonly TKey[]) => void;
    }) => import("react").JSX.Element;
};
export default _default;
export declare const ComboboxStory: StoryFn;
