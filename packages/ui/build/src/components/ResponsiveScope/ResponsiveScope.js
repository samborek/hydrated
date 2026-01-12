import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { css } from "@emotion/react";
import { Box } from "@/components/Box";
export const ResponsiveScope = ({ name, type = "inline-size", children, ...boxProps }) => {
    const containerStyles = css `
    container-type: ${type};
    ${name ? `container-name: ${name};` : ""}
  `;
    return (_jsx(Box, { css: containerStyles, ...boxProps, children: children }));
};
