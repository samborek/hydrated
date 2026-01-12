import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import React from "react";
import { isArray } from "remeda";
import { Flex } from "@/components/Flex";
import { Separator } from "@/components/Separator";
export const Stack = ({ separated = false, withLeadingSeparator = false, withTrailingSeparator = false, separator, direction = "column", justify = "space-between", children, ...props }) => (_jsx(Flex, { direction: direction, justify: justify, ...props, children: separated
        ? joinChildren(children, React.isValidElement(separator) ? (React.cloneElement(separator, {
            orientation: directionToSeparatorOrientation(direction),
        })) : (_jsx(Separator, { orientation: directionToSeparatorOrientation(direction), sx: { flexShrink: 0 } })), withLeadingSeparator, withTrailingSeparator)
        : children }));
function directionToSeparatorOrientation(direction) {
    const map = {
        column: "horizontal",
        row: "vertical",
    };
    if (isArray(direction))
        return direction.map((d) => (d ? map[d] : null));
    return direction ? map[direction] : null;
}
function joinChildren(children, separator, withLeadingSeparator, withTrailingSeparator) {
    const childrenArray = React.Children.toArray(children).filter(Boolean);
    return childrenArray.reduce((output, child, index) => {
        const isFirst = index === 0;
        if (isFirst && withLeadingSeparator) {
            output.push(React.cloneElement(separator, { key: `separator-${-1}` }));
        }
        output.push(child);
        const isLast = index === childrenArray.length - 1;
        if (!isLast || withTrailingSeparator) {
            output.push(React.cloneElement(separator, { key: `separator-${index}` }));
        }
        return output;
    }, []);
}
