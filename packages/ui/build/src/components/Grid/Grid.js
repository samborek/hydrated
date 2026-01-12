import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@/components/Box";
import { px } from "@/utils";
const singleWidthToColumns = (width, repeat) => (width ? `repeat(auto-${repeat}, minmax(${px(width)}, 1fr))` : null);
const widthToColumns = (width, repeat) => Array.isArray(width)
    ? width.map((w) => singleWidthToColumns(w, repeat))
    : singleWidthToColumns(width, repeat);
const singleCountToColumns = (n) => n ? (typeof n === "number" ? `repeat(${n}, 1fr)` : n) : null;
const countToColumns = (n) => Array.isArray(n) ? n.map(singleCountToColumns) : singleCountToColumns(n);
export const Grid = ({ columns, columnWidth, columnTemplate = "auto", rowTemplate = "auto", gap = 0, columnGap = 0, rowGap = 0, repeat = "fit", justify, justifyItems, align, sx, ref, ...props }) => {
    const gridTemplateColumns = columnWidth
        ? widthToColumns(columnWidth, repeat)
        : columns
            ? countToColumns(columns)
            : columnTemplate;
    const gapProps = gap ? { gap } : { columnGap, rowGap };
    return (_jsx(Box, { ref: ref, display: "grid", sx: {
            gridTemplateColumns,
            gridTemplateRows: rowTemplate,
            justify,
            justifyItems,
            alignItems: align,
            ...gapProps,
            ...sx,
        }, ...props }));
};
