import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@/components/Box";
export const Icon = ({ component: SvgComponent, size = 24, color = "currentColor", ...props }) => (_jsx(Box, { color: color, size: size, css: {
        "& > *": { width: "100%", height: "100%" },
    }, ...props, children: _jsx(SvgComponent, {}) }));
