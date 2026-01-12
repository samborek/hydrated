import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useVirtualizer, } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { isNullish } from "remeda";
import { SList, SListItem, } from "@/components/VirtualizedList/VirtualizedList.styled";
import { useResponsiveValue } from "@/styles/media";
import { ScrollArea } from "../ScrollArea";
function VirtualizedList({ items, renderItem, overscan = 5, itemSize, maxVisibleItems, getItemKey, initialScrollIndex, ...props }) {
    const parentRef = useRef(null);
    const hasScrolledToInitial = useRef(false);
    const maxVisible = useResponsiveValue(maxVisibleItems, 0);
    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => itemSize,
        overscan,
        getItemKey: getItemKey || ((index) => index),
    });
    useEffect(() => {
        if (hasScrolledToInitial.current ||
            isNullish(initialScrollIndex) ||
            items.length === 0)
            return;
        const index = Math.max(0, Math.min(initialScrollIndex, items.length - 1));
        rowVirtualizer.scrollToIndex(index, {
            align: "start",
            behavior: "auto",
        });
        hasScrolledToInitial.current = true;
    }, [initialScrollIndex, items.length, rowVirtualizer]);
    const virtualItems = rowVirtualizer.getVirtualItems();
    return (_jsx(ScrollArea, { viewportRef: parentRef, ...props, height: maxVisible > 0
            ? getMaxHeight(items.length, itemSize, maxVisible)
            : props.height, children: _jsx(SList, { height: rowVirtualizer.getTotalSize(), children: virtualItems.map((virtualItem) => (_jsx(SListItem, { "data-virtual-index": virtualItem.index, size: virtualItem.size, start: virtualItem.start, children: renderItem(items[virtualItem.index], virtualItem) }, virtualItem.key))) }) }));
}
function getMaxHeight(itemCount, itemSize, maxVisibleItems) {
    const maxHeight = itemSize * maxVisibleItems;
    if (itemCount * itemSize <= maxHeight) {
        return "auto";
    }
    return maxHeight;
}
export { VirtualizedList };
