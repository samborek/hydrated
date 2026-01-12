import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as React from "react";
import { SToggleGroup, SToggleGroupItem, } from "./ToggleGroup.styled";
const ToggleGroupContext = React.createContext({
    size: "medium",
});
function ToggleGroup({ size = "medium", children, ...props }) {
    return (_jsx(ToggleGroupContext.Provider, { value: { size }, children: _jsx(SToggleGroup, { ...props, size: size, children: children }) }));
}
function ToggleGroupItem({ children, size, ...props }) {
    const context = React.useContext(ToggleGroupContext);
    return (_jsx(SToggleGroupItem, { size: size ?? context.size, ...props, children: children }));
}
export { ToggleGroup, ToggleGroupItem };
