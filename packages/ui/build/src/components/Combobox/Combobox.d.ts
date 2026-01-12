import { SelectItem } from "@/components/Select/Select";
type Props<TKey extends string> = {
    readonly items: ReadonlyArray<SelectItem<TKey>>;
    readonly selectedItems?: ReadonlyArray<TKey>;
    readonly label?: string;
    readonly placeholder?: string;
    readonly className?: string;
    readonly onSelectionChange: (values: ReadonlyArray<TKey>) => void;
};
export declare const Combobox: <TKey extends string>({ label, placeholder, items, selectedItems, className, onSelectionChange, }: Props<TKey>) => import("react").JSX.Element;
export {};
