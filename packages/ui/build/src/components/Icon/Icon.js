import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@/components/Box";
// Convert px to rem for scalable icons
const toRem = (size) => {
    if (size === undefined)
        return "1.5rem"; // default 24px
    if (typeof size === "string")
        return size;
    return `${size / 16}rem`;
};
export const Icon = ({ component: SvgComponent, size = 24, color = "currentColor", ...props }) => {
    const remSize = toRem(typeof size === "number" || typeof size === "string" ? size : 24);
    return (_jsx(Box, { color: color, size: remSize, css: {
            "& > *": { width: "100%", height: "100%" },
        }, ...props, children: _jsx(SvgComponent, {}) }));
};
