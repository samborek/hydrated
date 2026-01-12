import { VirtualItem, VirtualizerOptions } from "@tanstack/react-virtual";
import { ResponsiveStyleValue } from "@theme-ui/css";
import { ScrollAreaProps } from "../ScrollArea";
type VirtualizerProps = Pick<VirtualizerOptions<HTMLDivElement, HTMLDivElement>, "overscan" | "getItemKey">;
type VirtualizedListProps<T> = VirtualizerProps & ScrollAreaProps & {
    itemSize: number;
    items: readonly T[];
    renderItem: (item: T, virtualItem: VirtualItem) => React.ReactNode;
    initialScrollIndex?: number;
    maxVisibleItems?: ResponsiveStyleValue<number>;
};
declare function VirtualizedList<T>({ items, renderItem, overscan, itemSize, maxVisibleItems, getItemKey, initialScrollIndex, ...props }: VirtualizedListProps<T>): import("react").JSX.Element;
export { VirtualizedList };
