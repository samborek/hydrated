import { SortDirection } from "@tanstack/react-table";
export type { TableProps, TableSize } from "./Table.styled";
export { Table, TableBody, TableCell, TableContainer, TableHeader, TableRow, TableRowOverride, } from "./Table.styled";
import { ComponentProps, FC } from "react";
import { Button } from "@/components/Button";
import { SExpandedTableRowHorizontalSeparator, TableHead as TableHeadPrimitive } from "./Table.styled";
export type TableHeadProps = React.ComponentPropsWithoutRef<typeof TableHeadPrimitive> & {
    canSort?: boolean;
    sortDirection?: false | SortDirection;
    onSort?: (event: unknown) => void;
};
export declare const TableHead: React.FC<TableHeadProps>;
export declare const ExpandedTableRowHorizontalSeparator: FC<Omit<ComponentProps<typeof SExpandedTableRowHorizontalSeparator>, "orientation">>;
export declare const TableRowAction: FC<ComponentProps<typeof Button>>;
export declare const TableRowDetailsExpand: FC<ComponentProps<typeof Button>>;
