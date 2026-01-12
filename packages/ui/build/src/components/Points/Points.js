import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { SPointsContainer, SPointsDescription, SPointsNumber, SPointsNumberContainer, SPointsTextContent, SPointsTitle, } from "@/components/Points/Points.styled";
export const Points = ({ size = "m", number, title, description, className, }) => {
    return (_jsxs(SPointsContainer, { size: size, className: className, children: [_jsx(SPointsNumberContainer, { size: size, children: _jsx(SPointsNumber, { size: size, children: number }) }), _jsxs(SPointsTextContent, { size: size, children: [_jsx(SPointsTitle, { size: size, children: title }), _jsx(SPointsDescription, { size: size, children: description })] })] }));
};
