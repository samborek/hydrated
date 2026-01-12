import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { SRoot, SScrollbar, SThumb, SViewport } from "./ScrollArea.styled";
const ScrollArea = ({ children, height, width, viewportRef, orientation = "vertical", ref, ...props }) => (_jsxs(SRoot, { ...props, ref: ref, sx: { height, width }, children: [_jsx(SViewport, { ref: viewportRef, children: children }), _jsx(ScrollBar, { orientation: orientation }), _jsx(ScrollAreaPrimitive.Corner, {})] }));
function ScrollBar({ orientation = "vertical", ...props }) {
    return (_jsx(SScrollbar, { orientation: orientation, ...props, children: _jsx(SThumb, {}) }));
}
export { ScrollArea, ScrollBar };
