import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Stack } from "@galacticcouncil/ui/components";
import { SummaryRow } from "./SummaryRow";
export const Summary = ({ rows, children, separated = true, ...props }) => (_jsx(Stack, { separated: separated, ...props, children: rows?.map((row, i) => (_jsx(SummaryRow, { label: row.label, description: row.description, content: row.content, loading: row.loading }, `${row.label}_${i}`))) ?? children }));
