import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useId } from "react";
import { getToken, px } from "@/utils";
import { Text } from "../Text";
import { SInput, SInputContainer } from "./Input.styled";
export const Input = ({ iconStart: IconStart, iconEnd: IconEnd, unit, trailingElement, variant, customSize, className, ref, id, ...props }) => {
    const inputId = useId();
    const usedInputId = id ?? inputId;
    return (_jsxs(SInputContainer, { variant: variant, customSize: customSize, className: className, children: [IconStart && _jsx(IconStart, {}), _jsx(SInput, { ref: ref, id: usedInputId, ...props }), unit && (_jsx(Text, { fw: 500, fs: 11, lh: px(15), color: getToken("buttons.secondary.low.onRest"), as: "label", htmlFor: usedInputId, children: unit })), IconEnd && _jsx(IconEnd, {}), trailingElement] }));
};
