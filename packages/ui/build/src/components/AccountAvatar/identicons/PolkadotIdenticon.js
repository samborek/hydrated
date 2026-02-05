import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { polkadotIcon } from "@polkadot/ui-shared";
import { useMemo } from "react";
import { Flex } from "@/components/Flex";
import { getToken } from "@/utils";
export const PolkadotIdenticon = ({ address, size, ...props }) => {
    const circles = useMemo(() => {
        const circles = polkadotIcon(address, {
            size,
        });
        // remove first circle so we can use different background
        return circles.slice(1, circles.length);
    }, [address, size]);
    return (_jsx(Flex, { align: "center", justify: "center", ...props, children: _jsx("svg", { width: size, height: size, name: address, viewBox: "0 0 64 64", sx: {
                bg: getToken("surfaces.themeBasePalette.surfaceHigh"),
                borderRadius: "full",
                p: 2,
                flexShrink: 0,
            }, children: circles.map(({ cx, cy, fill, r }, key) => (_jsx("circle", { cx: cx, cy: cy, fill: fill, r: r }, key))) }) }));
};
