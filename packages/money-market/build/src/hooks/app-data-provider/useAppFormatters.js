import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import React, { useContext } from "react";
const AppFormattersProvidersContext = React.createContext({});
export const AppFormattersProvider = ({ formatReserve, formatNumber, formatCurrency, formatPercent, children, }) => {
    return (_jsx(AppFormattersProvidersContext.Provider, { value: {
            formatReserve,
            formatNumber,
            formatCurrency,
            formatPercent,
        }, children: children }));
};
export const useAppFormatters = () => useContext(AppFormattersProvidersContext);
