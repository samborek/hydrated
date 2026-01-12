import { ColumnDef, ColumnPinningState, FilterFnOption, OnChangeFn, RowData, SortingState, Table as TableDef, VisibilityState } from "@tanstack/react-table";
import { ReactNode, Ref } from "react";
import { TableProps } from "@/components/Table";
import { UseDataTableOwnOptions } from "./DataTable.utils";
export type DataTableProps<TData extends RowData> = TableProps & UseDataTableOwnOptions & {
    pageSize?: number;
    pageNumber?: number;
    globalFilter?: string;
    initialSorting?: SortingState;
    sorting?: SortingState;
    manualSorting?: boolean;
    enableSortingRemoval?: boolean;
    data: TData[];
    emptyState?: ReactNode;
    columns: {
        [K in keyof Required<TData>]: ColumnDef<TData, TData[K]>;
    }[keyof TData][] | ColumnDef<TData>[];
    className?: string;
    columnPinning?: ColumnPinningState | undefined;
    columnVisibility?: VisibilityState;
    globalFilterFn?: FilterFnOption<TData>;
    multiExpandable?: boolean;
    rowCount?: number;
    isMultiSort?: boolean;
    getIsExpandable?: (item: TData) => boolean;
    getIsClickable?: (item: TData) => boolean;
    renderSubComponent?: (item: TData) => React.ReactElement;
    renderOverride?: (item: TData) => React.ReactElement | undefined;
    onRowClick?: (item: TData) => void;
    onSortingChange?: OnChangeFn<SortingState>;
    onPageClick?: (number: number) => void;
    getExternalLink?: (item: TData) => string | undefined;
    ref?: Ref<DataTableRef>;
};
export type DataTableRef = {
    readonly onPaginationReset: () => void;
};
type DataTablePaginationProps<T> = {
    table: TableDef<T>;
    onPageClick?: (number: number) => void;
};
export declare const DataTablePagination: <T>({ table, onPageClick, }: DataTablePaginationProps<T>) => import("react").JSX.Element;
type DataTableComponent = {
    <TData>(props: DataTableProps<TData> & {
        readonly ref?: Ref<DataTableRef>;
    }): React.JSX.Element;
};
declare const DataTableWithType: DataTableComponent;
export { DataTableWithType as DataTable };
