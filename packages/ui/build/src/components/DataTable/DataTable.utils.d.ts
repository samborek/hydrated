import { OnChangeFn, RowData, SortingState, TableOptions } from "@tanstack/table-core";
export type UseDataTableOwnOptions = {
    paginated?: boolean;
    expandable?: boolean | "single";
    isLoading?: boolean;
    skeletonRowCount?: number;
};
export type UseDataTableOptions<TData extends RowData> = Omit<TableOptions<TData>, "getCoreRowModel" | "getSortedRowModel"> & {
    getCoreRowModel?: TableOptions<TData>["getCoreRowModel"];
    getSortedRowModel?: TableOptions<TData>["getSortedRowModel"];
} & UseDataTableOwnOptions;
export declare const useDataTable: <TData extends RowData>({ isLoading, paginated, expandable, skeletonRowCount, ...options }: UseDataTableOptions<TData>) => import("@tanstack/table-core").Table<TData>;
export declare function getPaginationRange(totalPages: number, currentPage: number): Array<number | string>;
export declare const usePriorityTableSort: <TColumn extends string>(columnSortPriority: ReadonlyArray<TColumn>, defaultSortState?: SortingState) => readonly [SortingState, OnChangeFn<SortingState>];
