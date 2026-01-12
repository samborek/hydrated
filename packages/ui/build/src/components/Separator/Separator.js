import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as RadixSeparator from "@radix-ui/react-separator";
import { Box } from "@/components/Box";
import { useResponsiveValue } from "@/styles/media";
import { getToken } from "@/utils";
export const Separator = ({ size = 1, bg, ...props }) => {
    const orientation = useResponsiveValue(props.orientation);
    return (_jsx(RadixSeparator.Root, { ...props, orientation: orientation, asChild: true, children: _jsx(Box, { width: orientation === "vertical" ? size : "auto", height: orientation === "vertical" ? "auto" : size, bg: bg || getToken("details.separators") }) }));
};
