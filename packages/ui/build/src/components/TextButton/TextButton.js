import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ChevronRight } from "@/assets/icons";
import { MoveUpRight } from "@/assets/icons";
import { SLinkTextButton, STextButton, } from "./TextButton.styled";
const TextButtonIcon = ({ direction, }) => {
    if (direction === "internal")
        return _jsx(ChevronRight, { size: 10, strokeWidth: 3 });
    if (direction === "external")
        return _jsx(MoveUpRight, { size: 10, strokeWidth: 3 });
    return null;
};
export const TextButton = ({ direction = "none", ref, ...props }) => (_jsxs(STextButton, { ref: ref, type: "button", ...props, children: [props.children, _jsx(TextButtonIcon, { direction: direction })] }));
export const LinkTextButton = ({ direction = "external", variant = "plain", ref, ...props }) => (_jsxs(SLinkTextButton, { ref: ref, target: "_blank", rel: "noreferrer", direction: direction, variant: variant, ...props, children: [props.children, _jsx(TextButtonIcon, { direction: direction })] }));
