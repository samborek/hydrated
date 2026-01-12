import { Ref } from "react";
type SliderTabsOptionKey = string | number;
export type SliderTabsOption<TKey extends SliderTabsOptionKey> = {
    readonly id: TKey;
    readonly label: string;
    readonly icon?: React.ReactNode;
};
type SliderTabsProps<TKey extends SliderTabsOptionKey> = {
    readonly options: ReadonlyArray<SliderTabsOption<TKey>>;
    readonly selected?: NoInfer<TKey>;
    readonly onSelect: (option: SliderTabsOption<NoInfer<TKey>>) => void;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly ref?: Ref<HTMLDivElement>;
};
export declare const SliderTabs: <TKey extends SliderTabsOptionKey>({ options, selected, onSelect, disabled, className, ref, }: SliderTabsProps<TKey>) => import("react").JSX.Element;
export {};
