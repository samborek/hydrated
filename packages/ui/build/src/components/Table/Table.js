import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { CaretDown, ChevronRight } from "@/assets/icons";
export { Table, TableBody, TableCell, TableContainer, TableHeader, TableRow, TableRowOverride, } from "./Table.styled";
import { Button, ButtonTransparent } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { getToken } from "@/utils";
import { SExpandedTableRowHorizontalSeparator, TableHead as TableHeadPrimitive, TableHeadSortIndicator, } from "./Table.styled";
export const TableHead = ({ canSort = false, sortDirection = false, onSort, children, ...props }) => {
    const ascColor = sortDirection === "asc" ? getToken("text.medium") : getToken("text.low");
    const descColor = sortDirection === "desc" ? getToken("text.medium") : getToken("text.low");
    return (_jsxs(TableHeadPrimitive, { ...props, canSort: canSort, isSorting: !!sortDirection, onClick: onSort, children: [children, canSort && (_jsxs(TableHeadSortIndicator, { children: [_jsx(CaretDown, { sx: {
                            color: descColor,
                            opacity: sortDirection === "asc" ? 0.25 : 1,
                        } }), _jsx(CaretDown, { sx: {
                            color: ascColor,
                            opacity: sortDirection === "desc" ? 0.25 : 1,
                        } })] }))] }));
};
export const ExpandedTableRowHorizontalSeparator = (props) => {
    return (_jsx(SExpandedTableRowHorizontalSeparator, { orientation: "horizontal", ...props }));
};
export const TableRowAction = ({ children, onClick, ...props }) => {
    return (_jsx(Button, { variant: "tertiary", outline: true, onClick: (e) => {
            e.stopPropagation();
            onClick?.(e);
        }, ...props, children: children }));
};
export const TableRowDetailsExpand = ({ children, sx, onClick, ...props }) => {
    return (_jsxs(Flex, { gap: 8, align: "center", justify: "flex-end", sx: { overflow: "hidden" }, children: [children, _jsx(ButtonTransparent, { sx: { flexShrink: 0, size: 16, ...sx }, onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick?.(e);
                }, ...props, children: _jsx(ChevronRight, { size: 16 }) })] }));
};
