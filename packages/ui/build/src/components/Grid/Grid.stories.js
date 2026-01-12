import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Grid } from "./Grid";
export default {
    component: Grid,
};
const Template = (args) => {
    return (_jsx(Grid, { gap: 20, ...args, children: Array.from({ length: 12 }).map((_, i) => (_jsx(Flex, { p: 30, align: "center", justify: "center", bg: "skyBlue.600", color: "white", borderRadius: "lg", children: i + 1 }, i))) }));
};
export const Default = {
    render: Template,
};
export const ColumnCount = {
    render: Template,
    args: {
        columns: 3,
    },
};
export const ColumnTemplate = {
    render: Template,
    args: {
        columnTemplate: "1fr 2fr 3fr 4fr",
    },
};
export const RowTemplate = {
    render: Template,
    args: {
        columnTemplate: "repeat(4, 1fr)",
        rowTemplate: "100px 200px 400px",
    },
};
export const ColumnFitWidth = {
    render: Template,
    args: {
        columnWidth: [100],
    },
};
export const ColumnFillWidth = {
    render: Template,
    args: {
        columnWidth: [100],
        repeat: "fill",
    },
};
export const Responsive = {
    render: Template,
    args: {
        columns: [1, 2, 3, 4],
    },
};
