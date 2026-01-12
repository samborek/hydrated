import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { css } from "@emotion/react";
import { Grid } from "@/components/Grid";
import { Paper } from "@/components/Paper";
import { containerSize } from "@/styles/container";
import { styled } from "@/utils";
import { ResponsiveScope } from "./ResponsiveScope";
export default {
    component: ResponsiveScope,
};
const SCard = styled(Paper)(({ theme }) => css `
    display: flex;

    padding: 20px;
    gap: 10px;
    height: 100%;

    flex-direction: column;

    ${containerSize("md", css `
        flex-direction: row;
        background: ${theme.colors.azureBlue.alpha[500]};
      `)}
  `);
const ResponsiveCard = ({ colSpan }) => (_jsx(ResponsiveScope, { sx: { gridColumn: `span ${colSpan} / span ${colSpan}` }, children: _jsxs(SCard, { children: [_jsx("span", { sx: { fontWeight: 700, fontSize: 14 }, children: "Responsive Card" }), _jsx("span", { children: "This card adapts to container size using CSS container queries." })] }) }));
export const Example = {
    render: () => (_jsxs(Grid, { gap: 20, columnTemplate: "repeat(4, minmax(0, 1fr))", children: [_jsx(ResponsiveCard, { colSpan: 4 }), _jsx(ResponsiveCard, { colSpan: 2 }), _jsx(ResponsiveCard, { colSpan: 2 }), _jsx(ResponsiveCard, { colSpan: 1 }), _jsx(ResponsiveCard, { colSpan: 2 }), _jsx(ResponsiveCard, { colSpan: 1 })] })),
};
