import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Indicator } from "@radix-ui/react-checkbox";
import { SIndicator, SRoot } from "./Checkbox.styled";
export const Checkbox = ({ name, size = "medium", ...props }) => (_jsx(SRoot, { size: size, name: name, id: name, ...props, children: _jsx(Indicator, { children: _jsx(SIndicator, {}) }) }));
