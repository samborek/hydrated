import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Spinner } from "@/components/Spinner";
import { SButton, SButtonIcon, SButtonTransparent, SMicroButton, } from "./Button.styled";
export const Button = ({ children, ...props }) => {
    return (_jsx(SButton, { as: "button", type: "button", ...props, outline: props.variant === "sliderTabInactive" ||
            (props.variant !== "sliderTabActive" && !!props.outline), children: children }));
};
export const ButtonTransparent = (props) => {
    return _jsx(SButtonTransparent, { type: "button", ...props });
};
export const MicroButton = (props) => (_jsx(SMicroButton, { as: "button", type: "button", ...props }));
export const ButtonIcon = (props) => {
    return _jsx(SButtonIcon, { as: "button", type: "button", ...props });
};
export const LoadingButton = ({ variant, loadingVariant = "tertiary", isLoading, ...props }) => {
    return (_jsxs(SButton, { as: "button", type: "button", variant: isLoading && loadingVariant ? loadingVariant : variant, ...props, children: [isLoading && _jsx(Spinner, { sx: { mr: 4 } }), props.children] }));
};
