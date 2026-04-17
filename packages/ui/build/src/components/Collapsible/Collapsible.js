import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { isValidElement } from "react";
import { ChevronDown } from "@/assets/icons";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { SActionLabel, SActionLabelWhenOpen, SCollapsibleContent, SCollapsibleTrigger, } from "@/components/Collapsible/Collapsible.styled";
import { getToken } from "@/utils";
const CollapsibleRoot = ({ ...props }) => {
    return _jsx(CollapsiblePrimitive.Root, { ...props });
};
const CollapsibleTrigger = ({ ...props }) => {
    return _jsx(CollapsiblePrimitive.CollapsibleTrigger, { ...props });
};
const CollapsibleContent = ({ ...props }) => {
    return _jsx(SCollapsibleContent, { ...props });
};
const DefaultCollapsibleTrigger = ({ label, actionLabel, actionLabelWhenOpen, ...props }) => (_jsx(SCollapsibleTrigger, { ...props, children: _jsxs(Flex, { justify: "space-between", align: "center", py: 8, children: [isValidElement(label) ? (label) : (_jsx(Text, { fs: "p5", fw: 500, color: getToken("text.medium"), children: label })), _jsxs(Flex, { gap: 2, align: "center", children: [_jsxs(Text, { fs: "p5", fw: 500, color: getToken("text.low"), children: [_jsx(SActionLabel, { children: actionLabel }), _jsx(SActionLabelWhenOpen, { children: actionLabelWhenOpen ?? actionLabel })] }), _jsx(Icon, { size: 16, color: getToken("text.low"), component: ChevronDown })] })] }) }));
const Collapsible = (props) => {
    const { children, ...rootProps } = props;
    const trigger = (() => {
        if (isValidElement(props.trigger)) {
            return props.trigger;
        }
        if (props.label && props.actionLabel) {
            return (_jsx(DefaultCollapsibleTrigger, { label: props.label, actionLabel: props.actionLabel, actionLabelWhenOpen: props.actionLabelWhenOpen }));
        }
        return null;
    })();
    return (_jsxs(CollapsibleRoot, { ...rootProps, children: [trigger && _jsx(CollapsibleTrigger, { asChild: true, children: trigger }), _jsx(CollapsibleContent, { children: children })] }));
};
export { Collapsible, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger };
