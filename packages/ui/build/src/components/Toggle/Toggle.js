import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";
import { getToken, px } from "@/utils";
import { SThumb, SToggle } from "./Toggle.styled";
export const ToggleRoot = ({ children, ...props }) => {
    return (_jsx(Flex, { gap: 8, align: "center", ...props, children: children }));
};
export const Toggle = ({ checked = false, disabled, name, size = "medium", className, onCheckedChange, ref, ...props }) => (_jsx(SToggle, { ref: ref, className: className, checked: checked, onCheckedChange: onCheckedChange, disabled: disabled, size: size, name: name, id: name, ...props, children: _jsx(SThumb, { checked: checked, disabled: disabled }) }));
export const ToggleLabel = ({ ref, ...props }) => {
    return (_jsx(Text, { ref: ref, fw: 500, fs: "p5", lh: px(14.4), color: getToken("text.high"), whiteSpace: "nowrap", ...props }));
};
