import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { flexRender, } from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Fragment, useEffect, useImperativeHandle, useMemo, useState, } from "react";
import { Button } from "@/components/Button";
import { CollapsibleContent, CollapsibleRoot } from "@/components/Collapsible";
import { SCollapsible, SPagination, } from "@/components/DataTable/DataTable.styled";
import { ExternalLink } from "@/components/ExternalLink";
import { Flex } from "@/components/Flex";
import { Icon } from "@/components/Icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableRowOverride, } from "@/components/Table";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
import { getPaginationRange, useDataTable, } from "./DataTable.utils";
const DataTable = ({ data, columns, className, size = "medium", fixedLayout = false, paginated = false, expandable = false, pageSize = 20, pageNumber = 1, borderless, isLoading, skeletonRowCount, globalFilter, initialSorting, sorting, manualSorting, enableSortingRemoval, globalFilterFn, emptyState, columnPinning, columnVisibility, rowCount, isMultiSort, getIsExpandable, getIsClickable, renderSubComponent, renderOverride, onRowClick, onSortingChange, onPageClick, getExternalLink, ref, }) => {
    const tableProps = {
        fixedLayout,
        size,
        borderless,
    };
    const isControlledSorting = sorting !== undefined && onSortingChange !== undefined;
    const table = useDataTable({
        data,
        columns,
        isLoading,
        paginated,
        expandable,
        skeletonRowCount,
        manualSorting,
        enableSortingRemoval,
        globalFilterFn: globalFilterFn ?? "auto",
        ...(isMultiSort && { isMultiSortEvent: () => true }),
        ...(rowCount !== undefined && {
            rowCount,
            manualPagination: true,
        }),
        initialState: {
            pagination: {
                pageIndex: pageNumber - 1,
                pageSize,
            },
            sorting: initialSorting,
        },
        state: {
            globalFilter,
            columnPinning: columnPinning ?? {},
            // need this prevent disabling native sorting, cause undefined value disable it
            ...(isControlledSorting && {
                sorting,
            }),
            ...(columnVisibility && {
                columnVisibility,
            }),
        },
        ...(isControlledSorting && {
            onSortingChange,
        }),
    });
    useImperativeHandle(ref, () => ({
        onPaginationReset: () => table.resetPagination(),
    }));
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { ...tableProps, className: className, children: [_jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { children: headerGroup.headers.map((header) => {
                                const { meta } = header.getContext().column.columnDef;
                                const isPinned = header.getContext().column.getIsPinned();
                                const size = header.getSize();
                                return (_jsx(TableHead, { canSort: header.column.getCanSort(), sortDirection: header.column.getIsSorted(), onSort: header.column.getToggleSortingHandler(), className: meta?.className, sx: {
                                        ...meta?.sx,
                                        width: size !== 150 ? `${size}px` : "auto",
                                    }, isPinned: isPinned, children: header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext()) }, header.id));
                            }) }, headerGroup.id))) }), _jsx(TableBody, { children: table.getRowModel().rows?.length || isLoading ? (table.getRowModel().rows.map((row) => {
                            const override = isLoading
                                ? renderOverride?.(row.original)
                                : undefined;
                            const isRowClickable = !isLoading && (getIsClickable?.(row.original) ?? !!onRowClick);
                            const isRowExpanded = row.getIsExpanded();
                            const isRowExpandable = isRowExpanded ||
                                (!isLoading &&
                                    !!expandable &&
                                    !override &&
                                    (getIsExpandable?.(row.original) ?? true));
                            return (_jsxs(Fragment, { children: [_jsx(DataTableExternalLink, { sx: {
                                            display: "contents",
                                            textDecoration: "none",
                                            color: "inherit",
                                            "& td": {
                                                verticalAlign: "middle",
                                            },
                                        }, href: getExternalLink?.(row.original), children: _jsxs(TableRow, { "data-expanded": isRowExpanded, "data-selected": row.getIsSelected(), onClick: () => {
                                                if (isRowExpandable) {
                                                    if (expandable === "single" && !isRowExpanded) {
                                                        table.resetExpanded();
                                                    }
                                                    row.toggleExpanded();
                                                }
                                                onRowClick?.(row.original);
                                            }, isExpandable: isRowExpandable, hasOverride: !!override, isClickable: isRowClickable, children: [row.getVisibleCells().map((cell) => {
                                                    const { meta } = cell.getContext().cell.column.columnDef;
                                                    const { className, sx, sxFn } = meta ?? {};
                                                    const isPinned = cell
                                                        .getContext()
                                                        .cell.column.getIsPinned();
                                                    return (_jsx(TableCell, { className: className, sx: sxFn ? sxFn(cell.getContext().row.original) : sx, isPinned: isPinned, "data-pinned": isPinned, isClickable: isRowClickable, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                                }), isRowExpandable && (_jsx(TableCell, { children: _jsx(Flex, { justify: "end", align: "center", children: _jsx(Icon, { size: 18, color: getToken("icons.onSurface"), component: isRowExpanded ? ChevronUp : ChevronDown }) }) }))] }) }), override && (_jsx(TableRowOverride, { colSpan: table.getVisibleLeafColumns().length + 1, children: override })), isRowExpandable && renderSubComponent && (_jsx(DataTableCollapsibleRow, { colSpan: table.getVisibleLeafColumns().length + 1, isExpanded: isRowExpanded, children: renderSubComponent(row.original) }))] }, row.id));
                        })) : (_jsx(TableRow, { isEmptyState: true, children: _jsx(TableCell, { colSpan: columns.length, children: emptyState ?? "No results." }) })) })] }), !isLoading && paginated && table.getPageCount() > 1 && (_jsx(DataTablePagination, { table: table, onPageClick: onPageClick }))] }));
};
export const DataTablePagination = ({ table, onPageClick, }) => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pagination = useMemo(() => getPaginationRange(totalPages, currentPage), [currentPage, totalPages]);
    const onPageClickHandler = (number) => {
        table.setPageIndex(number - 1);
        onPageClick?.(number);
    };
    return (_jsxs(SPagination, { children: [_jsxs(Button, { size: "small", variant: "tertiary", outline: true, disabled: !table.getCanPreviousPage(), onClick: () => table.previousPage(), sx: { px: 10 }, children: [_jsx(Icon, { size: 16, component: ChevronLeft, display: ["block", "none"] }), _jsx(Text, { as: "span", display: ["none", "inline"], children: "Prev" })] }), pagination.map((pageNumber, index) => typeof pageNumber === "string" ? (_jsx(Text, { width: 32, fs: 16, color: getToken("text.low"), sx: { textAlign: "center" }, children: "\u2026" }, `${index}-dots`)) : (_jsx(Button, { size: "small", variant: pageNumber === currentPage ? "secondary" : "tertiary", outline: pageNumber !== currentPage, onClick: () => onPageClickHandler(pageNumber), sx: { px: 10, minWidth: 28 }, children: pageNumber }, `${index}-page`))), _jsxs(Button, { size: "small", variant: "tertiary", outline: true, disabled: !table.getCanNextPage(), onClick: () => table.nextPage(), sx: { px: 10 }, children: [_jsx(Text, { as: "span", display: ["none", "inline"], children: "Next" }), _jsx(Icon, { size: 16, component: ChevronRight, display: ["block", "none"] })] })] }));
};
const DataTableWithType = DataTable;
export { DataTableWithType as DataTable };
const DataTableExternalLink = ({ href, ...props }) => {
    return href ? _jsx(ExternalLink, { href: href, ...props }) : props.children;
};
const DataTableCollapsibleRow = ({ colSpan, isExpanded, children, }) => {
    const [isVisible, setIsVisible] = useState(isExpanded);
    useEffect(() => {
        if (isExpanded) {
            setIsVisible(true);
        }
    }, [isExpanded]);
    const handleAnimationEnd = () => {
        if (!isExpanded) {
            setIsVisible(false);
        }
    };
    return (_jsx(TableRow, { sx: { display: isVisible ? "table-row" : "none" }, children: _jsx(TableCell, { colSpan: colSpan, sx: { p: "0!important" }, children: _jsx(CollapsibleRoot, { open: isExpanded, children: _jsx(CollapsibleContent, { onAnimationEnd: handleAnimationEnd, children: _jsx(SCollapsible, { children: children }) }) }) }) }));
};
