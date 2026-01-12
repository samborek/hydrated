import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@/components/Box";
export const Flex = ({ direction, align, justify, inline, wrap, css, sx, gap, ref, ...rest }) => {
    return (_jsx(Box, { ref: ref, css: css, display: inline ? "inline-flex" : "flex", sx: {
            gap,
            flexWrap: wrap ? "wrap" : undefined,
            flexDirection: direction,
            alignItems: align,
            justifyContent: justify,
            ...sx,
        }, ...rest }));
};
