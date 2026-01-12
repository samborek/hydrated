import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { range } from "remeda";
import { Skeleton } from "@/components/Skeleton";
import { useBreakpoints } from "@/theme";
function isAccessorColumn(column) {
    return "accessorKey" in column;
}
export const useDataTable = ({ isLoading = false, paginated = false, expandable = false, skeletonRowCount = 10, ...options }) => {
    const { screen, gte } = useBreakpoints();
    const columnVisibility = useMemo(() => {
        if (!screen)
            return;
        return options.columns.reduce((prev, curr) => {
            const id = isAccessorColumn(curr)
                ? (curr.id ?? curr.accessorKey)
                : curr.id;
            if (!id)
                return prev;
            const visibilityKey = typeof id === "string" ? id.replace(".", "_") : id;
            const visibility = curr.meta?.visibility;
            const gteBp = curr.meta?.gteBp;
            if (visibility !== undefined) {
                return {
                    ...prev,
                    [visibilityKey]: Array.isArray(visibility)
                        ? visibility.includes(screen)
                        : visibility,
                };
            }
            else if (gteBp) {
                return {
                    ...prev,
                    [visibilityKey]: gte(gteBp),
                };
            }
            else {
                return {
                    ...prev,
                    [visibilityKey]: true,
                };
            }
        }, {});
    }, [options.columns, screen, gte]);
    const data = useMemo(() => (isLoading ? Array(skeletonRowCount).fill({}) : options.data), [isLoading, skeletonRowCount, options.data]);
    const columns = useMemo(() => isLoading
        ? options.columns.map((column) => ({
            ...column,
            enableSorting: false,
            cell: () => (_jsx(Skeleton, { sx: { width: "min(80px, 100%)" }, height: "1em" })),
        }))
        : options.columns, [isLoading, options.columns]);
    return useReactTable({
        ...options,
        state: {
            columnVisibility,
            ...options.state,
        },
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
        getExpandedRowModel: expandable ? getExpandedRowModel() : undefined,
        getRowCanExpand: () => !!expandable,
        getFilteredRowModel: typeof options.state?.globalFilter === "string"
            ? getFilteredRowModel()
            : undefined,
        meta: {
            isLoading,
        },
        autoResetPageIndex: false,
    });
};
const PAGINATION_DOTS = "...";
export function getPaginationRange(totalPages, currentPage) {
    const maxLength = 5;
    const pagination = [];
    pagination.push(1);
    if (totalPages <= maxLength) {
        pagination.push(...range(2, totalPages + 1));
        return pagination;
    }
    const innerMaxLength = maxLength - 2;
    const sideLength = Math.floor((innerMaxLength - 1) / 2);
    let startPage = currentPage - sideLength;
    let endPage = currentPage + sideLength;
    if (startPage <= 1) {
        startPage = 2;
        endPage = startPage + innerMaxLength - 1;
    }
    if (endPage >= totalPages) {
        endPage = totalPages - 1;
        startPage = endPage - innerMaxLength + 1;
    }
    if (startPage > 2) {
        pagination.push(PAGINATION_DOTS);
    }
    pagination.push(...range(startPage, endPage + 1));
    if (endPage < totalPages - 1) {
        pagination.push(PAGINATION_DOTS);
    }
    pagination.push(totalPages);
    return pagination;
}
export const usePriorityTableSort = (columnSortPriority, defaultSortState = []) => {
    const [sortState, setSortState] = useState(defaultSortState);
    const changeSort = useMemo(() => (updater) => {
        setSortState((prevState) => {
            const newState = typeof updater === "function" ? updater(prevState) : updater;
            // Sort the columns based on priority order
            const sortedState = [...newState].sort((a, b) => {
                const aPriority = columnSortPriority.indexOf(a.id);
                const bPriority = columnSortPriority.indexOf(b.id);
                // If both columns are in the priority list, sort by priority
                if (aPriority !== -1 && bPriority !== -1) {
                    return aPriority - bPriority;
                }
                // If only one column is in the priority list, it comes first
                if (aPriority !== -1)
                    return -1;
                if (bPriority !== -1)
                    return 1;
                // If neither is in the priority list, maintain stable order
                const aIndex = newState.indexOf(a);
                const bIndex = newState.indexOf(b);
                return aIndex - bIndex;
            });
            return sortedState;
        });
    }, [columnSortPriority]);
    return [sortState, changeSort];
};
