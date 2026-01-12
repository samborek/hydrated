import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex, Skeleton, Text, Tooltip, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
export const SummaryRow = ({ label, content, description, tooltip, className, loading, onClick, }) => {
    const renderTooltip = (body) => tooltip ? (_jsx(Tooltip, { text: tooltip, side: "left", asChild: true, children: body })) : (body);
    return renderTooltip(_jsxs(Flex, { sx: { ...(onClick && { cursor: "pointer" }) }, align: "center", justify: "space-between", my: 8, className: className, onClick: onClick, children: [_jsxs(Flex, { direction: "column", justify: "space-between", gap: 4, children: [typeof label === "string" ? (_jsxs(SummaryRowLabel, { children: [label, ":"] })) : (label), description && (_jsx(Text, { fs: "p6", fw: 400, color: getToken("text.low"), children: description }))] }), loading ? (_jsx(SummaryRowValue, { children: _jsx(Skeleton, { width: 50, height: "1em" }) })) : typeof content === "string" ? (_jsx(SummaryRowValue, { children: content })) : (content)] }));
};
export const SummaryRowValue = (props) => (_jsx(Text, { fs: "p5", fw: 500, lh: 1.2, color: getToken("text.high"), ...props }));
export const SummaryRowLabel = (props) => (_jsx(Text, { fs: "p5", lh: 1.4, color: getToken("text.medium"), ...props }));
